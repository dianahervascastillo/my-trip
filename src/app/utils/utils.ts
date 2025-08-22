type DateFormat = {
  weekday: string;
  day: string;
  month: string;
  year: string;
};

type TimeFormat = {
  hour: string;
  minute: string;
  hour12: boolean;
};

type TimeAndDateFormats = {
  [key: string]: DateFormat | TimeFormat;
};

export const TIME_DATE_FORMATS: DateFormats = {
  SHORT_DAY: {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  },
  SHORT_TIME: {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false // 24-hour format hardcoded
  }
};

export function formatTimeAndDate(
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
