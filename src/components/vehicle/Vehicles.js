import React, { Fragment, useContext } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import VehicleItem from './VehicleItem';
import VehicleContext from '../../context/vehicle/vehicleContext';

const Vehicles = () => {
  const vehicleContext = useContext(VehicleContext);

  const { vehicles, filtered } = vehicleContext;

  if (vehicles.length === 0) {
    return <h4>Please add a vehicle</h4>;
  }

  return (
    <Fragment>
      <TransitionGroup>
        {filtered !== null
          ? filtered.map(vehicle => (
              <CSSTransition key={vehicle.id} timeout={500} classNames='item'>
                <VehicleItem vehicle={vehicle} />
              </CSSTransition>
            ))
          : vehicles.map(vehicle => (
              <CSSTransition key={vehicle.id} timeout={500} classNames='item'>
                <VehicleItem vehicle={vehicle} />
              </CSSTransition>
            ))}
      </TransitionGroup>
    </Fragment>
  );
};

export default Vehicles;
