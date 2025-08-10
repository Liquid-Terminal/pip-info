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

export interface ColumnMetaInfo {
  width: string;
  align: "left" | "right" | "center";
}


