"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import qs from "qs";

import { allowedFilters } from "@court-base/api/schemas/cases";
import { Button } from "@court-base/ui/button";

export const ClearFiltersButton = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const params = React.useMemo(
    () => qs.parse(searchParams.toString(), { depth: 2 }),
    [searchParams],
  );

  const filtersApplied = React.useMemo(() => {
    return allowedFilters.some((filter) => params[filter] !== undefined);
  }, []);

  if (!filtersApplied) {
    return null;
  }

  const clearFilters = () => {
    const newParams = qs.stringify(
      Object.fromEntries(
        Object.entries(params).filter(([key]) => !allowedFilters.includes(key)),
      ),
      { encode: false },
    );
    router.push(`?${newParams}`);
  };

  return (
    <Button variant="ghost" onClick={clearFilters}>
      Clear Filters
    </Button>
  );
};
