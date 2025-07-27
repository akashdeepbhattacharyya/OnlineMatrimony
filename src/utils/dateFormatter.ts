import { parse, format } from 'date-fns';
/**
 * Formats a date string from one format to another.
 *
 * @param dateString - The date string to format.
 * @param inputFormat - The format of the input date string (default is 'dd/MM/yyyy').
 * @param outputFormat - The desired output format for the date string (default is 'yyyy-MM-dd').
 * @returns The formatted date string.
 */
export function formatDateString(
  dateString: string,
  inputFormat = 'yyyy-MM-dd',
  outputFormat = 'dd/MM/yyyy',
): string {
  let newDate = parse(dateString, inputFormat, new Date());
  return format(newDate, outputFormat);
}

export function formatDate(
  date: Date,
  formatString: string = 'yyyy-MM-dd',
): string {
  return format(date, formatString);
}
