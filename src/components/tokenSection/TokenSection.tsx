import { TokenHoldersCard } from "./TokenHoldersCard";

interface TokenSectionProps {
  tokenId: string;
}

export function TokenSection({ tokenId }: TokenSectionProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl text-white mb-6 font-pip">Token Analytics</h2>
      
      {/* Card Holders - Full width */}
      <div className="w-full">
        <TokenHoldersCard tokenId={tokenId} />
      </div>
    </div>
  );
}
