import { parse, format } from 'date-fns';
/**
 * Formats a date string from one format to another.
 *
 * @param dateString - The date string to format.
 * @param inputFormat - The format of the input date string (default is 'dd/MM/yyyy').
 * @param outputFormat - The desired output format for the date string (default is 'yyyy-MM-dd').
 * @returns The formatted date string.
 */
export function formatDate(
  dateString: string,
  inputFormat = 'dd/MM/yyyy',
  outputFormat = 'yyyy-MM-dd',
): string {
  let newDate = parse(dateString, inputFormat, new Date());
  return format(newDate, outputFormat);
}
