import { Copy, Check } from "lucide-react";

interface AddressCellProps {
  rank: number;
  address: string;
  copiedAddress: string | null;
  onCopy: (address: string) => void;
}

export function AddressCell({ rank, address, copiedAddress, onCopy }: AddressCellProps) {
  const isCopied = copiedAddress === address;

  return (
    <div className="flex items-center gap-2">
      <div className={`${rank > 999 ? 'w-8 h-6 text-sm' : 'w-6 h-6 text-sm'} bg-[#83E9FF] text-black font-bold rounded-full flex items-center justify-center flex-shrink-0`}>
        {rank}
      </div>
      <div className="flex items-center gap-2 min-w-0">
        <span className="text-white text-sm font-mono truncate">{address}</span>
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
  );
}
