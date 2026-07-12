/** Action shown in the dropdown menu for each table row. */
export interface RowAction<TData> {
  label: string;
  icon?: React.ReactNode;
  onClick: (row: TData) => void;
  variant?: "default" | "destructive";
}

export interface FacetedFilterOption {
  label: string;
  value: string;
}

/** Filter config — renders a popover filter for the given column. */
export interface FacetedFilter {
  columnId: string;
  title: string;
  options: FacetedFilterOption[];
}

/** Optional default sort applied on mount. */
export interface InitialSort {
  id: string;
  desc: boolean;
}

export interface DataTableProps<TData> {
  /** Column definitions from `@tanstack/react-table`. */
  columns: import("@tanstack/react-table").ColumnDef<TData, unknown>[];
  /** Array of data rows. */
  data: TData[];
  /** Rows per page (default: 10). */
  pageSize?: number;
  /** Enable column sorting via header click (default: true). */
  enableSorting?: boolean;
  /** Enable row checkbox selection (default: false). */
  enableRowSelection?: boolean;
  /** Extra actions rendered next to the filter bar (e.g. export button). */
  toolbarActions?: React.ReactNode;
  /** Fired when a row is clicked. */
  onRowClick?: (row: TData) => void;
  /** Show loading skeleton (default: false). */
  isLoading?: boolean;
  /** Empty state message when no rows match (default: "No results found.") */
  emptyMessage?: string;
  /** Override the entire empty state with a custom ReactNode. */
  emptyState?: React.ReactNode;
  /** Row action config — adds an actions column with a dropdown menu. */
  rowActions?: RowAction<TData>[];
  /** Column filter configs — renders popover filters in the toolbar. */
  filters?: FacetedFilter[];
  /** Custom class on the outer table container wrapper. */
  className?: string;
  /** Show the global search input (default: true). */
  enableSearch?: boolean;
  /** Show the column visibility toggle button (default: true). */
  enableColumnToggle?: boolean;
  /** Default sort applied on first render. */
  initialSort?: InitialSort;
  /** Number of skeleton rows when loading (default: 5). */
  skeletonRows?: number;
}
