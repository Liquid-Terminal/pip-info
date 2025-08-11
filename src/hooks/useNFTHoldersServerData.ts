import { useState, useEffect } from "react";
import { useDataFetching } from "./useDataFetching";
import { NFTHoldersServerAPI } from "@/lib/api/nftHoldersServer";
import { NFTHolder } from "@/lib/types/nft";
import { API_CONFIG } from "@/config/constants";

interface UseNFTHoldersServerDataProps {
  refreshInterval?: number;
}

interface UseNFTHoldersServerDataReturn {
  holders: NFTHolder[];
  totalHolders: number;
  totalNFTs: number;
  lastUpdated: string;
  loading: boolean;
  error: string | null;
  refetch: () => void;
  currentPage: number;
  itemsPerPage: number;
  totalPages: number;
  paginatedHolders: NFTHolder[];
  setCurrentPage: (page: number) => void;
  setItemsPerPage: (itemsPerPage: number) => void;
}

export function useNFTHoldersServerData({ 
  refreshInterval = API_CONFIG.NFT_HOLDERS_REFRESH_INTERVAL
}: UseNFTHoldersServerDataProps): UseNFTHoldersServerDataReturn {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [allHolders, setAllHolders] = useState<NFTHolder[]>([]);
  const [totalNFTs, setTotalNFTs] = useState(0);
  const [lastUpdated, setLastUpdated] = useState("");

  const { data: response, loading, error, refetch } = useDataFetching<{
    holders: NFTHolder[];
    totalHolders: number;
    totalNFTs: number;
    lastUpdated: string;
    pagination: {
      page: number;
      itemsPerPage: number;
      totalPages: number;
      hasNextPage: boolean;
    };
  }>({
    fetchFn: () => NFTHoldersServerAPI.getHolders(currentPage, itemsPerPage),
    refreshInterval,
  });

  // Update local state when response changes
  useEffect(() => {
    if (response) {
      setAllHolders(response.holders);
      setTotalNFTs(response.totalNFTs);
      setLastUpdated(response.lastUpdated);
    }
  }, [response]);

  const totalHolders = response?.totalHolders || 0;
  const totalPages = response?.pagination?.totalPages || 0;
  const paginatedHolders = allHolders;

  useEffect(() => {
    setCurrentPage(1);
  }, [itemsPerPage]);

  return {
    holders: allHolders,
    totalHolders,
    totalNFTs,
    lastUpdated,
    loading,
    error,
    refetch,
    currentPage,
    itemsPerPage,
    totalPages,
    paginatedHolders,
    setCurrentPage,
    setItemsPerPage,
  };
}
