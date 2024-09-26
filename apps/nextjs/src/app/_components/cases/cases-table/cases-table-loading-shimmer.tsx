import { DataTableSkeleton } from "@court-base/ui/data-table/data-table-skeleton";

export default function CasesTableLoadingShimmer() {
  return (
    <DataTableSkeleton
      columnCount={7}
      searchableColumnCount={1}
      filterableColumnCount={2}
      cellWidths={["10rem", "10rem", "10rem", "20rem", "8rem", "8rem", "8rem"]}
    />
  );
}
