import axios from 'axios';

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
} from './types';

// Get vehicle
export const getVehicles = () => async dispatch => {
  try {
    const res = await axios.get('/api/vehicles');
    dispatch({ type: GET_VEHICLES, payload: res.data });
  } catch (error) {
    dispatch({ type: VEHICLE_ERROR, payload: error.response.msg });
  }
};

// Add vehicle
export const addVehicle = vehicle => async dispatch => {
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

export const deleteVehicle = id => async dispatch => {
  try {
    await axios.delete(`/api/vehicles/${id}`);
  } catch (error) {
    dispatch({ type: VEHICLE_ERROR, payload: error.response.msg });
  }
  dispatch({ type: DELETE_VEHICLE, payload: id });
};

// Update vehicle
export const updateVehicle = vehicle => async dispatch => {
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
export const clearVehicles = () => dispatch => {
  dispatch({ type: CLEAR_VEHICLES });
};

// Set Current vehicle
export const setCurrent = vehicle => dispatch => {
  dispatch({ type: SET_CURRENT, payload: vehicle });
};

// Clear Current vehicle
export const clearCurrent = () => dispatch => {
  dispatch({ type: CLEAR_CURRENT });
};

// Filter vehicle
export const filterVehicle = text => dispatch => {
  dispatch({ type: FILTER_VEHICLE, payload: text });
};

// Clear Filter
export const clearFilter = () => dispatch => {
  dispatch({ type: CLEAR_FILTER });
};
