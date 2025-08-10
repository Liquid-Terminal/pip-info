"use client";

import { NFTHoldersCard } from "./NFTHoldersCard";

export function NFTSection() {
  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold text-white mb-6">NFT Analytics</h2>
      
      <div className="w-full">
        <NFTHoldersCard />
      </div>
    </div>
  );
}
