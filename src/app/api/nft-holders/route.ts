import { NextRequest, NextResponse } from 'next/server';
import { NFTHoldersProcessor } from '@/lib/api/nftHoldersProcessor';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const itemsPerPage = parseInt(searchParams.get('itemsPerPage') || '10');
    
    // Récupérer et traiter les données CSV
    const allData = await NFTHoldersProcessor.fetchAndProcessCSV();
    
    // Paginer les résultats
    const paginatedData = NFTHoldersProcessor.paginateHolders(allData.holders, page, itemsPerPage);
    
    const result = {
      holders: paginatedData.holders,
      totalHolders: allData.totalHolders,
      totalNFTs: allData.totalNFTs,
      lastUpdated: allData.lastUpdated,
      pagination: paginatedData.pagination,
    };

    // Cache Vercel (5 minutes)
    return NextResponse.json(result, {
      headers: {
        'Cache-Control': 's-maxage=300, stale-while-revalidate=600',
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
