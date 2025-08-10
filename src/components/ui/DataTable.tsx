"use client";

import { useMemo, useState } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  type PaginationState,
} from "@tanstack/react-table";
import { Copy, Check } from "lucide-react";
import { Pagination } from "@/components/ui/Pagination";
import { DataTableHeader } from "./data-table/Header";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export interface ColumnConfig {
  key: string;
  label: string;
  width: string;
  align?: "left" | "right" | "center";
  render?: (value: unknown, row: unknown) => React.ReactNode;
}

export interface DataTableProps<T> {
  data: T[];
  columns: ColumnConfig[];
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  colors: {
    primary: string;
    secondary: string;
  };
  onExport: () => void;
  loading: boolean;
  error: string | null;
  currentPage: number;
  itemsPerPage: number;
  totalPages: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (itemsPerPage: number) => void;
  getAddressFromRow: (row: T) => string;
}

interface ColumnMetaInfo {
  width: string;
  align: "left" | "right" | "center";
  config: ColumnConfig;
}

// Helper for default cell rendering based on key
function renderDefaultCell(title: string, key: string, value: unknown) {
  if (key === "amount") {
    return (
      <div className="text-white text-xs font-medium">
        {typeof value === "number" ? value.toLocaleString() : String(value)} PIP
      </div>
    );
  }
  if (key === "value") {
    return (
      <div className="text-white text-xs font-medium">
        {typeof value === "string" ? value : `$${value}`}
      </div>
    );
  }
  if (key === "nftCount") {
    return (
      <div className="text-white text-xs font-medium">
        {typeof value === "number" ? value.toLocaleString() : String(value)} NFTs
      </div>
    );
  }
  if (key === "percentage") {
    const percentage = typeof value === "number" ? value : parseFloat(String(value));
    const barColor = title.toLowerCase().includes("nft")
      ? "from-purple-500 to-pink-500"
      : "from-blue-500 to-cyan-500";
    return (
      <div>
        <div className="text-white text-xs font-medium">{percentage.toFixed(2)}%</div>
        <div className="w-16 h-1 bg-gray-700 rounded-full mt-1 ml-auto">
          <div
            className={`h-full bg-gradient-to-r ${barColor} rounded-full`}
            style={{ width: `${Math.min(percentage, 100)}%` }}
          />
        </div>
      </div>
    );
  }
  return <div className="text-white text-xs font-medium">{String(value)}</div>;
}

export function DataTable<T>({
  data,
  columns,
  title,
  subtitle,
  icon,
  colors,
  onExport,
  loading,
  error,
  currentPage,
  itemsPerPage,
  totalPages,
  totalItems,
  onPageChange,
  onItemsPerPageChange,
  getAddressFromRow,
}: DataTableProps<T>) {
  const [copiedAddress, setCopiedAddress] = useState<string | null>(null);

  const copyAddress = async (address: string) => {
    try {
      await navigator.clipboard.writeText(address);
      setCopiedAddress(address);
      setTimeout(() => setCopiedAddress(null), 2000);
    } catch (err) {
      console.error("Failed to copy address:", err);
    }
  };

  // Build TanStack column defs from ColumnConfig, preserving meta info
  const columnDefs = useMemo<ColumnDef<T, unknown>[]>(() => {
    return columns.map((col) => ({
      id: col.key,
      accessorKey: col.key as string,
      header: col.label,
      cell: (info) => {
        const key = col.key;
        const rowOriginal = info.row.original as unknown;
        if (key === "address") {
          const address = getAddressFromRow(info.row.original as T);
          const isCopied = copiedAddress === address;
          const rank = ((info.row.original as Record<string, unknown>).rank as number) || info.row.index + 1;
          return (
            <div className="flex items-center gap-2">
              <div className="w-5.5 h-5.5 bg-[#83E9FF] text-black text-xs font-bold rounded-full flex items-center justify-center flex-shrink-0">
                {rank}
              </div>
              <div className="flex items-center gap-2 min-w-0">
                <span className="text-white text-xs font-mono truncate">{address}</span>
                <button
                  onClick={() => copyAddress(address)}
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
        const value = info.getValue();
        if (col.render) return col.render(value, rowOriginal);
        return renderDefaultCell(title, key, value);
      },
      meta: {
        width: col.width,
        align: col.align ?? "left",
        config: col,
      } as ColumnMetaInfo,
      enableSorting: false,
      enableHiding: false,
    }));
  }, [columns, copiedAddress, getAddressFromRow, title]);

  const table = useReactTable({
    data,
    columns: columnDefs,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    onPaginationChange: (updater) => {
      const prev: PaginationState = {
        pageIndex: currentPage - 1,
        pageSize: itemsPerPage,
      };
      const next = typeof updater === "function" ? updater(prev) : updater;
      if (next.pageIndex !== prev.pageIndex) {
        onPageChange(next.pageIndex + 1);
      }
      if (next.pageSize !== prev.pageSize) {
        onItemsPerPageChange(next.pageSize);
      }
    },
    state: {
      pagination: {
        pageIndex: Math.max(0, currentPage - 1),
        pageSize: itemsPerPage,
      },
    },
  });

  if (loading && currentPage === 1) {
    return (
      <div className="text-center py-8">
        <div className="text-white/60 text-base">Loading {title.toLowerCase()} data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <div className="text-red-400 text-base">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <DataTableHeader
        title={title}
        subtitle={subtitle}
        icon={icon}
        colors={colors}
        onExport={onExport}
        dataLength={data.length}
      />

      <div className="w-full overflow-hidden bg-[#051728E5] border border-[#83E9FF4D] rounded-lg">
        <Table>
          <TableHeader className="bg-[#112941]">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="border-b border-[#83E9FF1A] hover:bg-transparent">
                {headerGroup.headers.map((header) => {
                  const meta = header.column.columnDef.meta as ColumnMetaInfo | undefined;
                  const align = meta?.align ?? "left";
                  const width = meta?.width ?? "";
                  return (
                    <TableHead
                      key={header.id}
                      className={`py-2.5 px-3.5 text-xs font-medium text-gray-400 ${width} ${
                        align === "right" ? "text-right" : align === "center" ? "text-center" : "text-left"
                      }`}
                    >
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} className="border-b border-[#83E9FF0A] hover:bg-[#112941] transition-colors">
                {row.getVisibleCells().map((cell) => {
                  const meta = cell.column.columnDef.meta as ColumnMetaInfo | undefined;
                  const align = meta?.align ?? "left";
                  const width = meta?.width ?? "";
                  return (
                    <TableCell
                      key={cell.id}
                      className={`py-2.5 px-3.5 ${width} ${
                        align === "right" ? "text-right" : align === "center" ? "text-center" : "text-left"
                      }`}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="p-3 border-t border-[#83E9FF1A]">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
            onPageChange={(p) => {
              table.setPageIndex(Math.max(0, p - 1));
              onPageChange(p);
            }}
            onItemsPerPageChange={(n) => {
              table.setPageSize(n);
              onItemsPerPageChange(n);
            }}
          />
        </div>
      </div>

      <div className="mt-2 pt-2 border-t border-[#83E9FF1A]">
        <div className="flex items-center justify-between text-xs">
          <span className="text-gray-400">Total {title}</span>
          <span className="text-white font-medium">{totalItems.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}
