import { Pagination } from "@/components/ui/Pagination";

interface PaginationBridgeProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (n: number) => void;
}

export function PaginationBridge(props: PaginationBridgeProps) {
  return <Pagination {...props} />;
}


