import React, { Fragment, useContext, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import VehicleItem from './VehicleItem';
import Spinner from '../layout/Spinner';
import VehicleContext from '../../context/vehicle/vehicleContext';

const Vehicles = () => {
  const vehicleContext = useContext(VehicleContext);

  const { vehicles, filtered, getVehicles, loading } = vehicleContext;

  useEffect(() => {
    getVehicles();
    // eslint-disable-next-line
  }, []);

  if (vehicles !== null && vehicles.length === 0 && !loading) {
    return <h4>Please add a vehicle...</h4>;
  }

  return (
    <Fragment>
      {vehicles !== null && !loading ? (
        <TransitionGroup>
          {filtered !== null
            ? filtered.map(vehicle => (
                <CSSTransition
                  key={vehicle._id}
                  timeout={500}
                  classNames='item'>
                  <VehicleItem vehicle={vehicle} />
                </CSSTransition>
              ))
            : vehicles.map(vehicle => (
                <CSSTransition
                  key={vehicle._id}
                  timeout={500}
                  classNames='item'>
                  <VehicleItem vehicle={vehicle} />
                </CSSTransition>
              ))}
        </TransitionGroup>
      ) : (
        <Spinner />
      )}
    </Fragment>
  );
};

export default Vehicles;
