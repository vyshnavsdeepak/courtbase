import moment from "moment";

import type { DateSpan } from "../schemas/cases";

const IST_OFFSET = 330; // IST offset in minutes

export function getDateRangeFilter(span: DateSpan) {
  const today = moment().utcOffset(IST_OFFSET).startOf("day");

  const startOfPeriod = today.clone();
  const endOfPeriod = today.clone();

  switch (span) {
    case "today":
      // No additional calculation needed
      break;
    case "tomorrow":
      startOfPeriod.add(1, "day");
      endOfPeriod.add(1, "day");
      break;
    case "thisWeek":
      startOfPeriod.startOf("week");
      endOfPeriod.endOf("week");
      break;
    case "nextWeek":
      startOfPeriod.add(1, "week").startOf("week");
      endOfPeriod.add(1, "week").endOf("week");
      break;
    case "thisMonth":
      startOfPeriod.startOf("month");
      endOfPeriod.endOf("month");
      break;
    case "nextMonth":
      startOfPeriod.add(1, "month").startOf("month");
      endOfPeriod.add(1, "month").endOf("month");
      break;
    default:
      throw new Error("Invalid date span");
  }

  return {
    startDate: new Date(startOfPeriod.format("YYYY-MM-DD")), // Fixes UTC issue
    endDate: new Date(endOfPeriod.format("YYYY-MM-DD")),
  };
}
