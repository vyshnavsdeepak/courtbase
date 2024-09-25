import { parse } from "date-fns";
import { toDate } from "date-fns-tz";

export function parseISTDate(dateString: string, formatStr = "dd-MM-yyyy") {
  const parsedDate = parse(dateString, formatStr, new Date());
  const timeZone = "Asia/Kolkata";
  const istDate = toDate(parsedDate, {
    timeZone,
  });

  return istDate;
}
