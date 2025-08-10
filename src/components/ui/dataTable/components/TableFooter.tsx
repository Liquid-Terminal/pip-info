import { Pagination } from "@/components/ui/Pagination";

interface TableFooterProps {
  title: string;
  totalItems: number;
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (itemsPerPage: number) => void;
}

export function TableFooter({
  title,
  totalItems,
  currentPage,
  totalPages,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
}: TableFooterProps) {
  return (
    <>
      <div className="p-3 border-t border-[#83E9FF1A]">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          onPageChange={onPageChange}
          onItemsPerPageChange={onItemsPerPageChange}
        />
      </div>
    </>
  );
}
