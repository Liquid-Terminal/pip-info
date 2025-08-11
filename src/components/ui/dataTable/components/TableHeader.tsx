import { Download } from "lucide-react";

interface TableHeaderProps {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  colors: {
    primary: string;
    secondary: string;
  };
  onExport: () => void;
  dataLength: number;
  totalHolders?: number;
  lastUpdated?: string;
}

export function TableHeader({
  title,
  subtitle,
  icon,
  onExport,
  dataLength,
  lastUpdated,
}: TableHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 flex items-center justify-center">
          {icon}
        </div>
                    <div className="flex items-center gap-4">
              <h3 className="text-xl text-white font-pip">{title}</h3>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <span className="text-sm text-[#f9e370] font-medium">{subtitle}</span>
                </div>
              </div>
            </div>
      </div>
      <div className="flex items-center gap-3">
        {lastUpdated && (
          <span className="text-sm text-white">
            Last updated: {new Date(lastUpdated).toLocaleString('en-US')}
          </span>
        )}
        <button
          onClick={onExport}
          disabled={!dataLength}
          className="flex items-center gap-2 px-2 py-1 bg-[#1a1a1a] hover:bg-[#2a2a2a] disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs rounded transition-colors"
        >
          <Download className="w-3 h-3" />
          CSV
        </button>
      </div>
    </div>
  );
}
