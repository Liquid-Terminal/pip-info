"use client";

import { Users } from "lucide-react";
import { useHoldersData } from "@/hooks/useHoldersData";
import { useTokenData } from "@/hooks/useTokenData";
import { TOKEN_NAMES, API_CONFIG, TOKEN_IDS } from "@/config/constants";
import { DataTable } from "@/components/ui/DataTable";
import { tokenColumns, getTokenAddress } from "@/config/tableConfigs";

interface TokenHoldersCardProps {
  tokenId: string;
}

export function TokenHoldersCard({ tokenId }: TokenHoldersCardProps) {
  // tokenId is used for future compatibility
  console.log('Token ID:', tokenId); // Temporary to avoid unused variable warning

  const { 
    paginatedHolders, 
    totalHolders, 
    loading, 
    error,
    currentPage,
    itemsPerPage,
    totalPages,
    setCurrentPage,
    setItemsPerPage
  } = useHoldersData({
    tokenName: TOKEN_NAMES.PIP,
    refreshInterval: API_CONFIG.HOLDERS_REFRESH_INTERVAL
  });

  const { tokenInfo } = useTokenData({
    tokenId: TOKEN_IDS.PIP,
    refreshInterval: 30000
  });

  const downloadCSV = () => {
    if (!paginatedHolders.length) return;

    const headers = ["Rank", "Address", "Amount", "Value", "Percentage"];
    const csvContent = [
      headers.join(","),
      ...paginatedHolders.map(holder => {
        const price = tokenInfo?.price ? parseFloat(tokenInfo.price.replace('$', '')) : 0;
        const value = (holder.balance * price).toFixed(2);
        return `${holder.rank},"${holder.address}","${holder.balance.toLocaleString()}","$${value}","${holder.percentage.toFixed(2)}%"`
      })
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `pip-holders-page-${currentPage}-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  // Préparer les données avec la valeur calculée
  const dataWithValue = paginatedHolders.map(holder => {
    const price = tokenInfo?.price ? parseFloat(tokenInfo.price.replace('$', '')) : 0;
    const value = (holder.balance * price).toFixed(2);
    return {
      ...holder,
      amount: holder.balance,
      value: `$${value}`,
    };
  });

  return (
    <DataTable
      data={dataWithValue}
      columns={tokenColumns}
      title="Token Holders"
      subtitle="Token distribution"
      icon={<Users className="w-4 h-4 text-white" />}
      colors={{
        primary: "from-blue-500",
        secondary: "to-cyan-500"
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
      getAddressFromRow={getTokenAddress}
    />
  );
}
