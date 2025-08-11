"use client";

import Image from "next/image";
import { TokenInfoCard } from "@/components/infoCard/InfoCard";
import { TokenSection } from "@/components/tokenSection/TokenSection";
import { NFTSection } from "@/components/nftSection/NFTSection";
import { useTokenData } from "@/hooks/useTokenData";
import { PROJECT_INFO } from "@/config/constants";

export default function Home() {
  const { tokenInfo } = useTokenData({
    tokenId: PROJECT_INFO.PIP.tokenId,
    refreshInterval: 30000 // 30 seconds
  });

  // Combine static data with dynamic API data
  const combinedTokenInfo = {
    ...PROJECT_INFO.PIP,
    tokenInfo: tokenInfo ? {
      symbol: tokenInfo.symbol,
      totalSupply: tokenInfo.totalSupply,
      marketCap: tokenInfo.marketCap,
      price: tokenInfo.price,
      circulatingSupply: tokenInfo.circulatingSupply,
      priceChange24h: tokenInfo.priceChange24h,
    } : {
      symbol: PROJECT_INFO.PIP.name,
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
        src={PROJECT_INFO.PIP.background}
        alt="Background"
        fill
        className="object-cover"
        priority
      />
      
      {/* Main content with padding-left to avoid sidebar */}
      <div className="relative z-10 pl-80">
        {/* Main content that will scroll */}
        <div className="min-h-screen p-8">            
          {/* Token Analytics Section */}
          <TokenSection tokenId={PROJECT_INFO.PIP.tokenId} />
          
          {/* Separation between sections */}
          <div className="my-12 border-t border-white/20"></div>
          
          {/* NFT Analytics Section */}
          <NFTSection />
        </div>
      </div>
      
      {/* Fixed sidebar on the right */}
      <TokenInfoCard tokenInfo={combinedTokenInfo} />
    </div>
  );
}
