"use client";

import { Copy, Check } from "lucide-react";
import { useState } from "react";

interface TokenInfoSectionProps {
  tokenInfo: {
    symbol: string;
    totalSupply: string;
    marketCap: string;
    price: string;
  };
}

export function TokenInfoSection({ tokenInfo }: TokenInfoSectionProps) {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copyToClipboard = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    } catch {
      // Error handled silently
    }
  };

  return (
    <div className="space-y-3 pt-3 border-t border-[#83E9FF1A]">
      <h3 className="text-sm text-white">Token Information</h3>
      
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-400">Symbol</span>
          <span className="text-xs text-white font-medium">{tokenInfo.symbol}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-400">Price</span>
          <span className="text-xs text-white font-medium">{tokenInfo.price}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-400">Market Cap</span>
          <span className="text-xs text-white font-medium">{tokenInfo.marketCap}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-400">Total Supply</span>
          <div className="flex items-center gap-1">
            <span className="text-xs text-white font-medium">{tokenInfo.totalSupply}</span>
            <button
              onClick={() => copyToClipboard(tokenInfo.totalSupply, 'supply')}
              className="text-gray-400 hover:text-[#83E9FF] transition-colors"
            >
              {copiedField === 'supply' ? <Check size={10} /> : <Copy size={10} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
