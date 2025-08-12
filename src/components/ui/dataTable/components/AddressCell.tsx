import { Copy, Check, ExternalLink } from "lucide-react";

interface AddressCellProps {
  rank: number;
  address: string;
  copiedAddress: string | null;
  onCopy: (address: string) => void;
  isNFT?: boolean;
}

export function AddressCell({ rank, address, copiedAddress, onCopy, isNFT = false }: AddressCellProps) {
  const isCopied = copiedAddress === address;

  const handleAddressClick = () => {
    if (isNFT) {
      window.open(`https://hyperevmscan.io/address/${address}`, '_blank');
    } else {
      window.open(`https://liquidterminal.xyz/explorer/address/${address}`, '_blank');
    }
  };

  return (
    <div className="flex items-center gap-2">
      <div className={`${rank > 999 ? 'w-8 h-6 text-sm' : 'w-6 h-6 text-sm'} bg-[#83E9FF] text-black font-bold rounded-full flex items-center justify-center flex-shrink-0`}>
        {rank}
      </div>
      <div className="flex items-center gap-2 min-w-0">
        <span 
          className="text-white text-sm font-mono truncate cursor-pointer hover:text-[#83E9FF] transition-colors"
          onClick={handleAddressClick}
          title={isNFT ? "Click to view on HyperEVM Scan" : "Click to view on Liquid Terminal"}
        >
          {address}
        </span>
        <div className="flex items-center gap-1">
          <button
            onClick={handleAddressClick}
            className="p-1 hover:bg-[#1a3654] rounded transition-colors flex-shrink-0"
            title={isNFT ? "View on HyperEVM Scan" : "View on Liquid Terminal"}
          >
            <ExternalLink className="w-3.5 h-3.5 text-white/70 hover:text-white" />
          </button>
          <button
            onClick={() => onCopy(address)}
            className="p-1 hover:bg-[#1a3654] rounded transition-colors flex-shrink-0"
            title="Copy address"
          >
            {isCopied ? (
              <Check className="w-3.5 h-3.5 text-green-400" />
            ) : (
              <Copy className="w-3.5 h-3.5 text-white/70 hover:text-white" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
