"use client";

import { Card } from "@/components/ui/card";
import { TrendingUp, Calendar } from "lucide-react";
import { useState } from "react";

interface TokenChartCardProps {
  tokenId: string;
}

export function TokenChartCard({ tokenId }: TokenChartCardProps) {
  const [timeframe, setTimeframe] = useState<"1D" | "7D" | "1M" | "3M" | "1Y">("7D");

  const timeframes = ["1D", "7D", "1M", "3M", "1Y"];

  // Mock data pour le chart
  const mockChartData = [
    { time: "00:00", price: 13.2 },
    { time: "04:00", price: 13.5 },
    { time: "08:00", price: 13.8 },
    { time: "12:00", price: 13.4 },
    { time: "16:00", price: 13.6 },
    { time: "20:00", price: 13.9 },
    { time: "24:00", price: 13.7 },
  ];

  return (
    <Card className="bg-[#051728E5] border-2 border-[#83E9FF4D] hover:border-[#83E9FF80] transition-colors shadow-[0_4px_24px_0_rgba(0,0,0,0.25)] backdrop-blur-sm">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Price Chart</h3>
              <p className="text-sm text-gray-400">PIP/USDC</p>
            </div>
          </div>
          
          {/* Timeframe selector */}
          <div className="flex items-center gap-2 bg-[#112941] rounded-lg p-1">
            {timeframes.map((tf) => (
              <button
                key={tf}
                onClick={() => setTimeframe(tf as any)}
                className={`px-3 py-1 text-xs rounded-md transition-colors ${
                  timeframe === tf
                    ? "bg-[#83E9FF] text-black font-medium"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {tf}
              </button>
            ))}
          </div>
        </div>

        {/* Chart placeholder */}
        <div className="relative h-64 bg-[#112941] rounded-lg p-4">
          <div className="flex items-end justify-between h-full">
            {mockChartData.map((point, index) => (
              <div key={index} className="flex flex-col items-center">
                <div 
                  className="w-2 bg-gradient-to-t from-[#83E9FF] to-purple-500 rounded-t"
                  style={{ 
                    height: `${(point.price / 14) * 100}%`,
                    minHeight: "4px"
                  }}
                />
                <span className="text-xs text-gray-400 mt-2">{point.time}</span>
              </div>
            ))}
          </div>
          
          {/* Price overlay */}
          <div className="absolute top-4 left-4">
            <div className="text-2xl font-bold text-white">$13.67</div>
            <div className="text-sm text-green-400">+2.34%</div>
          </div>
        </div>

        {/* Chart stats */}
        <div className="grid grid-cols-4 gap-4 mt-6 pt-6 border-t border-[#83E9FF1A]">
          <div className="text-center">
            <p className="text-xs text-gray-400">24h High</p>
            <p className="text-white font-medium">$13.89</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-400">24h Low</p>
            <p className="text-white font-medium">$13.21</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-400">24h Volume</p>
            <p className="text-white font-medium">$1.2M</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-400">Market Cap</p>
            <p className="text-white font-medium">$13.4M</p>
          </div>
        </div>
      </div>
    </Card>
  );
}
