"use client";

import { useDataFetching } from "./useDataFetching";
import { HyperLiquidAPI } from "@/lib/api/hyperliquid";
import { TokenInfo } from "@/lib/types/token";

interface UseTokenDataProps {
  tokenId: string;
  refreshInterval?: number; // en millisecondes
}

interface UseTokenDataReturn {
  tokenInfo: TokenInfo | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useTokenData({ 
  tokenId, 
  refreshInterval = 30000 // 30 secondes par défaut
}: UseTokenDataProps): UseTokenDataReturn {
  const { data: tokenInfo, loading, error, refetch } = useDataFetching<TokenInfo>({
    fetchFn: async () => {
      const response = await HyperLiquidAPI.getTokenDetails(tokenId);
      const formattedInfo = HyperLiquidAPI.formatTokenInfo(response);
      
      // Calculate burned supply
      const totalSupplyNum = parseFloat(response.totalSupply);
      const circulatingSupplyNum = parseFloat(response.circulatingSupply);
      const burnedSupplyNum = totalSupplyNum - circulatingSupplyNum;
      
      return {
        ...formattedInfo,
        burnedSupply: burnedSupplyNum.toLocaleString('fr-FR'),
      };
    },
    dependencies: [tokenId],
    refreshInterval,
  });

  return {
    tokenInfo,
    loading,
    error,
    refetch,
  };
}
