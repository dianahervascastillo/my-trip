type DateFormat = {
  weekday: string;
  day: string;
  month: string;
  year: string;
};

type DateFormats = {
  [key: string]: DateFormat;
};

export const DATE_FORMATS: DateFormats = {
  SHORT_DAY: {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  }
};

export function formatDate(
  dateStr: string,
  formatOptions: Intl.DateTimeFormatOptions,
  locale: string = 'en-GB'
): string {
  // transform date to dateString
  const date = new Date(dateStr);
  // pass the format options and the locale
  const formatted = date.toLocaleDateString(locale, formatOptions);
  return formatted.replace(',', '');
}
