"use client";

import { useState, useEffect } from "react";
import { HoldersAPI } from "@/lib/api/holders";
import { Holder } from "@/lib/types/token";

interface UseHoldersDataProps {
  tokenName: string;
  refreshInterval?: number; // en millisecondes
}

interface UseHoldersDataReturn {
  holders: Holder[];
  totalHolders: number;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useHoldersData({ 
  tokenName, 
  refreshInterval = 600000 // 10 minutes par défaut
}: UseHoldersDataProps): UseHoldersDataReturn {
  const [holders, setHolders] = useState<Holder[]>([]);
  const [totalHolders, setTotalHolders] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchHoldersData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await HoldersAPI.getHolders(tokenName);
      const formattedHolders = HoldersAPI.formatHoldersData(response);
      
      setHolders(formattedHolders);
      setTotalHolders(response.holdersCount);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch holders data");
      console.error("Error fetching holders data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHoldersData();

    // Auto-refresh toutes les 10 minutes
    const interval = setInterval(fetchHoldersData, refreshInterval);

    return () => clearInterval(interval);
  }, [tokenName, refreshInterval]);

  return {
    holders,
    totalHolders,
    loading,
    error,
    refetch: fetchHoldersData,
  };
}


