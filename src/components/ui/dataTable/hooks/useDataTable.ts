"use client";

import { useMemo, useState } from "react";
import type { ColumnDef, PaginationState } from "@tanstack/react-table";
import { useReactTable, getCoreRowModel } from "@tanstack/react-table";
import type { ColumnConfig, ColumnMetaInfo, TableState } from "../types";
import { renderDefaultCell } from "../utils/cellRenderers";

interface UseDataTableProps<T> {
  data: T[];
  columns: ColumnConfig[];
  title: string;
  currentPage: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (itemsPerPage: number) => void;
  getAddressFromRow: (row: T) => string;
}

export function useDataTable<T>({
  data,
  columns,
  title,
  currentPage,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
  getAddressFromRow,
}: UseDataTableProps<T>) {
  const [tableState, setTableState] = useState<TableState>({
    copiedAddress: null,
  });

  const copyAddress = async (address: string) => {
    try {
      await navigator.clipboard.writeText(address);
      setTableState({ copiedAddress: address });
      setTimeout(() => setTableState({ copiedAddress: null }), 2000);
    } catch (err) {
      console.error("Failed to copy address:", err);
    }
  };

  // Build TanStack column defs from ColumnConfig
  const columnDefs = useMemo<ColumnDef<T, unknown>[]>(() => {
    return columns.map((col) => ({
      id: col.key,
      accessorKey: col.key as string,
      header: col.label,
      cell: (info) => {
        const key = col.key;
        const rowOriginal = info.row.original as unknown;
        const value = info.getValue();
        
        if (col.render) return col.render(value, rowOriginal);
        return renderDefaultCell(title, key, value);
      },
      meta: {
        width: col.width,
        align: col.align ?? "left",
      } as ColumnMetaInfo,
      enableSorting: false,
      enableHiding: false,
    }));
  }, [columns, title]);

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

  return {
    table,
    tableState,
    copyAddress,
    getAddressFromRow,
  };
}
