import { useDataFetching } from "./useDataFetching";
import { NFTFloorPriceAPI } from "@/lib/api/nftFloorPrice";
import { NFTFloorPriceResponse } from "@/lib/types/nft";

interface UseNFTFloorPriceProps {
  refreshInterval?: number;
}

interface UseNFTFloorPriceReturn {
  floorPriceHype: number;
  floorPriceUsd: number;
  lastUpdated: string;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useNFTFloorPrice({ 
  refreshInterval = 300000 // 5 minutes par défaut
}: UseNFTFloorPriceProps): UseNFTFloorPriceReturn {
  const { data, loading, error, refetch } = useDataFetching<NFTFloorPriceResponse>({
    fetchFn: () => NFTFloorPriceAPI.getFloorPrice(),
    dependencies: [],
    refreshInterval,
  });

  return {
    floorPriceHype: data?.floorPriceHype || 0,
    floorPriceUsd: data?.floorPriceUsd || 0,
    lastUpdated: data?.lastUpdated || new Date().toISOString(),
    loading,
    error,
    refetch,
  };
}
