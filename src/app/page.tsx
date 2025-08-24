import { getAllQuotes } from './api/quotes';
import { getTripById } from './api/trips';
import { formatDate, formatTime, TIME_DATE_FORMATS } from './utils/utils';

import Header from './components/common/header';
import Route from './components/route/route';
import Vehicle from './components/vehicle/vehicle';

interface Quote {
  legs: Array<{
    trip_uid: string;
  }>;
}

interface RouteStop {
  id: number;
  departure: {
    scheduled: string;
    estimated: string;
  };
  arrival: {
    scheduled: string;
    estimated: string;
  };
  location: {
    name: string;
    detailed_name: string;
    region_name: string;
    code: string;
  };
  allow_boarding: boolean;
  allow_drop_off: boolean;
}

interface TripData {
  route: RouteStop[];
  vehicle: Vehicle;
  description: {
    route_number: string;
    pattern_id: number;
    calendar_date: string;
    type: string;
    is_cancelled: boolean;
    route_id: number;
  };
}

export default async function Home() {
  try {
    // get all quotes from the time when page is rendered
    const quotes = (await getAllQuotes()) as Quote[];
    //choosing the first one of the quotes
    const tripId = quotes[0]?.legs[0]?.trip_uid;

    if (!tripId) {
      throw new Error('No valid trip ID found in quotes');
    }

    console.log('tripId', tripId);

    // Fetch trip info with proper error handling
    const tripData = (await getTripById(tripId)) as TripData;
    const { route, vehicle, description } = tripData;

    const tripOrigin = `${quotes[0]?.legs[0]?.origin.name}`;
    const tripDestination = `${quotes[0]?.legs[0]?.destination.region_name} ${quotes[0]?.legs[0]?.destination.name}`;
    const scheduledDeparture = description?.calendar_date;
    const tripDate = formatDate(scheduledDeparture, TIME_DATE_FORMATS.SHORT_DAY);
    const tripLastUpdated = formatDate(vehicle.gps.last_updated, TIME_DATE_FORMATS.HOUR_DAY);
    const tripTitle = `${tripOrigin} to ${tripDestination}`;

    return (
      <>
        <Header tripDate={tripDate} tripLastUpdated={tripLastUpdated} tripTitle={tripTitle} />
        <main>
          <div className='container main-grid'>
            <section className='route'>
              <Route route={route} />
            </section>
            <section className='vehicle'>
              <Vehicle vehicle={vehicle} description={description} />
            </section>
          </div>
        </main>
        <footer>Diana Castillo!</footer>
      </>
    );
  } catch (error) {
    console.error('Error', error);

    return (
      <>
        <main>
          <h1>Error Loading Trip</h1>
          <p>Sorry, we couldn&apos;t load the trip information. Please try again later.</p>
        </main>
        <footer>footer!! hello!</footer>
      </>
    );
  }
}
