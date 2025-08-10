import { NFT_CONTRACT_ADDRESSES } from '@/config/constants';
import { NFTHolder, CSVHolder, ProcessedNFTData, PaginatedResult } from '@/lib/types/nft';

export class NFTHoldersProcessor {
  static async fetchAndProcessCSV(): Promise<ProcessedNFTData> {
    const contractAddress = NFT_CONTRACT_ADDRESSES.PIP;
    
    // URL de l'API CSV Hyperscan
    const csvUrl = `https://www.hyperscan.com/api/v2/tokens/${contractAddress}/holders/csv?address_id=${contractAddress}&from_period=null&to_period=null&filter_type=null&filter_value=null`;
        
    // Télécharger le CSV
    const response = await fetch(csvUrl, {
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; NFT-Analytics/1.0)',
      },
    });

    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }

    const csvText = await response.text();

    // Parser le CSV en gérant les caractères de retour à la ligne
    const lines = csvText.trim().split('\n');
    const headers = lines[0].split(',').map(header => header.trim().replace(/\r/g, ''));
    
    if (headers[0] !== 'HolderAddress' || headers[1] !== 'Balance') {
      throw new Error('Format CSV invalide');
    }

    // Traiter les données
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


    // Trier par balance décroissante et calculer les pourcentages
    const sortedHolders = holders
      .sort((a, b) => b.balance - a.balance)
      .map((holder, index) => ({
        address: holder.address,
        nftCount: holder.balance,
        percentage: (holder.balance / totalNFTs) * 100,
        rank: index + 1,
      }));

    return {
      holders: sortedHolders,
      totalHolders: sortedHolders.length,
      totalNFTs,
      lastUpdated: new Date().toISOString(),
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
