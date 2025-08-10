"use client";

import { useState, useEffect } from "react";
import { useDataFetching } from "./useDataFetching";
import { HoldersAPI } from "@/lib/api/holders";
import { Holder, HoldersResponse } from "@/lib/types/token";

interface UseHoldersDataProps {
  tokenName: string;
  refreshInterval?: number;
}

interface UseHoldersDataReturn {
  holders: Holder[];
  totalHolders: number;
  loading: boolean;
  error: string | null;
  refetch: () => void;
  // Pagination
  currentPage: number;
  itemsPerPage: number;
  totalPages: number;
  paginatedHolders: Holder[];
  setCurrentPage: (page: number) => void;
  setItemsPerPage: (itemsPerPage: number) => void;
}

export function useHoldersData({ 
  tokenName, 
  refreshInterval = 600000 // 10 minutes par défaut
}: UseHoldersDataProps): UseHoldersDataReturn {
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const { data: response, loading, error, refetch } = useDataFetching<HoldersResponse>({
    fetchFn: () => HoldersAPI.getHolders(tokenName),
    dependencies: [tokenName],
    refreshInterval,
  });

  // Format and process holders data
  const allHolders = response ? HoldersAPI.formatHoldersData(response) : [];
  const totalHolders = response?.holdersCount || 0;

  // Calculer les données paginées
  const totalPages = Math.ceil(totalHolders / itemsPerPage);
  const paginatedHolders = HoldersAPI.getPaginatedHolders(allHolders, currentPage, itemsPerPage);

  // Reset page quand itemsPerPage change
  useEffect(() => {
    setCurrentPage(1);
  }, [itemsPerPage]);

  return {
    holders: allHolders, // Tous les holders pour compatibilité
    totalHolders,
    loading,
    error,
    refetch,
    // Pagination
    currentPage,
    itemsPerPage,
    totalPages,
    paginatedHolders,
    setCurrentPage,
    setItemsPerPage,
  };
}


