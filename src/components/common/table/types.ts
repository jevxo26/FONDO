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

export interface FacetedFilter {
  columnId: string;
  title: string;
  options: FacetedFilterOption[];
}
