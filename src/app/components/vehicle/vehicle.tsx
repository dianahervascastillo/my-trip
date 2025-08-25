import IconWifi from '../../img/icons/wifi';
import IconToilet from '../../img/icons/toilet';
import IconBike from '../../img/icons/bike';
import IconWheelchair from '../../img/icons/wheelchair';

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
interface Description {
  route_number: string;
  pattern_id: number;
  calendar_date: string;
  type: string;
  is_cancelled: boolean;
  route_id: number;
}

interface VehicleProps {
  vehicle: Vehicle;
  description: Description;
}

const VehicleDetail = ({ children }) => {
  return <div className='vehicle-detail'>{children}</div>;
};

const Vehicle = ({ vehicle, description }: VehicleProps) => {
  return (
    <>
      <h2>Services</h2>
      {vehicle.has_toilet && (
        <VehicleDetail>
          <IconToilet /> <span>Toilet</span>
        </VehicleDetail>
      )}

      {vehicle.bicycle && (
        <VehicleDetail>
          <IconBike />
          <span>
            <strong>{vehicle.bicycle}</strong> bike spaces
          </span>
        </VehicleDetail>
      )}
      {vehicle.wheelchair && (
        <VehicleDetail>
          <IconWheelchair />
          <span>
            <strong>{vehicle.wheelchair}</strong> wheelchair spaces
          </span>
        </VehicleDetail>
      )}

      {vehicle.has_wifi && (
        <VehicleDetail>
          <IconWifi /> <span>Wi-Fi</span>
        </VehicleDetail>
      )}
    </>
  );
};

export default Vehicle;
