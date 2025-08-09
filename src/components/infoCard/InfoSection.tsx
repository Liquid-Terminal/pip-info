interface ProjectInfoSectionProps {
  type: string;
  chain: string;
  launch: string;
}

export function ProjectInfoSection({ type, chain, launch }: ProjectInfoSectionProps) {
  return (
    <div className="space-y-2 pt-3 border-t border-[#83E9FF1A]">
      <div className="flex justify-between items-center">
        <span className="text-xs text-gray-400">Type</span>
        <span className="text-xs text-white font-medium">{type}</span>
      </div>
      
      <div className="flex justify-between items-center">
        <span className="text-xs text-gray-400">Chain</span>
        <span className="text-xs text-white font-medium">{chain}</span>
      </div>
      
      <div className="flex justify-between items-center">
        <span className="text-xs text-gray-400">Launch Date</span>
        <span className="text-xs text-white font-medium">{launch}</span>
      </div>
    </div>
  );
}
