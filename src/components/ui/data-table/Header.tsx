import { Download } from "lucide-react";

interface HeaderProps {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  colors: { primary: string; secondary: string };
  onExport: () => void;
  dataLength: number;
}

export function DataTableHeader({
  title,
  subtitle,
  icon,
  colors,
  onExport,
  dataLength,
}: HeaderProps) {
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-3">
        <div className={`w-8 h-8 bg-gradient-to-r ${colors.primary} ${colors.secondary} rounded-lg flex items-center justify-center`}>
          {icon}
        </div>
        <div>
          <h3 className="text-base font-semibold text-white">{title}</h3>
          <p className="text-xs text-gray-400">{subtitle}</p>
        </div>
      </div>
      <button
        onClick={onExport}
        disabled={!dataLength}
        className="flex items-center gap-2 px-2 py-1 bg-[#112941] hover:bg-[#1a3654] disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs rounded transition-colors"
      >
        <Download className="w-3 h-3" />
        CSV
      </button>
    </div>
  );
}


