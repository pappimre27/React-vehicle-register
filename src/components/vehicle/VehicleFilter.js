import React, { useContext, useRef, useEffect } from 'react';
import VehicleContext from '../../context/vehicle/vehicleContext';

const VehicleFilter = () => {
  const vehicleContext = useContext(VehicleContext);
  const text = useRef('');

  const { filterVehicle, clearFilter, filtered } = vehicleContext;

  useEffect(() => {
    if (filtered === null) {
      text.current.value = '';
    }
  });

  const onChange = e => {
    if (text.current.value !== '') {
      filterVehicle(e.target.value);
    } else {
      clearFilter();
    }
  };

  return (
    <form>
      <input
        ref={text}
        type='text'
        placeholder='Filter Vehicles...'
        onChange={onChange}
      />
    </form>
  );
};

export default VehicleFilter;
