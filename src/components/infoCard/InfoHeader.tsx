"use client";

import Image from "next/image";
import { PROJECT_INFO } from "@/config/constants";

interface TokenInfo {
  name: string;
  description: string;
  banner: string;
  tokenInfo: {
    symbol: string;
    totalSupply: string;
    marketCap: string;
    price: string;
    circulatingSupply?: string;
    priceChange24h?: string;
  };
}

interface TokenHeaderProps {
  tokenInfo: TokenInfo;
}

export function TokenHeader({ tokenInfo }: TokenHeaderProps) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <Image
          src={PROJECT_INFO.PIP.projectLogo}
          alt={`${PROJECT_INFO.PIP.name} Logo`}
          width={32}
          height={32}
          className="rounded-lg"
        />
        <h2 className="text-lg text-white">{tokenInfo.name}</h2>
      </div>
      <p className="text-xs text-white mb-3">{tokenInfo.description}</p>
      
      {/* Banner */}
      <div className="relative w-full h-32 rounded-md overflow-hidden mb-4">
        <Image
          src={tokenInfo.banner}
          alt={`${tokenInfo.name} Banner`}
          fill
          className="object-cover object-center"
        />
      </div>
    </div>
  );
}
