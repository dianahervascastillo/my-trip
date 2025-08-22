import { getAllQuotes } from './api/quotes';
import { getTripById } from './api/trips';
import Route from './components/route';
import { formatDate, TIME_DATE_FORMATS } from './utils/utils';
import IconWifi from './img/icons/wifi';
import IconToilet from './img/icons/toilet';
import IconBike from './img/icons/bike';
import IconWheelchair from './img/icons/wheelchair';

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

interface Vehicle {
  seat: number;
  wheelchair: number;
  bicycle: number;
  id: number;
  plate_number: string;
  name: string;
  has_wifi: boolean;
  has_toilet: boolean;
  type: string;
  brand: string;
  colour: string;
  is_backup_vehicle: boolean;
  owner_id: number;
  gps: {
    last_updated: string;
    longitude: number;
    latitude: number;
    heading: number;
  };
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
    const quotes = (await getAllQuotes()) as Quote[];
    // const tripId = quotes[0]?.legs[0]?.trip_uid;
    const tripId = '5bpmP6qV9VQCD4GSmXoYz8';

    if (!tripId) {
      throw new Error('No valid trip ID found in quotes');
    }

    console.log('tripId', tripId);

    // Fetch trip info with proper error handling
    const tripData = (await getTripById(tripId)) as TripData;
    const { route, vehicle, description } = tripData;

    const tripOrigin = `${quotes[0]?.legs[0]?.origin.name}`;
    const tripDestination = `${quotes[0]?.legs[0]?.destination.region_name} ${quotes[0]?.legs[0]?.destination.name}`;
    const scheduledDeparture = route[route.length - 1].departure.scheduled;

    return (
      <>
        <header>EMBER</header>
        <main>
          <time>{formatDate(scheduledDeparture, TIME_DATE_FORMATS.SHORT_DAY)}</time>
          <h1>
            {tripOrigin} to {tripDestination}
          </h1>

          <section id='vehicle'>
            <h2>Vehicle Details</h2>
            {vehicle.has_toilet && (
              <>
                <IconToilet />
              </>
            )}

            {vehicle.bicycle && (
              <>
                <IconBike />
              </>
            )}
            {vehicle.wheelchair && (
              <>
                <IconWheelchair />
              </>
            )}

            {vehicle.has_wifi && (
              <>
                <IconWifi />
              </>
            )}
          </section>

          <section id='timeline'>
            Last Updated: {new Date(vehicle.gps.last_updated).toLocaleString()}
            <Route route={route} />
          </section>
        </main>
        <footer>footer!! hello!</footer>
      </>
    );
  } catch (error) {
    console.error('Error in Home component:', error);

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
