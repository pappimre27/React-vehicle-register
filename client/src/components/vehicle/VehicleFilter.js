import React, { useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { filterVehicle, clearFilter } from '../../actions/vehicleAction';

const VehicleFilter = ({ filtered, filterVehicle, clearFilter }) => {
  const text = useRef('');

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

const mapStateToProps = state => ({
  filtered: state.vehicle.filtered
});

export default connect(
  mapStateToProps,
  { filterVehicle, clearFilter }
)(VehicleFilter);
