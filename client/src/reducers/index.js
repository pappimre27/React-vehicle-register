import { combineReducers } from 'redux';
import alertReducer from './alertReducer';
import authReducer from './authReducer';
import vehicleReducer from './vehicleReducer';

export default combineReducers({
  auth: authReducer,
  vehicle: vehicleReducer,
  alert: alertReducer
});
