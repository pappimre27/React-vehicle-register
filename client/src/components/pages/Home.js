import React, { useEffect } from 'react';
import Vehicles from '../vehicle/Vehicles';
import VehicleForm from '../vehicle/VehicleForm';
import VehicleFilter from '../vehicle/VehicleFilter';
import { connect } from 'react-redux';
import { loadUser } from '../../actions/authAction';

const Home = ({ loadUser }) => {
  useEffect(() => {
    loadUser();
  }, [loadUser]);

  return (
    <div className='grid-2'>
      <div>
        <VehicleForm />
      </div>
      <div>
        <VehicleFilter />
        <Vehicles />
      </div>
    </div>
  );
};

export default connect(
  null,
  { loadUser }
)(Home);
