import React, { useContext, useEffect } from 'react';
import Vehicles from '../vehicle/Vehicles';
import VehicleForm from '../vehicle/VehicleForm';
import VehicleFilter from '../vehicle/VehicleFilter';
import AuthContext from '../../context/auth/authContext';

const Home = () => {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    authContext.loadUser();
    //eslint-disable-next-line
  });

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

export default Home;
