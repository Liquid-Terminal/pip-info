import { Check, Copy } from "lucide-react";

interface AddressCellProps {
  rank: number;
  address: string;
  copiedAddress: string | null;
  onCopy: (addr: string) => void;
}

export function AddressCell({ rank, address, copiedAddress, onCopy }: AddressCellProps) {
  const isCopied = copiedAddress === address;
  return (
    <div className="flex items-center gap-2">
      <div className="w-5.5 h-5.5 bg-[#83E9FF] text-black text-xs font-bold rounded-full flex items-center justify-center flex-shrink-0">
        {rank}
      </div>
      <div className="flex items-center gap-2 min-w-0">
        <span className="text-white text-xs font-mono truncate">{address}</span>
        <button
          onClick={() => onCopy(address)}
          className="p-1 hover:bg-[#1a3654] rounded transition-colors flex-shrink-0"
          title="Copy address"
        >
          {isCopied ? (
            <Check className="w-3.5 h-3.5 text-green-400" />
          ) : (
            <Copy className="w-3.5 h-3.5 text-gray-400 hover:text-white" />
          )}
        </button>
      </div>
    </div>
  );
}


