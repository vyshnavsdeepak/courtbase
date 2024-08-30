import moment from "moment";

import type { DateSpan } from "../schemas/cases";

export function getDateRangeFilter(span: DateSpan) {
  // client is in IST
  const ist = moment().utcOffset(330);
  const today = ist.startOf("day");

  switch (span) {
    case "today":
      return {
        startDate: today,
        endDate: today,
      };
    case "tomorrow":
      return {
        startDate: today.clone().add(1, "day"),
        endDate: today.clone().add(1, "day"),
      };
    case "thisWeek":
      return {
        startDate: today.clone().startOf("week"),
        endDate: today.clone().endOf("week"),
      };
    case "nextWeek":
      return {
        startDate: today.clone().add(1, "week").startOf("week"),
        endDate: today.clone().add(1, "week").endOf("week"),
      };
    case "thisMonth":
      return {
        startDate: today.clone().startOf("month"),
        endDate: today.clone().endOf("month"),
      };
    case "nextMonth":
      return {
        startDate: today.clone().add(1, "month").startOf("month"),
        endDate: today.clone().add(1, "month").endOf("month"),
      };
    default:
      throw new Error("Invalid date span");
  }
}
