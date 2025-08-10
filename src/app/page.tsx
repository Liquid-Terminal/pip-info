"use client";

import Image from "next/image";
import { TokenInfoCard } from "@/components/infoCard/InfoCard";
import { TokenSection } from "@/components/tokenSection/TokenSection";
import { NFTSection } from "@/components/nftSection/NFTSection";
import { useTokenData } from "@/hooks/useTokenData";
import { TOKEN_IDS } from "@/config/constants";

// Données statiques pour la card
const staticTokenInfo = {
  name: "PIP",
  description: "PiP is a community-driven movement and Hyperliquid's mascot symbolizing hydration and flow. A passionate team is exploring merchandise and toys, with the community shaping its future. Stay hydrated and engaged.",
  banner: "/pip-backgroundsky-1-1024x1024.webp",
  type: "Memecoin",
  chain: "HyperLiquid",
  launch: "2024-01-15",
  links: {
    website: "https://pip.meme/",
    telegram: "https://t.me/piponhl",
    twitter: "https://x.com/PiPonHL",
    trading: "https://app.hyperliquid.xyz/trade/0xe85f43e1f91e3c8cdf3acbd7e0855b8e",
    nft: "https://drip.trade/collections/pip"
  }
};

export default function Home() {
  const { tokenInfo } = useTokenData({
    tokenId: TOKEN_IDS.PIP,
    refreshInterval: 30000 // 30 secondes
  });

  // Combine les données statiques avec les données dynamiques de l'API
  const combinedTokenInfo = {
    ...staticTokenInfo,
    tokenInfo: tokenInfo ? {
      symbol: tokenInfo.symbol,
      totalSupply: tokenInfo.totalSupply,
      marketCap: tokenInfo.marketCap,
      price: tokenInfo.price,
      circulatingSupply: tokenInfo.circulatingSupply,
      priceChange24h: tokenInfo.priceChange24h,
    } : {
      symbol: "PIP",
      totalSupply: "Loading...",
      marketCap: "Loading...",
      price: "Loading...",
      circulatingSupply: "Loading...",
      priceChange24h: "0%",
    }
  };

  return (
    <div className="min-h-screen relative">
      <Image
        src="/pip-backgroundsky-1-1024x1024.webp"
        alt="Background"
        fill
        className="object-cover"
        priority
      />
      
      {/* Contenu principal avec padding-left pour éviter la sidebar */}
      <div className="relative z-10 pl-80">
        {/* Ici viendra le contenu principal qui scrollera */}
        <div className="min-h-screen p-8">
          <p className="text-white/80 text-lg mb-8 bg-[#1a1a1a]/80 px-4 py-2 rounded-lg inline-block">Welcome to the PIP token information dashboard</p>
          
          {/* Section Token Analytics */}
          <TokenSection tokenId={TOKEN_IDS.PIP} />
          
          {/* Séparation entre les sections */}
          <div className="my-12 border-t border-white/20"></div>
          
          {/* Section NFT Analytics */}
          <NFTSection />
        </div>
      </div>
      
      {/* Sidebar fixe à droite */}
      <TokenInfoCard tokenInfo={combinedTokenInfo} />
    </div>
  );
}
