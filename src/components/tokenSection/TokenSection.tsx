import { TokenHoldersCard } from "./TokenHoldersCard";

interface TokenSectionProps {
  tokenId: string;
}

export function TokenSection({ tokenId }: TokenSectionProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold text-white mb-6">Token Analytics</h2>
      
      {/* Card Holders - Full width */}
      <div className="w-full">
        <TokenHoldersCard tokenId={tokenId} />
      </div>
    </div>
  );
}
