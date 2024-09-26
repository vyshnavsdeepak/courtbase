import { toDate } from "date-fns-tz";

export function parseISTDate(dateString: string) {
  const parsedDate = new Date(dateString);
  const timeZone = "Asia/Kolkata";
  const istDate = toDate(parsedDate, {
    timeZone,
  });

  if (isNaN(istDate.getTime())) {
    throw new Error(`Invalid date string: ${dateString}`);
  }

  return istDate;
}
