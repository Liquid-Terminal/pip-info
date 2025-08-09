"use client";

import { useState, useEffect } from "react";
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
  const [tokenInfo, setTokenInfo] = useState<TokenInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTokenData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await HyperLiquidAPI.getTokenDetails(tokenId);
      const formattedData = HyperLiquidAPI.formatTokenInfo(response);
      
      setTokenInfo(formattedData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch token data");
      console.error("Error fetching token data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTokenData();

    // Auto-refresh
    const interval = setInterval(fetchTokenData, refreshInterval);

    return () => clearInterval(interval);
  }, [tokenId, refreshInterval]);

  return {
    tokenInfo,
    loading,
    error,
    refetch: fetchTokenData,
  };
}
