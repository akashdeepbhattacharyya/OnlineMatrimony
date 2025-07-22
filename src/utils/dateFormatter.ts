export function formatDate(
  dateString: string,
  inputFormat = 'dd/MM/yyyy',
  outputFormat = 'yyyy-MM-dd',
): string {
  const delimiter = /[-/.]/; // handles -, /, or .
  const dateParts = dateString.split(delimiter);
  const formatParts = inputFormat.split(delimiter);

  // Map input values to keys (day, month, year)
  const dateMap: Record<string, string> = {};
  formatParts.forEach((part, index) => {
    dateMap[part] = dateParts[index];
  });

  // Build output string
  return outputFormat
    .split(delimiter)
    .map(part => dateMap[part] || part)
    .join('-');
}
