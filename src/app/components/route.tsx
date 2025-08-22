import { formatTime, TIME_DATE_FORMATS } from '../utils/utils';

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

const StopInfo = ({ stop, isLastStop }) => {
  console.log('stop', stop);

  // wondering why form some stops api does not have actual arrival time, just estimated
  return (
    <li key={stop.id}>
      {!isLastStop ? (
        <span>
          {stop.departure.actual
            ? `Departed ${formatTime(stop.departure.actual, TIME_DATE_FORMATS.SHORT_TIME)}`
            : `Scheduled ${formatTime(stop.departure.scheduled, TIME_DATE_FORMATS.SHORT_TIME)}`}
        </span>
      ) : (
        <span>
          {stop.arrival.actual
            ? `Arrived ${formatTime(stop.arrival.actual, TIME_DATE_FORMATS.SHORT_TIME)}`
            : `Scheduled ${formatTime(stop.arrival.scheduled, TIME_DATE_FORMATS.SHORT_TIME)}`}
        </span>
      )}

      <h2>{stop.location.region_name}</h2>
      <h3>{stop.location.detailed_name}</h3>
    </li>
  );
};

export default function Route({ route }: RouteProps) {
  return (
    <div>
      <h2>Journey Route</h2>
      <ol>
        {route.map((stop, index) => {
          //remove depot stop
          if (!stop.allow_boarding && index === 0) {
            return null;
          }
          return <StopInfo key={stop.id} stop={stop} isLastStop={index === route.length - 1} />;

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
