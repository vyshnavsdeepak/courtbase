"use client";

import type { DateRange } from "react-day-picker";
import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import qs from "qs";

import type { DateSpan } from "@court-base/api/schemas/cases";
import {
  zNextHearingDateSpan as zDateSpan,
  zNextHearingDateRange,
} from "@court-base/api/schemas/cases";
import { getDateRangeFilter } from "@court-base/api/utils/cases-utils";
import { cn } from "@court-base/ui";
import { Button } from "@court-base/ui/button";
import { Calendar } from "@court-base/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@court-base/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@court-base/ui/select";

export function DatePickerWithPresets() {
  const [date, setDate] = React.useState<DateRange | undefined>();
  const [dateSpan, setDateSpan] = React.useState<DateSpan | undefined>();
  const searchParams = useSearchParams();
  const router = useRouter();

  const parseSearchParams = () => {
    const params = qs.parse(searchParams.toString());
    const nextHearingDate = params.nextHearingDate;
    if (nextHearingDate) {
      return { nextHearingDate };
    }
    return { dateRange: params.dateRange };
  };

  React.useEffect(() => {
    const { nextHearingDate } = parseSearchParams();
    if (typeof nextHearingDate === "string") {
      const parsedDateSpan = zDateSpan.safeParse(nextHearingDate);
      if (parsedDateSpan.success) {
        setDateSpan(parsedDateSpan.data);
        const dateRange = getDateRangeFilter(parsedDateSpan.data);
        setDate({
          from: dateRange.startDate,
          to: dateRange.endDate,
        });
      }
    } else if (nextHearingDate && typeof nextHearingDate === "object") {
      const parsedDateRange = zNextHearingDateRange.safeParse(nextHearingDate);
      if (parsedDateRange.success) {
        setDate({
          from: parsedDateRange.data.from
            ? new Date(parsedDateRange.data.from)
            : undefined,
          to: parsedDateRange.data.to
            ? new Date(parsedDateRange.data.to)
            : undefined,
        });
      }
    }
  }, [searchParams]);

  const updateQueryParams = (params: {
    dateSpan?: DateSpan;
    dateRange?: DateRange;
  }) => {
    let nextHearingDate:
      | string
      | {
          from: string | undefined;
          to: string | undefined;
        }
      | undefined;

    if (params.dateSpan) {
      nextHearingDate = params.dateSpan;
    } else if (params.dateRange) {
      nextHearingDate = {
        from: params.dateRange.from
          ? format(params.dateRange.from, "yyyy-MM-dd")
          : undefined,
        to: params.dateRange.to
          ? format(params.dateRange.to, "yyyy-MM-dd")
          : undefined,
      };
    }

    const options = qs.parse(searchParams.toString(), { depth: 2 });
    const newOptions = { ...options, nextHearingDate };
    const newSearchParams = qs.stringify(newOptions, { encode: false });

    router.push(`?${newSearchParams}`);
  };

  const onPresetChange = (span: DateSpan) => {
    setDateSpan(span);
    const dateRange = getDateRangeFilter(span);
    setDate({
      from: dateRange.startDate,
      to: dateRange.endDate,
    });
    updateQueryParams({ dateSpan: span });
  };

  const onCalendarChange = (value: DateRange | undefined) => {
    setDate(value);
    setDateSpan(undefined);
    if (value?.from) {
      updateQueryParams({ dateRange: value });
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[240px] justify-start text-left font-normal",
            !date && "text-muted-foreground",
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date?.from ? (
            date.to ? (
              <>
                {format(date.from, "LLL dd, y")} -{" "}
                {format(date.to, "LLL dd, y")}
              </>
            ) : (
              format(date.from, "LLL dd, y")
            )
          ) : (
            <span>Pick a date</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        portal={false}
        className="flex w-auto flex-col space-y-2 p-2"
      >
        <Select
          value={dateSpan}
          onValueChange={(value: DateSpan) => onPresetChange(value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectItem value={zDateSpan.Values.today}>Today</SelectItem>
            <SelectItem value={zDateSpan.Values.tomorrow}>Tomorrow</SelectItem>
            <SelectItem value={zDateSpan.Values.thisWeek}>This Week</SelectItem>
            <SelectItem value={zDateSpan.Values.nextWeek}>Next Week</SelectItem>
            <SelectItem value={zDateSpan.Values.thisMonth}>
              This Month
            </SelectItem>
            <SelectItem value={zDateSpan.Values.nextMonth}>
              Next Month
            </SelectItem>
          </SelectContent>
        </Select>
        <div className="rounded-md border">
          <Calendar
            initialFocus
            mode="range"
            selected={date}
            onSelect={onCalendarChange}
            numberOfMonths={2}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}
