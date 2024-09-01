import { getCoreRowModel, useReactTable } from "@tanstack/react-table";

import type { DataTableProps } from "./types";

export function useCasesTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualSorting: true,
  });

  return { table };
}
