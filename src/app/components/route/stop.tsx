import clsx from 'clsx';
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
  skipped: boolean;
}

interface StopInfoProps {
  stop: RouteStop;
  isLastStop: boolean;
  isFirstStop: boolean;
  inTransit: boolean;
}

const StopInfo = ({ stop, isFirstStop, isLastStop, inTransit }: StopInfoProps) => {
  const stopInfoClasses = clsx('stop', {
    'stop--first': isFirstStop,
    'stop--last': isLastStop,
    'stop--departed': stop.departure.actual,
    'stop--skipped': stop.skipped,
    'stop--scheduled': !isLastStop && !stop.skipped && !stop.departure.actual,
    'stop--arrived': isLastStop && stop.arrival.actual
  });

  const skippedStop = stop.skipped;
  // wondering why for some stops api does not have actual arrival time, just estimated
  return (
    <li className={stopInfoClasses} key={stop.id}>
      {inTransit && (
        <div id='travelling' className='bus'>
          🚌
        </div>
      )}
      <span className='stop__time'>
        {!isLastStop ? (
          <>
            {stop.departure.actual ? (
              <>
                <span>Departed</span>
                <strong>{formatTime(stop.departure.actual, TIME_DATE_FORMATS.SHORT_TIME)}</strong>
              </>
            ) : skippedStop ? (
              <span>Skipped</span>
            ) : (
              <>
                <span>Scheduled</span>
                <strong>
                  {formatTime(stop.departure.scheduled, TIME_DATE_FORMATS.SHORT_TIME)}
                </strong>
              </>
            )}
          </>
        ) : (
          <>
            {stop.arrival.actual ? (
              <>
                <span>Arrived</span>
                <strong>{formatTime(stop.arrival.actual, TIME_DATE_FORMATS.SHORT_TIME)}</strong>
              </>
            ) : (
              <>
                <span>Scheduled</span>
                <strong>{formatTime(stop.arrival.scheduled, TIME_DATE_FORMATS.SHORT_TIME)}</strong>
              </>
            )}
          </>
        )}
      </span>
      <div>
        <h2>{stop.location.region_name}</h2>
        <h3>{stop.location.detailed_name}</h3>
      </div>
    </li>
  );
};

export default StopInfo;
