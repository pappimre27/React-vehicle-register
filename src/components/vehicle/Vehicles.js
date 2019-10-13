import React, { Fragment, useContext, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import VehicleItem from './VehicleItem';
import VehicleContext from '../../context/vehicle/vehicleContext';
import Spinner from '../layout/Spinner';

const Vehicles = () => {
  const vehicleContext = useContext(VehicleContext);

  const { vehicles, filtered } = vehicleContext;

  if (vehicles.length === 0) {
    return <h4>Please add a vehicle</h4>;
  }

  return (
    <Fragment>
      {filtered !== null
        ? filtered.map(vehicle => (
            <VehicleItem key={vehicle.id} vehicle={vehicle} />
          ))
        : vehicles.map(vehicle => (
            <VehicleItem key={vehicle.id} vehicle={vehicle} />
          ))}
    </Fragment>
  );
};

export default Vehicles;
