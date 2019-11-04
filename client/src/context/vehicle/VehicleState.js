import React, { useReducer } from 'react';
import axios from 'axios';
import VehicleContext from './vehicleContext';
import vehicleReducer from './vehicleReducer';

import {
  ADD_VEHICLE,
  DELETE_VEHICLE,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_VEHICLE,
  FILTER_VEHICLE,
  CLEAR_FILTER,
  VEHICLE_ERROR
} from '../types';

const VehicleState = props => {
  const initialState = {
    vehicles: [],
    current: null,
    filtered: null,
    error: null
  };

  const [state, dispatch] = useReducer(vehicleReducer, initialState);

  // Add vehicle
  const addVehicle = async vehicle => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    try {
      const res = await axios.post('/api/vehicles', vehicle, config);
      dispatch({ type: ADD_VEHICLE, payload: res.data });
    } catch (error) {
      dispatch({ type: VEHICLE_ERROR, payload: error.respone.msg });
    }
  };

  // Delete vehicle

  const deleteVehicle = id => {
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
        error: state.error,
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
