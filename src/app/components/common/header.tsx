import EmberLogo from '../../img/ember';

interface HeaderProps {
  tripDate?: string;
  tripLastUpdated?: string;
  tripTitle?: React.ReactNode;
}

const Header = ({ tripDate, tripLastUpdated, tripTitle }: HeaderProps) => {
  return (
    <header className='header'>
      <div className='container'>
        <div>
          <EmberLogo />
        </div>
        <strong className='trip-date'>{tripDate}</strong>
      </div>
      <div className='trip-last-updated'>
        <div className='container'>
          <h1>{tripTitle}</h1>
          {tripLastUpdated && (
            <p>
              <strong>Trip last updated: {tripLastUpdated}</strong>
            </p>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
