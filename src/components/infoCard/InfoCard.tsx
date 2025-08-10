"use client";

import { Card } from "@/components/ui/card";
import { TokenHeader } from "./InfoHeader";
import { ProjectInfoSection } from "./InfoSection";
import { LinksSection } from "./InfoLinks";

interface TokenInfo {
  name: string;
  description: string;
  banner: string;
  type: string;
  chain: string;
  launch: string;
  tokenInfo: {
    symbol: string;
    totalSupply: string;
    marketCap: string;
    price: string;
  };
  links: {
    website?: string;
    telegram?: string;
    pipMedia?: string;
    twitter?: string;
    discord?: string;
    github?: string;
    whitepaper?: string;
  };
}

interface TokenInfoCardProps {
  tokenInfo: TokenInfo;
}

export function TokenInfoCard({ tokenInfo }: TokenInfoCardProps) {
  return (
    <div className="fixed left-0 top-0 h-screen w-80 bg-[#051728E5] border-r-2 border-[#83E9FF4D] shadow-[0_4px_24px_0_rgba(0,0,0,0.25)] backdrop-blur-sm overflow-y-auto z-50">
      <Card className="bg-transparent border-none shadow-none rounded-none h-full">
        <div className="pt-2 px-5 pb-5 space-y-4">
          <TokenHeader tokenInfo={tokenInfo} />
          <ProjectInfoSection type={tokenInfo.type} chain={tokenInfo.chain} launch={tokenInfo.launch} />
          <LinksSection links={tokenInfo.links} />
        </div>
      </Card>
    </div>
  );
}
