import { parse } from "date-fns";
import { toDate } from "date-fns-tz";

export function parseISTDate(dateString: string) {
  const formats = ["dd-MM-yyyy", "yyyy-MM-dd"];
  const timeZone = "Asia/Kolkata";
  let parsedDate: Date | null = null;

  for (const format of formats) {
    try {
      const parsed = parse(dateString, format, new Date());
      parsedDate = toDate(parsed, { timeZone });
      if (!isNaN(parsedDate.getTime())) {
        break;
      }
    } catch {
      // Ignore parsing errors and try the next format
    }
  }

  if (!parsedDate || isNaN(parsedDate.getTime())) {
    throw new Error(`Invalid date string: ${dateString}`);
  }

  return parsedDate;
}
