import React, { useState, useContext, useEffect } from 'react';
import VehicleContext from '../../context/vehicle/vehicleContext';
import AlertContext from '../../context/alert/alertContext';

const VehicleForm = () => {
  const vehicleContext = useContext(VehicleContext);
  const alertContext = useContext(AlertContext);

  const { addVehicle, clearCurrent, current, updateVehicle } = vehicleContext;

  useEffect(() => {
    if (current !== null) {
      setVehicle(current);
    } else {
      setVehicle({
        plateNumber: '',
        manufacturer: '',
        type: '',
        inspection: '',
        owner: '',
        insurence: ''
      });
    }
  }, [vehicleContext, current]); // if the contactContext or the current value is changed

  // Since this is a form we need component level state
  const [vehicle, setVehicle] = useState({
    plateNumber: '',
    manufacturer: '',
    type: '',
    inspection: '',
    owner: '',
    insurence: ''
  });

  const {
    plateNumber,
    manufacturer,
    type,
    inspection,
    owner,
    insurence
  } = vehicle;

  const onChange = e =>
    setVehicle({ ...vehicle, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (current === null) {
      if (plateNumber.length < 6) {
        alertContext.setAlert(
          'The license plate number has to be at least 6 letters long',
          'danger'
        );
      } else {
        addVehicle(vehicle); // if there is no current we are adding a new contact
        clearAll();
      }
    } else {
      // we are updating
      if (plateNumber.length < 6) {
        alertContext.setAlert(
          'The license plate number has to be at least 6 letters long',
          'danger'
        );
      } else {
        updateVehicle(vehicle);
        clearAll();
      }
    }
  };

  const clearAll = () => {
    clearCurrent();
  };

  return (
    <form onSubmit={onSubmit}>
      <h2 className='text-primary'>
        {current ? 'Edit Vehicle' : 'Register Vehicle'}
      </h2>
      <h5>License Plate Number</h5>
      <input
        type='text'
        placeholder='Plate number...'
        name='plateNumber'
        value={plateNumber} // the destructured value from vehicle
        onChange={onChange}
        required
      />
      <h5>Manufacturer</h5>
      <input
        type='text'
        placeholder='Manufacturer...'
        name='manufacturer'
        value={manufacturer}
        onChange={onChange}
        required
      />
      <h5>Type</h5>
      <input
        type='text'
        placeholder='Type'
        name='type'
        value={type}
        onChange={onChange}
        required
      />
      <h5>Inspection Date</h5>
      <input
        type='date'
        placeholder='Inspection date...'
        name='inspection'
        value={inspection}
        onChange={onChange}
        required
      />
      <h5>Owner's name</h5>
      <input
        type='text'
        placeholder='Owner'
        name='owner'
        value={owner}
        onChange={onChange}
        required
      />
      <h5>Insurence company</h5>
      <input
        type='text'
        placeholder='Insurence company'
        name='insurence'
        value={insurence}
        onChange={onChange}
        required
      />
      <div>
        <input
          type='submit'
          value={current ? 'Update Vehicle' : 'Add Vehicle'}
          className='btn btn-primary btn-block'
          onChange={onChange}
        />
      </div>
      <div>
        {current && (
          <div>
            <button className='btn btn-dark btn-block' onClick={clearAll}>
              Clear
            </button>
          </div>
        )}
      </div>
    </form>
  );
};

export default VehicleForm;
