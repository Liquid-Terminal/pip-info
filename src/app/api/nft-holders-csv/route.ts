import { NextResponse } from 'next/server';
import { NFT_CONTRACT_ADDRESSES } from '@/config/constants';

interface CSVHolder {
  address: string;
  balance: number;
}

interface ProcessedNFTData {
  holders: Array<{
    address: string;
    nftCount: number;
    percentage: number;
    rank: number;
  }>;
  totalHolders: number;
  totalNFTs: number;
  lastUpdated: string;
}

export async function GET() {
  try {
    const contractAddress = NFT_CONTRACT_ADDRESSES.PIP;
    
    // URL de l'API CSV Hyperscan
    const csvUrl = `https://www.hyperscan.com/api/v2/tokens/${contractAddress}/holders/csv?address_id=${contractAddress}&from_period=null&to_period=null&filter_type=null&filter_value=null`;
    
    console.log('Téléchargement du CSV depuis:', csvUrl);
    
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
    console.log('CSV téléchargé, taille:', csvText.length, 'caractères');

    // Parser le CSV en gérant les caractères de retour à la ligne
    const lines = csvText.trim().split('\n');
    const headers = lines[0].split(',').map(header => header.trim().replace(/\r/g, ''));
    
    if (headers[0] !== 'HolderAddress' || headers[1] !== 'Balance') {
      console.log('Headers détectés:', headers);
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

    console.log(`Traitement terminé: ${holders.length} holders, ${totalNFTs} NFTs total`);

    // Trier par balance décroissante et calculer les pourcentages
    const sortedHolders = holders
      .sort((a, b) => b.balance - a.balance)
      .map((holder, index) => ({
        address: holder.address,
        nftCount: holder.balance,
        percentage: (holder.balance / totalNFTs) * 100,
        rank: index + 1,
      }));

    const processedData: ProcessedNFTData = {
      holders: sortedHolders,
      totalHolders: sortedHolders.length,
      totalNFTs,
      lastUpdated: new Date().toISOString(),
    };

    // Retourner avec cache Vercel (5 minutes)
    return NextResponse.json(processedData, {
      headers: {
        'Cache-Control': 's-maxage=300, stale-while-revalidate=600',
        'Content-Type': 'application/json',
      },
    });

  } catch (error) {
    console.error('Erreur lors du traitement du CSV NFT:', error);
    
    return NextResponse.json(
      { 
        error: 'Erreur lors du traitement des données NFT',
        details: error instanceof Error ? error.message : 'Erreur inconnue'
      },
      { status: 500 }
    );
  }
}
