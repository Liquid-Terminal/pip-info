"use client";

import Image from "next/image";
import { useHoldersData } from "@/hooks/useHoldersData";
import { useTokenData } from "@/hooks/useTokenData";
import { useRealTimePrice } from "@/hooks/useRealTimePrice";
import { PROJECT_INFO } from "@/config/constants";
import { DataTable } from "@/components/ui/dataTable";
import { tokenColumns, getTokenAddress } from "@/config/tableConfigs";
import { Holder } from "@/lib/types/token";

export function TokenHoldersCard({ tokenId }: { tokenId: string }) {
  console.log('Token ID:', tokenId); // Temporary to avoid unused variable warning

  const { tokenInfo } = useTokenData({
    tokenId: PROJECT_INFO.PIP.tokenId,
    refreshInterval: 30000
  });

  const { 
    paginatedHolders, 
    totalHolders, 
    loading, 
    error,
    lastUpdated,
    currentPage,
    itemsPerPage,
    totalPages,
    setCurrentPage,
    setItemsPerPage
  } = useHoldersData({
    tokenName: PROJECT_INFO.PIP.tokenName,
    refreshInterval: 30000
  });

  const { price: realTimePrice } = useRealTimePrice({});

  const downloadCSV = () => {
    if (!paginatedHolders.length) return;

    // Export CSV
    const csvContent = `Address,Amount,Value,% Held\n${paginatedHolders.map((holder: Holder) => 
              `${holder.address},${holder.balance.toLocaleString('en-US')},${(holder.balance * (realTimePrice || 0)).toFixed(2)},${((holder.balance / totalHolders) * 100).toFixed(2)}%`
    ).join('\n')}`;
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${PROJECT_INFO.PIP.exportPrefix}-${currentPage}-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  // Préparer les données avec la valeur calculée en temps réel
  const dataWithValue = paginatedHolders.map((holder: Holder) => {
    const price = realTimePrice || (tokenInfo?.price ? parseFloat(tokenInfo.price.replace('$', '')) : 0);
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
      subtitle=""
      icon={<Image src={PROJECT_INFO.PIP.tokenIcon} alt="Token" width={100} height={100} className="w-8 h-8 rounded" />}
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
      totalHolders={totalHolders}
      lastUpdated={lastUpdated}
    />
  );
}
