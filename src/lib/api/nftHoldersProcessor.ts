import { PROJECT_INFO } from '@/config/constants';
import { NFTHolder, CSVHolder, ProcessedNFTData, PaginatedResult } from '@/lib/types/nft';

// Cache for lastUpdated timestamp (10 minutes)
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes
let cachedTimestamp: string | null = null;
let cacheTime: number = 0;

export class NFTHoldersProcessor {
  static async fetchAndProcessCSV(): Promise<ProcessedNFTData> {
    const contractAddress = PROJECT_INFO.PIP.nftContractAddress;
    
    // Hyperscan API CSV URL
    const csvUrl = `https://www.hyperscan.com/api/v2/tokens/${contractAddress}/holders/csv?address_id=${contractAddress}&from_period=null&to_period=null&filter_type=null&filter_value=null`;
        
    // Download CSV
    const response = await fetch(csvUrl, {
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; NFT-Analytics/1.0)',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const csvText = await response.text();

    // Parse CSV handling line break characters
    const lines = csvText.trim().split('\n');
    const headers = lines[0].split(',').map(header => header.trim().replace(/\r/g, ''));
    
    if (headers[0] !== 'HolderAddress' || headers[1] !== 'Balance') {
      throw new Error('Invalid CSV format');
    }

    // Process data
    const holders: CSVHolder[] = [];
    let totalNFTs = 0;

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;

      const [address, balanceStr] = line.split(',').map(field => field.trim().replace(/\r/g, ''));
      const balance = parseFloat(balanceStr);
      
      if (address && !isNaN(balance)) {
        holders.push({ address, balance });
        totalNFTs += balance;
      }
    }

    // Sort by decreasing balance and calculate percentages
    const sortedHolders = holders
      .sort((a, b) => b.balance - a.balance)
      .map((holder, index) => ({
        address: holder.address,
        nftCount: holder.balance,
        percentage: (holder.balance / totalNFTs) * 100,
        rank: index + 1,
      }));

    // Handle timestamp cache
    const now = Date.now();
    if (!cachedTimestamp || (now - cacheTime) > CACHE_DURATION) {
      cachedTimestamp = new Date().toISOString();
      cacheTime = now;
    }

    return {
      holders: sortedHolders,
      totalHolders: sortedHolders.length,
      totalNFTs,
      lastUpdated: cachedTimestamp,
    };
  }

  static paginateHolders(holders: NFTHolder[], page: number, itemsPerPage: number): PaginatedResult {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedHolders = holders.slice(startIndex, endIndex);
    
    const totalPages = Math.ceil(holders.length / itemsPerPage);
    const hasNextPage = page < totalPages;
    
    return {
      holders: paginatedHolders,
      pagination: {
        page,
        itemsPerPage,
        totalPages,
        hasNextPage,
      },
    };
  }
}
