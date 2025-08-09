"use client";

import { Card } from "@/components/ui/card";
import { Download, Activity, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { useState } from "react";

interface TokenTransactionsCardProps {
  tokenId: string;
}

interface Transaction {
  hash: string;
  from: string;
  to: string;
  amount: string;
  type: "buy" | "sell" | "transfer";
  timestamp: string;
  value: string;
}

export function TokenTransactionsCard({ tokenId }: TokenTransactionsCardProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);

  // Mock data pour l'exemple
  const mockTransactions: Transaction[] = [
    { 
      hash: "0x1234...abcd", 
      from: "0x1111...2222", 
      to: "0x3333...4444", 
      amount: "1,234", 
      type: "buy", 
      timestamp: "2 min ago",
      value: "$16.63"
    },
    { 
      hash: "0x5678...efgh", 
      from: "0x5555...6666", 
      to: "0x7777...8888", 
      amount: "567", 
      type: "sell", 
      timestamp: "5 min ago",
      value: "$7.64"
    },
    { 
      hash: "0x9abc...ijkl", 
      from: "0x9999...aaaa", 
      to: "0xbbbb...cccc", 
      amount: "890", 
      type: "buy", 
      timestamp: "8 min ago",
      value: "$11.99"
    },
    { 
      hash: "0xdef0...mnop", 
      from: "0xdddd...eeee", 
      to: "0xffff...0000", 
      amount: "432", 
      type: "transfer", 
      timestamp: "12 min ago",
      value: "$5.82"
    },
    { 
      hash: "0x1234...qrst", 
      from: "0x1111...2222", 
      to: "0x3333...4444", 
      amount: "2,100", 
      type: "buy", 
      timestamp: "15 min ago",
      value: "$28.28"
    },
  ];

  const downloadCSV = () => {
    const headers = ["Hash", "From", "To", "Amount", "Type", "Timestamp", "Value"];
    const csvContent = [
      headers.join(","),
      ...mockTransactions.map(tx => 
        `"${tx.hash}","${tx.from}","${tx.to}","${tx.amount}","${tx.type}","${tx.timestamp}","${tx.value}"`
      )
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `pip-transactions-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "buy":
        return <ArrowUpRight className="w-4 h-4 text-green-400" />;
      case "sell":
        return <ArrowDownRight className="w-4 h-4 text-red-400" />;
      default:
        return <Activity className="w-4 h-4 text-blue-400" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "buy":
        return "text-green-400";
      case "sell":
        return "text-red-400";
      default:
        return "text-blue-400";
    }
  };

  return (
    <Card className="bg-[#051728E5] border-2 border-[#83E9FF4D] hover:border-[#83E9FF80] transition-colors shadow-[0_4px_24px_0_rgba(0,0,0,0.25)] backdrop-blur-sm">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Recent Transactions</h3>
              <p className="text-sm text-gray-400">Latest activity</p>
            </div>
          </div>
          <button
            onClick={downloadCSV}
            className="flex items-center gap-2 px-3 py-2 bg-[#112941] hover:bg-[#1a3654] text-white text-sm rounded-lg transition-colors"
          >
            <Download className="w-4 h-4" />
            CSV
          </button>
        </div>

        <div className="space-y-3">
          {mockTransactions.map((tx, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-[#112941] rounded-lg">
              <div className="flex items-center gap-3">
                {getTypeIcon(tx.type)}
                <div>
                  <p className="text-white text-sm font-medium">{tx.amount} PIP</p>
                  <p className="text-gray-400 text-xs">{tx.timestamp}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`text-sm font-medium ${getTypeColor(tx.type)}`}>
                  {tx.type.toUpperCase()}
                </p>
                <p className="text-white text-xs">{tx.value}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t border-[#83E9FF1A]">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">24h Volume</span>
            <span className="text-white font-medium">$1,234,567</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
