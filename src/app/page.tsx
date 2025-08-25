import Link from 'next/link';
import { getAllQuotes } from './api/quotes';
import { formatTime, TIME_DATE_FORMATS, compareLegsByScheduledDeparture } from './utils/utils';
import { Quote } from './utils/types';
import Header from './components/common/header';

// Initially, this is the page where I was loading a hardcoded id trip but today
// I decided to show the quotes list with links to individual trip pages
// to try the next.js implementation of dynamic pages
export default async function Home() {
  try {
    // Get all quotes
    const quotes = (await getAllQuotes()) as Quote[];
    // Sort the quotes by the closest to the api call moment to the future ones.
    const sortedQuotes = [...quotes].sort(compareLegsByScheduledDeparture);

    return (
      <>
        <Header tripTitle='Aberdeen (Bridge of Don P&R) to Edinburgh (George Street - Stop GL)' />
        <main>
          <div className='container'>
            <ol>
              {sortedQuotes.map((quote, idx) => {
                const leg = quote.legs[0];
                if (!leg) return null;

                const title = `${leg.origin.region_name} → ${leg.destination.region_name}`;
                const time = leg.departure?.scheduled
                  ? formatTime(
                      leg.departure.scheduled as unknown as string,
                      TIME_DATE_FORMATS.HOUR_DAY
                    )
                  : '—';
                return (
                  <li key={`${leg.trip_uid}-${idx}`}>
                    <Link href={`/trip/${leg.trip_uid}`}>
                      {title} — <strong>{time}</strong>
                    </Link>
                  </li>
                );
              })}
            </ol>
          </div>
        </main>
      </>
    );
  } catch (error) {
    console.error('Error', error);

    return (
      <>
        <main>
          <h1>Error Loading quotes</h1>
          <p>Sorry, we couldn&apos;t load the quotes. Please try again later.</p>
        </main>
      </>
    );
  }
}
