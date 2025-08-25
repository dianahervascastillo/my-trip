import { Quote } from './types';

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

// extracting this here cause home page is just really busy
// It doesn't seem that the api returns the data ordered(or I may have missed something) so I'm doing it here.
// Definitely had to google best way to do this because I got a bit lost at some point.
// It doesn't look like the api is returning ordered quotes. What am i missing?

export function compareLegsByScheduledDeparture(quoteA: Quote, quoteB: Quote): number {
  // Need to compare quotes to order them
  const quoteALeg = quoteA.legs[0];
  const quoteBLeg = quoteB.legs[0];

  const quoteAScheduledDeparture = new Date(
    quoteALeg.departure.scheduled as unknown as string
  ).getTime();
  const quoteBScheduledDeparture = new Date(
    quoteBLeg.departure.scheduled as unknown as string
  ).getTime();

  if (quoteAScheduledDeparture !== quoteBScheduledDeparture) {
    return quoteAScheduledDeparture - quoteBScheduledDeparture;
  }

  const quoteATripUid = quoteALeg?.trip_uid ?? '';
  const quoteBTripUid = quoteALeg?.trip_uid ?? '';
  return quoteATripUid.localeCompare(quoteBTripUid);
}
