"use client";

import { useDataFetching } from "./useDataFetching";
import { HyperScanAPI } from "@/lib/api/nftInfo";
import { HyperScanNFTInfo } from "@/lib/types/nft";

interface UseNFTDataProps {
  contractAddress: string;
  refreshInterval?: number; // en millisecondes
}

interface UseNFTDataReturn {
  nftInfo: HyperScanNFTInfo | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useNFTData({ 
  contractAddress, 
  refreshInterval = 30000 // 30 secondes par défaut
}: UseNFTDataProps): UseNFTDataReturn {
  const { data: nftInfo, loading, error, refetch } = useDataFetching<HyperScanNFTInfo>({
    fetchFn: async () => {
      const response = await HyperScanAPI.getNFTCollectionDetails(contractAddress);
      return HyperScanAPI.formatNFTInfo(response);
    },
    dependencies: [contractAddress],
    refreshInterval,
  });

  return {
    nftInfo,
    loading,
    error,
    refetch,
  };
}
