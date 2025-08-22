import { formatTime, TIME_DATE_FORMATS } from '../../utils/utils';

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
}

interface StopInfoProps {
  stop: RouteStop;
  isLastStop: boolean;
  isFirstStop: boolean;
}

const StopInfo = ({ stop, isLastStop }: StopInfoProps) => {
  console.log('stop', stop);

  // wondering why form some stops api does not have actual arrival time, just estimated
  return (
    <li className='stop' key={stop.id}>
      {!isLastStop ? (
        <>
          {stop.departure.actual ? (
            <span className='stop__time'>
              <span>Departed</span>
              <span>{formatTime(stop.departure.actual, TIME_DATE_FORMATS.SHORT_TIME)}</span>
            </span>
          ) : (
            <span className='stop__time'>
              <span>Scheduled</span>
              <span>{formatTime(stop.departure.scheduled, TIME_DATE_FORMATS.SHORT_TIME)}</span>
            </span>
          )}
        </>
      ) : (
        <>
          {stop.arrival.actual ? (
            <span className='stop__time'>
              <span>Arrived</span>
              <span>{formatTime(stop.arrival.actual, TIME_DATE_FORMATS.SHORT_TIME)}</span>
            </span>
          ) : (
            <span className='stop__time'>
              <span>Scheduled</span>
              <span>{formatTime(stop.arrival.scheduled, TIME_DATE_FORMATS.SHORT_TIME)}</span>
            </span>
          )}
        </>
      )}
      <div>
        <h2>{stop.location.region_name}</h2>
        <h3>{stop.location.detailed_name}</h3>
      </div>
    </li>
  );
};

export default StopInfo;
