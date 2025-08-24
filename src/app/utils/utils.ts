export const TIME_DATE_FORMATS: {
  SHORT_DAY: Intl.DateTimeFormatOptions;
  SHORT_TIME: Intl.DateTimeFormatOptions;
  HOUR_DAY: Intl.DateTimeFormatOptions;
} = {
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
  },
  HOUR_DAY: {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false // 24-hour format hardcoded
  }
};

// may be best to create a function to deal with both dates and times to not repeat code
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

export function formatTime(
  dateStr: string,
  formatOptions: Intl.DateTimeFormatOptions,
  locale: string = 'en-GB'
): string {
  // transform date to dateString
  const date = new Date(dateStr);
  // pass the format options and the locale
  const formatted = date.toLocaleTimeString(locale, formatOptions);
  return formatted;
}
