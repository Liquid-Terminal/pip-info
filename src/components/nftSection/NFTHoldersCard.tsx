"use client";

import Image from "next/image";
import { useNFTHoldersServerData } from "@/hooks/useNFTHoldersServerData";
import { NFTHoldersServerAPI } from "@/lib/api/nftHoldersServer";
import { API_CONFIG } from "@/config/constants";
import { DataTable } from "@/components/ui/dataTable";
import { nftColumns, getNFTAddress } from "@/config/tableConfigs";

export function NFTHoldersCard() {
  const { 
    paginatedHolders, 
    totalHolders,
    totalNFTs,
    lastUpdated,
    loading, 
    error,
    currentPage,
    itemsPerPage,
    totalPages,
    setCurrentPage,
    setItemsPerPage
  } = useNFTHoldersServerData({
    refreshInterval: API_CONFIG.NFT_HOLDERS_REFRESH_INTERVAL
  });

  const downloadCSV = async () => {
    if (!paginatedHolders.length) return;

    try {
      // Récupérer tous les holders pour l'export CSV
      const allHolders = await NFTHoldersServerAPI.getAllHolders();
      
      const headers = ["Rank", "Address", "NFT Count", "Percentage"];
      const csvContent = [
        headers.join(","),
        ...allHolders.map(holder => 
          `${holder.rank},"${holder.address}","${holder.nftCount}","${holder.percentage.toFixed(2)}%"`
        )
      ].join("\n");

      const blob = new Blob([csvContent], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `nft-holders-${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Failed to download CSV:', err);
    }
  };

  return (
    <DataTable
      data={paginatedHolders}
      columns={nftColumns}
      title="NFT HOLDERS"
      subtitle={`${totalNFTs.toLocaleString()} NFTs`}
      icon={<Image src="/nft.png" alt="NFT" width={100} height={100} className="w-8 h-8 rounded" />}
      colors={{
        primary: "from-purple-500",
        secondary: "to-pink-500"
      }}
      onExport={downloadCSV}
      loading={loading}
      error={error}
      currentPage={currentPage}
      itemsPerPage={itemsPerPage}
      totalPages={totalPages}
      totalItems={totalHolders}
      onPageChange={setCurrentPage}
      onItemsPerPageChange={setItemsPerPage}
      getAddressFromRow={getNFTAddress}
      totalHolders={totalHolders}
      lastUpdated={lastUpdated}
    />
  );
}
