"use client";

import { flexRender } from "@tanstack/react-table";
import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { TableHeader as DataTableHeader } from "./components/TableHeader";
import { DataTableBody } from "./components/TableBody";
import { TableFooter } from "./components/TableFooter";
import { useDataTable } from "./hooks/useDataTable";
import type { DataTableProps, ColumnMetaInfo } from "./types";

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
  totalHolders,
  lastUpdated,
}: DataTableProps<T>) {
  const { table, tableState, copyAddress } = useDataTable({
    data,
    columns,
    title,
    currentPage,
    itemsPerPage,
    onPageChange,
    onItemsPerPageChange,
    getAddressFromRow,
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
        totalHolders={totalHolders}
        lastUpdated={lastUpdated}
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
                      className={`py-2.5 px-3.5 text-xs font-medium text-white/70 ${width} ${
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
          <DataTableBody
            table={table}
            getAddressFromRow={getAddressFromRow}
            copiedAddress={tableState.copiedAddress}
            onCopyAddress={copyAddress}
          />
        </Table>

        <TableFooter
          title={title}
          totalItems={totalItems}
          currentPage={currentPage}
          totalPages={totalPages}
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
  );
}
