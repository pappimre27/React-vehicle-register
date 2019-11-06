import React, { Fragment, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import VehicleItem from './VehicleItem';
import Spinner from '../layout/Spinner';
import { connect } from 'react-redux';
import { getVehicles } from '../../actions/vehicleAction';

const Vehicles = ({ vehicles, filtered, getVehicles, loading }) => {
  const fetchVehicles = async () => {
    await getVehicles();
  };
  useEffect(() => {
    fetchVehicles();
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

const mapStateToProps = state => ({
  vehicles: state.vehicle.vehicles,
  filtered: state.vehicle.filtered,
  loading: state.vehicle.loading
});

export default connect(
  mapStateToProps,
  { getVehicles }
)(Vehicles);
