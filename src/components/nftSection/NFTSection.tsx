"use client";

import { useState, useEffect } from "react";
import { NFTHoldersCard } from "./NFTHoldersCard";
import { StatsCards } from "../shared/StatsCards";
import { useNFTData } from "@/hooks/useNFTData";
import { useNFTFloorPrice } from "@/hooks/useNFTFloorPrice";
import { useRealTimePrice } from "@/hooks/useRealTimePrice";
import { NFTHolder } from "@/lib/types/nft";

// Function to calculate holders distribution for NFTs
function calculateNFTHoldersDistribution(holders: NFTHolder[]) {
  // Filter out special addresses
  const filteredHolders = holders.filter(holder => {
    const address = holder.address.toLowerCase();
    return !(
      address === "dead wallet" ||
      address === "0xffffffffffffffffffffffffffffffffffffffff" ||
      address === "0x200000000000000000000000000000000000007f"
    );
  });

  // Use the original percentages from the API (they're already calculated correctly)
  const holdersWithCorrectPercentages = filteredHolders.map(holder => ({
    ...holder,
    // Keep the original percentage from the API
    percentage: holder.percentage
  }));

  const ranges = [
    { min: 0, max: 10, label: "0-10" },
    { min: 10, max: 50, label: "10-50" },
    { min: 50, max: 250, label: "50-250" },
    { min: 250, max: 1000, label: "250-1000" },
    { min: 1000, max: Infinity, label: "1000+" }
  ];

  const distribution = ranges.map(range => {
    // Get holders by rank (position in the sorted list)
    const holdersInRange = holdersWithCorrectPercentages.slice(range.min, range.max);
    
    // Calculate total percentage held by this range of holders
    const totalPercentage = holdersInRange.reduce((sum, holder) => sum + holder.percentage, 0);
    
    return {
      range: range.label,
      percentage: Math.round(totalPercentage * 100) / 100, // Round to 2 decimal places
      count: holdersInRange.length
    };
  });

  return distribution;
}

// Function to calculate NFT supply breakdown (burned vs circulating)
function calculateNFTSupplyBreakdown(holders: NFTHolder[], totalNFTs: number) {
  const DEAD_WALLET_ADDRESS = "0x000000000000000000000000000000000000dEaD";
  
  // Find Dead Wallet holder
  const deadWalletHolder = holders.find(holder => 
    holder.address.toLowerCase() === DEAD_WALLET_ADDRESS.toLowerCase()
  );
  
  const burnedNFTs = deadWalletHolder ? deadWalletHolder.nftCount : 0;
  const circulatingNFTs = totalNFTs - burnedNFTs;
  
  return [
    { label: "Circulating", value: circulatingNFTs, color: "#10B981" },
    { label: "Burned", value: burnedNFTs, color: "#EF4444" },
  ];
}

export function NFTSection() {
  // Get real NFT data
  const { nftInfo } = useNFTData({
    contractAddress: "0xbc4a26ba78ce05E8bCbF069Bbb87FB3E1dAC8DF8",
    refreshInterval: 30000
  });

  const { floorPriceHype } = useNFTFloorPrice({
    refreshInterval: 300000 // 5 minutes
  });

  // Get all holders for distribution calculation
  const [allHolders, setAllHolders] = useState<NFTHolder[]>([]);
  const [totalNFTs, setTotalNFTs] = useState(0);
  const [holdersLoading, setHoldersLoading] = useState(true);

  useEffect(() => {
    const fetchAllHolders = async () => {
      try {
        setHoldersLoading(true);
        const { NFTHoldersProcessor } = await import("@/lib/api/nftHoldersProcessor");
        const data = await NFTHoldersProcessor.fetchAndProcessCSV();
        setAllHolders(data.holders);
        setTotalNFTs(data.totalNFTs);
      } catch (error) {
        console.error("Failed to fetch all holders:", error);
      } finally {
        setHoldersLoading(false);
      }
    };

    fetchAllHolders();
  }, []);

  // Calculate real holders distribution only when data is loaded
  const holdersDistribution = (holdersLoading || allHolders.length === 0) ? [
    { range: "0-10", percentage: 0, count: 0 },
    { range: "10-50", percentage: 0, count: 0 },
    { range: "50-250", percentage: 0, count: 0 },
    { range: "250-1000", percentage: 0, count: 0 },
    { range: "1000+", percentage: 0, count: 0 }
  ] : calculateNFTHoldersDistribution(allHolders);

  // Calculate real NFT supply breakdown (burned vs circulating)
  const supplyBreakdown = (holdersLoading || allHolders.length === 0) ? [
    { label: "Circulating", value: 0, color: "#10B981" },
    { label: "Burned", value: 0, color: "#EF4444" },
  ] : calculateNFTSupplyBreakdown(allHolders, totalNFTs);

  const nftStats = {
    totalHolders: parseInt(nftInfo?.holdersCount || "0"),
    totalSupply: nftInfo?.totalSupply || "7777",
    floorPrice: `${floorPriceHype.toFixed(2)} HYPE`,
    contractAddress: nftInfo?.address || "",
    holdersDistribution,
    supplyBreakdown
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl text-white mb-6 font-pip">NFT Analytics</h2>
      
      {/* Statistics Cards */}
      <StatsCards type="nft" stats={nftStats} />
      
      <div className="w-full">
        <NFTHoldersCard />
      </div>
    </div>
  );
}
