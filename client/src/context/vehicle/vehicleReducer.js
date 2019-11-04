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

export default (state, action) => {
  switch (action.type) {
    case ADD_VEHICLE:
      return {
        ...state,
        vehicles: [...state.vehicles, action.payload]
      };
    case DELETE_VEHICLE:
      return {
        ...state,
        vehicles: state.vehicles.filter(
          vehicle => vehicle.id !== action.payload
        )
      };
    case UPDATE_VEHICLE:
      return {
        ...state,
        vehicles: state.vehicles.map(vehicle =>
          vehicle.id === action.payload.id ? action.payload : vehicle
        )
      };
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null
      };
    case FILTER_VEHICLE:
      return {
        ...state,
        filtered: state.vehicles.filter(vehicle => {
          const regex = new RegExp(`${action.payload}`, 'gi');
          return (
            vehicle.plateNumber.match(regex) ||
            vehicle.manufacturer.match(regex) ||
            vehicle.type.match(regex)
          );
        })
      };
    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null
      };
    case VEHICLE_ERROR:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};
