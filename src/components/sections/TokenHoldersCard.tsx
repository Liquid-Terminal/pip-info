"use client";

import { Card } from "@/components/ui/card";
import { Download, Users } from "lucide-react";
import { useHoldersData } from "@/hooks/useHoldersData";
import { HoldersAPI } from "@/lib/api/holders";
import { TOKEN_NAMES, API_CONFIG } from "@/config/constants";

interface TokenHoldersCardProps {
  tokenId: string;
}

export function TokenHoldersCard({ tokenId }: TokenHoldersCardProps) {
  const { holders, totalHolders, loading, error } = useHoldersData({
    tokenName: TOKEN_NAMES.PIP,
    refreshInterval: API_CONFIG.HOLDERS_REFRESH_INTERVAL
  });

  const downloadCSV = () => {
    if (!holders.length) return;

    const headers = ["Rank", "Address", "Balance", "Percentage"];
    const csvContent = [
      headers.join(","),
      ...holders.map(holder => 
        `${holder.rank},"${holder.address}","${HoldersAPI.formatBalance(holder.balance)}","${holder.percentage.toFixed(2)}%"`
      )
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `pip-holders-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <Card className="bg-[#051728E5] border-2 border-[#83E9FF4D] hover:border-[#83E9FF80] transition-colors shadow-[0_4px_24px_0_rgba(0,0,0,0.25)] backdrop-blur-sm">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Top Holders</h3>
                <p className="text-sm text-gray-400">Token distribution</p>
              </div>
            </div>
          </div>
          <div className="text-center py-8">
            <div className="text-white/60">Loading holders data...</div>
          </div>
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="bg-[#051728E5] border-2 border-[#83E9FF4D] hover:border-[#83E9FF80] transition-colors shadow-[0_4px_24px_0_rgba(0,0,0,0.25)] backdrop-blur-sm">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Top Holders</h3>
                <p className="text-sm text-gray-400">Token distribution</p>
              </div>
            </div>
          </div>
          <div className="text-center py-8">
            <div className="text-red-400">Error: {error}</div>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="bg-[#051728E5] border-2 border-[#83E9FF4D] hover:border-[#83E9FF80] transition-colors shadow-[0_4px_24px_0_rgba(0,0,0,0.25)] backdrop-blur-sm">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Top Holders</h3>
              <p className="text-sm text-gray-400">Token distribution</p>
            </div>
          </div>
          <button
            onClick={downloadCSV}
            disabled={!holders.length}
            className="flex items-center gap-2 px-3 py-2 bg-[#112941] hover:bg-[#1a3654] disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm rounded-lg transition-colors"
          >
            <Download className="w-4 h-4" />
            CSV
          </button>
        </div>

        <div className="space-y-3">
          {holders.slice(0, 5).map((holder) => (
            <div key={holder.rank} className="flex items-center justify-between p-3 bg-[#112941] rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-[#83E9FF] text-black text-xs font-bold rounded-full flex items-center justify-center">
                  {holder.rank}
                </div>
                <div>
                  <p className="text-white text-sm font-medium">{holder.address}</p>
                  <p className="text-gray-400 text-xs">{HoldersAPI.formatBalance(holder.balance)} PIP</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-white text-sm font-medium">{holder.percentage.toFixed(2)}%</p>
                <div className="w-16 h-1 bg-gray-700 rounded-full mt-1">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"
                    style={{ width: `${Math.min(holder.percentage, 100)}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t border-[#83E9FF1A]">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">Total Holders</span>
            <span className="text-white font-medium">{totalHolders.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
