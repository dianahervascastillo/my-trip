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
            <ol className='quotes-list'>
              {sortedQuotes.map((quote, idx) => {
                const leg = quote.legs[0];

                if (leg) {
                  const scheduledDeparture = formatTime(
                    leg.departure?.scheduled,
                    TIME_DATE_FORMATS.SHORT_TIME
                  );
                  const scheduledArrival = formatTime(
                    leg.arrival?.scheduled,
                    TIME_DATE_FORMATS.SHORT_TIME
                  );

                  return (
                    <li className='quote' key={`${leg.trip_uid}-${idx}`}>
                      <div className='quote__time'>
                        <strong>{scheduledDeparture}</strong> — <strong>{scheduledArrival}</strong>
                      </div>

                      <Link href={`/trip/${leg.trip_uid}`}>View trip page</Link>
                    </li>
                  );
                } else {
                  return null;
                }
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
