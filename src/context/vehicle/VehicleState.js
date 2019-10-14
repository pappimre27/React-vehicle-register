import React, { useReducer } from 'react';
import uuid from 'uuid';
import axios from 'axios';
import VehicleContext from './vehicleContext';
import vehicleReducer from './vehicleReducer';

import {
  CLEAR_VEHICLES,
  ADD_VEHICLE,
  DELETE_VEHICLE,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_VEHICLE,
  FILTER_VEHICLE,
  CLEAR_FILTER,
  VEHICLE_ERROR,
  GET_VEHICLES
} from '../types';

const VehicleState = props => {
  const getVehiclesLS = () => {
    let vehiclesStorage;
    if (localStorage.getItem('vehicles') === null) {
      vehiclesStorage = [];
    } else {
      vehiclesStorage = JSON.parse(localStorage.getItem('vehicles'));
    }
    return vehiclesStorage;
  };

  const addVehicleLS = vehicle => {
    const vehiclesLS = getVehiclesLS();
    vehiclesLS.push(vehicle);
    localStorage.setItem('vehicles', JSON.stringify(vehiclesLS));
  };

  const updateVehicleLS = vehicle => {
    const items = getVehiclesLS();
    const updated = items.map(item =>
      item.id === vehicle.id ? vehicle : item
    );
    localStorage.setItem('vehicles', JSON.stringify(updated));
  };

  const deleteVehicleLS = id => {
    const items = getVehiclesLS();
    const deleted = items.filter(item => item.id !== id);
    localStorage.setItem('vehicles', JSON.stringify(deleted));
  };

  const initialState = {
    vehicles: getVehiclesLS(),
    // vehicles: [
    //   {
    //     id: 1,
    //     plateNumber: 'EFG-459',
    //     manufacturer: 'Nissan',
    //     type: 'Primera',
    //     inspection: '2019-11-29',
    //     owner: 'Jill Johnson',
    //     insurence: 'Uniqa'
    //   },
    //   {
    //     id: 2,
    //     plateNumber: 'GPY-941',
    //     manufacturer: 'Ford',
    //     type: 'Fiesta',
    //     inspection: '2020-11-29',
    //     owner: 'Sara Wattson',
    //     insurence: 'Generali'
    //   },
    //   {
    //     id: 3,
    //     plateNumber: 'HXX-344',
    //     manufacturer: 'Ford',
    //     type: 'Transit',
    //     inspection: '2019-11-01',
    //     owner: 'Harry White',
    //     insurence: 'Provident'
    //   }
    // ],
    current: null,
    filtered: null
  };

  const [state, dispatch] = useReducer(vehicleReducer, initialState);

  // Add vehicle
  const addVehicle = vehicle => {
    vehicle.id = uuid.v4();
    addVehicleLS(vehicle);
    dispatch({ type: ADD_VEHICLE, payload: vehicle });
  };

  // Delete vehicle

  const deleteVehicle = id => {
    deleteVehicleLS(id);
    dispatch({ type: DELETE_VEHICLE, payload: id });
  };

  // Set Current vehicle
  const setCurrent = vehicle => {
    dispatch({ type: SET_CURRENT, payload: vehicle });
  };

  // Clear Current vehicle
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  // Update vehicle
  const updateVehicle = vehicle => {
    updateVehicleLS(vehicle);
    dispatch({ type: UPDATE_VEHICLE, payload: vehicle });
  };

  // Filter vehicle
  const filterVehicle = text => {
    dispatch({ type: FILTER_VEHICLE, payload: text });
  };

  // Clear Filter
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };

  return (
    <VehicleContext.Provider
      value={{
        vehicles: state.vehicles,
        current: state.current,
        filtered: state.filtered,
        addVehicle,
        deleteVehicle,
        setCurrent,
        clearCurrent,
        updateVehicle,
        filterVehicle,
        clearFilter
      }}>
      {props.children}
    </VehicleContext.Provider>
  );
};

export default VehicleState;
