import {
  GET_VEHICLES,
  ADD_VEHICLE,
  DELETE_VEHICLE,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_VEHICLE,
  FILTER_VEHICLE,
  CLEAR_VEHICLES,
  CLEAR_FILTER,
  VEHICLE_ERROR
} from '../actions/types';

const initialState = {
  vehicles: null,
  current: null,
  filtered: null,
  error: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_VEHICLES:
      return {
        ...state,
        vehicles: action.payload,
        loading: false
      };
    case ADD_VEHICLE:
      return {
        ...state,
        vehicles: [...state.vehicles, action.payload],
        loading: false
      };
    case DELETE_VEHICLE:
      return {
        ...state,
        vehicles: state.vehicles.filter(
          vehicle => vehicle._id !== action.payload
        ),
        loading: false
      };
    case UPDATE_VEHICLE:
      return {
        ...state,
        vehicles: state.vehicles.map(vehicle =>
          vehicle._id === action.payload._id ? action.payload : vehicle
        ),
        loading: false
      };
    case CLEAR_VEHICLES:
      return {
        ...state,
        vehicles: null,
        filtered: null,
        error: null,
        current: null
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
