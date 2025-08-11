import { useState, useEffect } from "react";
import { useDataFetching } from "./useDataFetching";
import { NFTHoldersServerAPI } from "@/lib/api/nftHoldersServer";
import { NFTHoldersProcessor } from "@/lib/api/nftHoldersProcessor";
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
  const [allHoldersData, setAllHoldersData] = useState<NFTHolder[]>([]);
  const [totalNFTs, setTotalNFTs] = useState(0);
  const [lastUpdated, setLastUpdated] = useState("");

  // Fetch all data once and handle pagination on client side
  const { data: response, loading, error, refetch } = useDataFetching<{
    holders: NFTHolder[];
    totalHolders: number;
    totalNFTs: number;
    lastUpdated: string;
  }>({
    fetchFn: async () => {
      const allData = await NFTHoldersServerAPI.getAllHolders();
      const totalData = await NFTHoldersProcessor.fetchAndProcessCSV();
      return {
        holders: allData,
        totalHolders: totalData.totalHolders,
        totalNFTs: totalData.totalNFTs,
        lastUpdated: totalData.lastUpdated,
      };
    },
    refreshInterval,
    onSuccess: (data) => {
      setAllHoldersData(data.holders);
      setTotalNFTs(data.totalNFTs);
      setLastUpdated(data.lastUpdated);
    },
  });

  // Client-side pagination
  const totalHolders = response?.totalHolders || 0;
  const totalPages = Math.ceil(totalHolders / itemsPerPage);
  
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedHolders = allHoldersData.slice(startIndex, endIndex);

  useEffect(() => {
    setCurrentPage(1);
  }, [itemsPerPage]);

  return {
    holders: allHoldersData,
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
