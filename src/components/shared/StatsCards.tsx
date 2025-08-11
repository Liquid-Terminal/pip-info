"use client";

interface StatsCardsProps {
  type: 'token' | 'nft';
  stats: {
    totalHolders: number;
    totalSupply?: string;
    circulatingSupply?: string;
    burnedSupply?: string;
    totalItems?: number;
    floorPrice?: string;
    price?: string;
    marketCap?: string;
    contractAddress?: string;
    holdersDistribution: Array<{
      range: string;
      percentage: number;
      count: number;
    }>;
    supplyBreakdown?: Array<{
      label: string;
      value: number;
      color: string;
    }>;
  };
}

export function StatsCards({ type, stats }: StatsCardsProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
      {/* Left Card - Statistics */}
      <div className="bg-[#051728E5] border border-[#83E9FF4D] rounded-lg p-4">
        <h3 className="text-base font-semibold text-white mb-4">
          {type === 'token' ? 'Token' : 'NFT'} Statistics
        </h3>
        <div className="grid grid-cols-2 gap-3">
          <div className="text-center">
            <div className="text-xs text-white font-medium">Total Holders</div>
            <div className="text-sm font-bold text-white">{stats.totalHolders.toLocaleString('en-US')}</div>
          </div>
          
          {type === 'token' ? (
            <>
              <div className="text-center">
                <div className="text-xs text-white font-medium">Total Supply</div>
                <div className="text-sm font-bold text-white">{stats.totalSupply}</div>
              </div>
              <div className="text-center">
                <div className="text-xs text-white font-medium">Circulating</div>
                <div className="text-sm font-bold text-green-400">{stats.circulatingSupply}</div>
              </div>
              <div className="text-center">
                <div className="text-xs text-white font-medium">Burned</div>
                <div className="text-sm font-bold text-red-400">{stats.burnedSupply}</div>
              </div>
              <div className="text-center">
                <div className="text-xs text-white font-medium">Price</div>
                <div className="text-sm font-bold text-white">{stats.price}</div>
              </div>
              <div className="text-center">
                <div className="text-xs text-white font-medium">Market Cap</div>
                <div className="text-sm font-bold text-white">{stats.marketCap}</div>
              </div>
            </>
          ) : (
            <>
              <div className="text-center">
                <div className="text-xs text-white font-medium">Total NFTs</div>
                <div className="text-sm font-bold text-white">{stats.totalSupply}</div>
              </div>
              <div className="text-center">
                <div className="text-xs text-white font-medium">Floor Price</div>
                <div className="text-sm font-bold text-white">{stats.floorPrice}</div>
              </div>
              <div className="text-center">
                <div className="text-xs text-white font-medium">Contract</div>
                <div className="text-sm font-bold text-white text-xs truncate">{stats.contractAddress}</div>
              </div>

            </>
          )}
        </div>
      </div>

      {/* Right Card - Charts */}
      <div className="bg-[#051728E5] border border-[#83E9FF4D] rounded-lg p-4 lg:col-span-2">
        <div className="flex items-start gap-6">
          {/* Holders Distribution - Left */}
          <div className="flex-1">
            <h4 className="text-sm font-medium text-white mb-3">Holders by Balance Range</h4>
            <div className="space-y-2">
              {stats.holdersDistribution.map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-16 text-xs text-white/70">{item.range}</div>
                  <div className="flex-1 bg-[#112941] rounded-full h-2 border border-[#83E9FF1A]">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${
                        type === 'token' 
                          ? 'bg-gradient-to-r from-[#83E9FF] to-[#83E9FF80]' 
                          : 'bg-gradient-to-r from-[#F9E370] to-[#F9E37080]'
                      }`}
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                  <div className="w-12 text-xs text-white text-right">{item.percentage}%</div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Pie Chart - Right */}
          {type === 'token' && stats.supplyBreakdown && (
            <div className="flex-shrink-0">
              <h4 className="text-sm font-medium text-white mb-3 text-center">Supply Distribution</h4>
              <div className="flex items-center gap-4">
                {/* Pie Chart */}
                <div className="relative w-32 h-32">
                  <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
                    {stats.supplyBreakdown.map((item, index) => {
                      const total = stats.supplyBreakdown?.reduce((sum, i) => sum + i.value, 0) || 1;
                      const percentage = (item.value / total) * 100;
                      const startAngle = stats.supplyBreakdown?.slice(0, index).reduce((sum, i) => sum + (i.value / total) * 360, 0) || 0;
                      const endAngle = startAngle + (percentage * 360 / 100);
                      
                      const x1 = 50 + 35 * Math.cos(startAngle * Math.PI / 180);
                      const y1 = 50 + 35 * Math.sin(startAngle * Math.PI / 180);
                      const x2 = 50 + 35 * Math.cos(endAngle * Math.PI / 180);
                      const y2 = 50 + 35 * Math.sin(endAngle * Math.PI / 180);
                      
                      const largeArcFlag = percentage > 50 ? 1 : 0;
                      
                      return (
                        <g key={index}>
                          <path
                            d={`M 50 50 L ${x1} ${y1} A 35 35 0 ${largeArcFlag} 1 ${x2} ${y2} Z`}
                            fill={item.color}
                            className="transition-all duration-300 hover:opacity-80 cursor-pointer"
                          />
                          {/* Invisible path for hover area */}
                          <path
                            d={`M 50 50 L ${x1} ${y1} A 35 35 0 ${largeArcFlag} 1 ${x2} ${y2} Z`}
                            fill="transparent"
                            className="cursor-pointer"
                            onMouseEnter={(e) => {
                              const tooltip = document.createElement('div');
                              tooltip.className = 'absolute bg-[#112941] border border-[#83E9FF1A] rounded px-2 py-1 text-xs text-white z-50';
                              tooltip.innerHTML = `
                                <div class="font-medium">${item.label}</div>
                                <div class="text-white/70">${item.value.toLocaleString('en-US')} (${percentage.toFixed(1)}%)</div>
                              `;
                              tooltip.style.left = e.clientX + 10 + 'px';
                              tooltip.style.top = e.clientY - 10 + 'px';
                              tooltip.id = 'hover-tooltip';
                              document.body.appendChild(tooltip);
                            }}
                            onMouseLeave={() => {
                              const tooltip = document.getElementById('hover-tooltip');
                              if (tooltip && tooltip.parentNode) {
                                tooltip.parentNode.removeChild(tooltip);
                              }
                            }}
                          />
                        </g>
                      );
                    })}
                  </svg>
                </div>
                
                {/* Legend */}
                <div className="space-y-1">
                  {stats.supplyBreakdown.map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div 
                        className="w-2 h-2 rounded-full" 
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-xs text-white">{item.label}</span>
                      <span className="text-xs text-white/70 ml-auto">
                        {((item.value / (stats.supplyBreakdown?.reduce((sum, i) => sum + i.value, 0) || 1)) * 100).toFixed(1)}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
