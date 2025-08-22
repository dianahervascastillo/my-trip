import { formatTimeAndDate, TIME_DATE_FORMATS } from '../utils/utils';

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

interface RouteProps {
  route: RouteStop[];
}

const StopInfo = ({ stop }) => {
  console.log('stop', stop);

  return (
    <li key={stop.id}>
      <h2>{stop.location.name}</h2>
      <span>
        {stop.departure.actual
          ? `Departed ${formatTimeAndDate(stop.departure.actual, TIME_DATE_FORMATS.SHORT_TIME)}`
          : `Scheduled ${formatTimeAndDate(stop.departure.scheduled, TIME_DATE_FORMATS.SHORT_TIME)}`}
      </span>
    </li>
  );
};

export default function Route({ route }: RouteProps) {
  return (
    <div>
      <h2>Journey Route</h2>
      <ol>
        {route.map((stop, index) => {
          console.log('index', index);
          console.log('route.length', route.length);
          return <StopInfo key={stop.id} stop={stop} />;

          // return (
          //   <li key={stop.id}>
          //     <strong>{stop.location.name}</strong>
          //     {stop.location.detailed_name !== stop.location.name && (
          //       <span> - {stop.location.detailed_name}</span>
          //     )}
          //     <br />
          //     <small>
          //       {stop.location.region_name} ({stop.location.code})
          //     </small>
          //     <br />
          //     <span>
          //       Departure: {new Date(stop.departure.scheduled).toLocaleTimeString()}
          //       {stop.departure.estimated !== stop.departure.scheduled && (
          //         <span> (Est: {new Date(stop.departure.estimated).toLocaleTimeString()})</span>
          //       )}
          //     </span>
          //     <br />
          //     <span>
          //       Arrival: {new Date(stop.arrival.scheduled).toLocaleTimeString()}
          //       {stop.arrival.estimated !== stop.arrival.scheduled && (
          //         <span> (Est: {new Date(stop.arrival.estimated).toLocaleTimeString()})</span>
          //       )}
          //     </span>
          //     <br />
          //     <span>
          //       {stop.allow_boarding ? '✅ Boarding allowed' : '❌ No boarding'}
          //       {' | '}
          //       {stop.allow_drop_off ? '✅ Drop-off allowed' : '❌ No drop-off'}
          //     </span>
          //   </li>
          // );
        })}
      </ol>
    </div>
  );
}
