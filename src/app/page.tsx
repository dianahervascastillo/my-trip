import { getAllQuotes } from './api/quotes';
import { getTripById } from './api/trips';
import Route from './components/route';
import { formatDate, DATE_FORMATS } from './utils/utils';

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
    const tripId = quotes[0]?.legs?.[0]?.trip_uid;

    if (!tripId) {
      throw new Error('No valid trip ID found in quotes');
    }

    console.log('tripId', tripId);

    // Fetch trip info with proper error handling
    const tripData = (await getTripById(tripId)) as TripData;
    const { route, vehicle, description } = tripData;

    const tripOrigin = `${route[0].location.region_name} (${route[0].location.code})`;
    const tripDestination = `${route[route.length - 1].location.region_name} (${route[route.length - 1].location.code})`;
    const scheduledDeparture = route[route.length - 1].departure.scheduled;

    return (
      <>
        <header>EMBER</header>
        <main>
          <time>{formatDate(scheduledDeparture, DATE_FORMATS.SHORT_DAY)}</time>
          <h1>
            {tripOrigin} to {tripDestination}
          </h1>

          <h2>Vehicle Details</h2>
          <dl>
            <dt>Seats</dt>
            <dd>{vehicle.seat}</dd>

            <dt>Wheelchair Spaces</dt>
            <dd>{vehicle.wheelchair}</dd>

            <dt>Bicycle Spaces</dt>
            <dd>{vehicle.bicycle}</dd>

            <dt>WiFi Available</dt>
            <dd>{vehicle.has_wifi ? 'Yes' : 'No'}</dd>

            <dt>Toilet Available</dt>
            <dd>{vehicle.has_toilet ? 'Yes' : 'No'}</dd>

            <dt>GPS Location</dt>
            <dd>
              Latitude: {vehicle.gps.latitude}
              <br />
              Longitude: {vehicle.gps.longitude}
              <br />
              Heading: {vehicle.gps.heading}°<br />
              Last Updated: {new Date(vehicle.gps.last_updated).toLocaleString()}
            </dd>
          </dl>

          <h2>Trip Description</h2>
          <dl>
            <dt>Route Number</dt>
            <dd>{description.route_number}</dd>

            <dt>Route ID</dt>
            <dd>{description.route_id}</dd>

            <dt>Pattern ID</dt>
            <dd>{description.pattern_id}</dd>

            <dt>Calendar Date</dt>
            <dd>{description.calendar_date}</dd>

            <dt>Type</dt>
            <dd>{description.type}</dd>

            <dt>Status</dt>
            <dd>{description.is_cancelled ? 'Cancelled' : 'Active'}</dd>
          </dl>

          <Route route={route} />
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
