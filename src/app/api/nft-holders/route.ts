import { NextRequest, NextResponse } from 'next/server';

interface NFTHolder {
  address: string;
  nftCount: number;
  percentage: number;
  rank: number;
}

interface NFTResponse {
  holders: NFTHolder[];
  totalHolders: number;
  totalNFTs: number;
  lastUpdated: string;
  pagination: {
    page: number;
    itemsPerPage: number;
    totalPages: number;
    hasNextPage: boolean;
  };
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const itemsPerPage = parseInt(searchParams.get('itemsPerPage') || '10');
    
    // Récupérer les données depuis notre API de traitement
    const response = await fetch(`${request.nextUrl.origin}/api/nft-holders-csv`);
    
    if (!response.ok) {
      throw new Error(`Erreur lors de la récupération des données: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Pagination côté serveur
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedHolders = data.holders.slice(startIndex, endIndex);
    
    const totalPages = Math.ceil(data.totalHolders / itemsPerPage);
    const hasNextPage = page < totalPages;
    
    const result: NFTResponse = {
      holders: paginatedHolders,
      totalHolders: data.totalHolders,
      totalNFTs: data.totalNFTs,
      lastUpdated: data.lastUpdated,
      pagination: {
        page,
        itemsPerPage,
        totalPages,
        hasNextPage,
      },
    };

    // Cache Vercel (2 minutes car les données viennent déjà du cache de l'API CSV)
    return NextResponse.json(result, {
      headers: {
        'Cache-Control': 's-maxage=120, stale-while-revalidate=300',
        'Content-Type': 'application/json',
      },
    });

  } catch (error) {
    console.error('Erreur API NFT holders:', error);
    
    return NextResponse.json(
      { 
        error: 'Erreur lors de la récupération des holders NFT',
        details: error instanceof Error ? error.message : 'Erreur inconnue'
      },
      { status: 500 }
    );
  }
}
