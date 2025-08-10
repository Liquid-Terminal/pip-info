import { NextResponse } from 'next/server';

interface NFTListing {
  price: string;
  priceUsd: number;
  status: string;
}

interface NFTResponse {
  tokens: Array<{
    listing: NFTListing;
  }>;
}

export async function GET() {
  try {
    const contractAddress = "0xbc4a26ba78ce05E8bCbF069Bbb87FB3E1dAC8DF8";
    const url = `https://drip.trade/api/collections/${contractAddress}/tokens?page=1&filters=%7B%22status%22%3A%22listed%22%2C%22sort%22%3A%22Price%20%E2%86%91%22%7D`;
    
    console.log('Récupération du floor price depuis:', url);
    
    const response = await fetch(url, {
      method: "GET",
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; NFT-Analytics/1.0)',
      },
    });

    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }

    const data: NFTResponse = await response.json();
    
    // Trouver le premier token listé (le moins cher = floor price)
    const firstListedToken = data.tokens.find(token => token.listing?.status === "Active");
    
    if (!firstListedToken?.listing) {
      throw new Error('Aucun token listé trouvé');
    }

    const floorPrice = firstListedToken.listing.price;
    const floorPriceUsd = firstListedToken.listing.priceUsd;
    
    // Convertir le BigInt en nombre normal (diviser par 10^18)
    const priceInHype = parseFloat(floorPrice.replace('$bigint', '')) / Math.pow(10, 18);
    
    console.log(`Floor price récupéré: ${priceInHype} HYPE ($${floorPriceUsd})`);

    const result = {
      floorPriceHype: priceInHype,
      floorPriceUsd: floorPriceUsd,
      lastUpdated: new Date().toISOString(),
    };

    // Cache Vercel (5 minutes)
    return NextResponse.json(result, {
      headers: {
        'Cache-Control': 's-maxage=300, stale-while-revalidate=600',
        'Content-Type': 'application/json',
      },
    });

  } catch (error) {
    console.error('Erreur lors de la récupération du floor price:', error);
    
    return NextResponse.json(
      { 
        error: 'Erreur lors de la récupération du floor price',
        details: error instanceof Error ? error.message : 'Erreur inconnue'
      },
      { status: 500 }
    );
  }
}
