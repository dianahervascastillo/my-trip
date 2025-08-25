import StopInfo from './stop';

interface RouteStop {
  id: number;
  departure: {
    scheduled: string;
    estimated: string;
    actual?: string; // Optional actual departure time
  };
  arrival: {
    scheduled: string;
    estimated: string;
    actual?: string; // Optional actual arrival time
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

export default function Route({ route }: RouteProps) {
  // Find the last stop with departure.actual (in theory the last stop the bus departed from)
  const findLastActualDeparture = (stops: RouteStop[]): RouteStop | null => {
    // Filter stops that have actual departure times and find the last one
    const stopsWithActualDeparture = stops.filter((stop) => stop.departure.actual);

    if (stopsWithActualDeparture.length === 0) {
      return null; // No stops with actual departure times
    }

    // Return the last stop with actual departure (highest index in original array)
    return stopsWithActualDeparture[stopsWithActualDeparture.length - 1];
  };

  const lastActualDeparture = findLastActualDeparture(route);

  return (
    <ol className='stops'>
      {route.map((stop, index) => {
        const isLastActualDeparture = lastActualDeparture && stop.id === lastActualDeparture.id;

        if (!stop.allow_boarding && index === 0) {
          return null;
        }

        return (
          <StopInfo
            key={stop.id}
            stop={stop}
            inTransit={isLastActualDeparture}
            isFirstStop={index === 1}
            isLastStop={index === route.length - 1}
          />
        );
      })}
    </ol>
  );
}
