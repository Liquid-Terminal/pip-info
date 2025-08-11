"use client";

import { TokenHoldersCard } from "./TokenHoldersCard";
import { StatsCards } from "../shared/StatsCards";
import { useTokenData } from "@/hooks/useTokenData";
import { useHoldersData } from "@/hooks/useHoldersData";
import { PROJECT_INFO } from "@/config/constants";
import { Holder } from "@/lib/types/token";

interface TokenSectionProps {
  tokenId: string;
}

// Function to calculate holders distribution
function calculateHoldersDistribution(holders: Holder[]) {
  
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

export function TokenSection({ tokenId }: TokenSectionProps) {
  // Get real token data
  const { tokenInfo } = useTokenData({
    tokenId,
    refreshInterval: 30000
  });

  // Get real holders data
  const { totalHolders, holders, loading } = useHoldersData({
    tokenName: PROJECT_INFO.PIP.tokenName,
    refreshInterval: 600000
  });

  // Calculate supply data
  const totalSupply = tokenInfo?.totalSupply || "0";
  const circulatingSupply = tokenInfo?.circulatingSupply || "0";
 
  
  const totalSupplyNum = parseFloat(totalSupply.replace(/\s/g, '').replace(',', '.'));
  const circulatingSupplyNum = parseFloat(circulatingSupply.replace(/\s/g, '').replace(',', '.'));
  

  
  const burnedSupply = (totalSupplyNum - circulatingSupplyNum).toLocaleString('fr-FR');

  // Calculate real holders distribution only when data is loaded
  const holdersDistribution = loading || holders.length === 0 ? [
    { range: "0-10", percentage: 0, count: 0 },
    { range: "10-50", percentage: 0, count: 0 },
    { range: "50-250", percentage: 0, count: 0 },
    { range: "250-1000", percentage: 0, count: 0 },
    { range: "1000+", percentage: 0, count: 0 }
  ] : calculateHoldersDistribution(holders);

  const tokenStats = {
    totalHolders,
    totalSupply,
    circulatingSupply,
    burnedSupply,
    price: tokenInfo?.price || "$0.00",
    marketCap: tokenInfo?.marketCap || "$0",
    holdersDistribution,
    supplyBreakdown: [
      { label: "Circulating", value: circulatingSupplyNum, color: "#10B981" },
      { label: "Burned", value: totalSupplyNum - circulatingSupplyNum, color: "#EF4444" },
    ]
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl text-white mb-6 font-pip">Token Analytics</h2>
      
      {/* Statistics Cards */}
      <StatsCards type="token" stats={tokenStats} />
      
      {/* Card Holders - Full width */}
      <div className="w-full">
        <TokenHoldersCard tokenId={tokenId} />
      </div>
    </div>
  );
}
