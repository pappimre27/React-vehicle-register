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
  VEHICLE_ERROR,
  GET_VEHICLES,
  CLEAR_VEHICLES
} from '../types';

const VehicleState = props => {
  const initialState = {
    vehicles: null,
    current: null,
    filtered: null,
    error: null
  };

  const [state, dispatch] = useReducer(vehicleReducer, initialState);

  // Get vehicle
  const getVehicles = async () => {
    try {
      const res = await axios.get('/api/vehicles');
      dispatch({ type: GET_VEHICLES, payload: res.data });
    } catch (error) {
      dispatch({ type: VEHICLE_ERROR, payload: error.response.msg });
    }
  };

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
      dispatch({ type: VEHICLE_ERROR, payload: error.response.msg });
    }
  };

  // Delete vehicle

  const deleteVehicle = async id => {
    try {
      await axios.delete(`/api/vehicles/${id}`);
    } catch (error) {
      dispatch({ type: VEHICLE_ERROR, payload: error.response.msg });
    }
    dispatch({ type: DELETE_VEHICLE, payload: id });
  };

  // Update vehicle
  const updateVehicle = async vehicle => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    try {
      const res = await axios.put(
        `/api/vehicles/${vehicle._id}`,
        vehicle,
        config
      );
      dispatch({ type: UPDATE_VEHICLE, payload: res.data });
    } catch (error) {
      dispatch({ type: VEHICLE_ERROR, payload: error.response.msg });
    }
  };

  // clear vehicles
  const clearVehicles = () => {
    dispatch({ type: CLEAR_VEHICLES });
  };

  // Set Current vehicle
  const setCurrent = vehicle => {
    dispatch({ type: SET_CURRENT, payload: vehicle });
  };

  // Clear Current vehicle
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
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
        getVehicles,
        deleteVehicle,
        setCurrent,
        clearCurrent,
        clearVehicles,
        updateVehicle,
        filterVehicle,
        clearFilter
      }}>
      {props.children}
    </VehicleContext.Provider>
  );
};

export default VehicleState;
