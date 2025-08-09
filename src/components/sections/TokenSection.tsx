import { TokenHoldersCard } from "./TokenHoldersCard";
import { TokenTransactionsCard } from "./TokenTransactionsCard";
import { TokenChartCard } from "./TokenChartCard";

interface TokenSectionProps {
  tokenId: string;
}

export function TokenSection({ tokenId }: TokenSectionProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white mb-6">Token Analytics</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Card Holders */}
        <TokenHoldersCard tokenId={tokenId} />
        
        {/* Card Transactions */}
        <TokenTransactionsCard tokenId={tokenId} />
      </div>
      
      {/* Chart - Full width */}
      <div className="col-span-full">
        <TokenChartCard tokenId={tokenId} />
      </div>
    </div>
  );
}
