import { getTripById } from '../../api/trips';
import { formatDate, TIME_DATE_FORMATS } from '../../utils/utils';

import Header from '../../components/common/header';
import Route from '../../components/route/route';
import Vehicle from '../../components/vehicle/vehicle';

interface RouteStop {
  id: number;
  departure: {
    scheduled: string;
    estimated: string;
    actual?: string;
  };
  arrival: {
    scheduled: string;
    estimated: string;
    actual?: string;
  };
  location: {
    name: string;
    detailed_name: string;
    region_name: string;
    code: string;
  };
  allow_boarding: boolean;
  allow_drop_off: boolean;
  skipped?: boolean;
}

interface VehicleType {
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
  vehicle: VehicleType;
  description: {
    route_number: string;
    pattern_id: number;
    calendar_date: string;
    type: string;
    is_cancelled: boolean;
    route_id: number;
  };
}

interface PageProps {
  params: { tripId: string };
}

export default async function TripPage({ params }: PageProps) {
  const { tripId } = await params;
  try {
    const tripData = (await getTripById(tripId)) as TripData;
    const { route, vehicle, description } = tripData;

    // I'm thinking that it would be best to extract all the data processing
    // into a function to have a cleaner component, but for the sake
    // of showing a bit the way I thought of things I'll leave it here.
    const originStop = route?.[0];
    const destinationStop = route?.[route.length - 1];
    const tripTitle =
      originStop && destinationStop
        ? `${originStop.location.region_name} to ${destinationStop.location.region_name}`
        : undefined;

    const tripDate = formatDate(description.calendar_date, TIME_DATE_FORMATS.SHORT_DAY);
    const tripLastUpdated = formatDate(vehicle.gps.last_updated, TIME_DATE_FORMATS.HOUR_DAY);

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
