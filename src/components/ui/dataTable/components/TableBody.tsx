import type { Table } from "@tanstack/react-table";
import { flexRender } from "@tanstack/react-table";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { AddressCell } from "./AddressCell";
import type { ColumnMetaInfo } from "../types";

interface DataTableBodyProps<T> {
  table: Table<T>;
  getAddressFromRow: (row: T) => string;
  copiedAddress: string | null;
  onCopyAddress: (address: string) => void;
}

export function DataTableBody<T>({
  table,
  getAddressFromRow,
  copiedAddress,
  onCopyAddress,
}: DataTableBodyProps<T>) {
  return (
    <TableBody>
      {table.getRowModel().rows.map((row) => (
        <TableRow key={row.id} className="border-b border-white/5 hover:bg-[#2a2a2a]/50 transition-colors">
          {row.getVisibleCells().map((cell) => {
            const meta = cell.column.columnDef.meta as ColumnMetaInfo | undefined;
            const align = meta?.align ?? "left";
            const width = meta?.width ?? "";
            const key = cell.column.id;

            return (
              <TableCell
                key={cell.id}
                className={`py-2.5 px-3.5 ${width} ${
                  align === "right" ? "text-right" : align === "center" ? "text-center" : "text-left"
                } text-white`}
              >
                {key === "address" ? (
                  <AddressCell
                    rank={((row.original as Record<string, unknown>).rank as number) || row.index + 1}
                    address={getAddressFromRow(row.original)}
                    copiedAddress={copiedAddress}
                    onCopy={onCopyAddress}
                  />
                ) : (
                  flexRender(cell.column.columnDef.cell, cell.getContext())
                )}
              </TableCell>
            );
          })}
        </TableRow>
      ))}
    </TableBody>
  );
}
