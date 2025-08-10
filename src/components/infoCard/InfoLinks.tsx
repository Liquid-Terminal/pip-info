import { Twitter, Globe,  Send, ExternalLink } from "lucide-react";
import Image from "next/image";

interface LinksSectionProps {
  links: {
    website?: string;
    telegram?: string;
    twitter?: string;
    discord?: string;
    github?: string;
    whitepaper?: string;
    trading?: string;
    nft?: string;
  };
}

export function LinksSection({ links }: LinksSectionProps) {
  return (
    <div className="pt-3 border-t border-[#83E9FF1A]">
      <h3 className="text-sm text-white mb-3">Links</h3>
      <div className="grid grid-cols-2 gap-2">
        {links.website && (
          <a
            href={links.website}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 p-2 rounded-md bg-[#112941] hover:bg-[#1a3654] transition-colors group cursor-pointer"
          >
            <Globe size={14} className="text-[#F9E370] flex-shrink-0" />
            <span className="text-xs text-white flex-1">Website</span>
            <ExternalLink size={12} className="text-gray-400 group-hover:text-[#83E9FF] transition-colors" />
          </a>
        )}

        {links.telegram && (
          <a
            href={links.telegram}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 p-2 rounded-md bg-[#112941] hover:bg-[#1a3654] transition-colors group cursor-pointer"
          >
            <Send size={14} className="text-[#F9E370] flex-shrink-0" />
            <span className="text-xs text-white flex-1">Telegram</span>
            <ExternalLink size={12} className="text-gray-400 group-hover:text-[#83E9FF] transition-colors" />
          </a>
        )}

        {links.twitter && (
          <a
            href={links.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 p-2 rounded-md bg-[#112941] hover:bg-[#1a3654] transition-colors group cursor-pointer"
          >
            <Twitter size={14} className="text-[#F9E370] flex-shrink-0" />
            <span className="text-xs text-white flex-1">Twitter</span>
            <ExternalLink size={12} className="text-gray-400 group-hover:text-[#83E9FF] transition-colors" />
          </a>
        )}

        {links.trading && (
          <a
            href={links.trading}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 p-2 rounded-md bg-[#112941] hover:bg-[#1a3654] transition-colors group cursor-pointer"
          >
            <Image
              src="https://app.hyperliquid.xyz/coins/HYPE_USDC.svg"
              alt="HyperLiquid"
              width={14}
              height={14}
              className="flex-shrink-0"
            />
            <span className="text-xs text-white flex-1">Trade</span>
            <ExternalLink size={12} className="text-gray-400 group-hover:text-[#83E9FF] transition-colors" />
          </a>
        )}

        {links.nft && (
          <a
            href={links.nft}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 p-2 rounded-md bg-[#112941] hover:bg-[#1a3654] transition-colors group cursor-pointer"
          >
            <Image
              src="/driptrade.png"
              alt="Drip.Trade"
              width={14}
              height={14}
              className="flex-shrink-0"
            />
            <span className="text-xs text-white flex-1">NFT</span>
            <ExternalLink size={12} className="text-gray-400 group-hover:text-[#83E9FF] transition-colors" />
          </a>
        )}
      </div>
    </div>
  );
}
