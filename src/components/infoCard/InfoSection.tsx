interface ProjectInfoSectionProps {
  type: string;
  chain: string;
  launchTokenDate: string;
  launchNFTDate: string;
}

export function ProjectInfoSection({ type, chain, launchTokenDate, launchNFTDate }: ProjectInfoSectionProps) {
  return (
    <div className="pt-2 border-t border-[#83E9FF1A]">
      <h3 className="text-sm text-white mb-2">Project Information</h3>
      <div className="space-y-1">
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-400">Type</span>
          <span className="text-xs text-white font-medium">{type}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-400">Chain</span>
          <span className="text-xs text-white font-medium">{chain}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-400">Launch token</span>
          <span className="text-xs text-white font-medium">{launchTokenDate}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-400">Launch NFT</span>
          <span className="text-xs text-white font-medium">{launchNFTDate}</span>
        </div>
      </div>
    </div>
  );
}
