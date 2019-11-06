import React, { useState, useEffect } from 'react';
import { setAlert } from '../../actions/alertAction';
import { clearErrors, login } from '../../actions/authAction';
import { connect } from 'react-redux';

const Login = ({
  setAlert,
  clearErrors,
  login,
  error,
  isAuthenticated,
  history
}) => {
  useEffect(() => {
    if (isAuthenticated) {
      history.push('/');
    }
    if (error === 'Invalid Credentials') {
      console.log(error);
      setAlert(error, 'danger');
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, history]);

  const [user, setUser] = useState({
    email: '',
    password: ''
  });

  const { email, password } = user;

  const onChange = e =>
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });

  const onSubmit = e => {
    e.preventDefault();
    if (email === '' || password === '') {
      setAlert('Please fill in all fields', 'danger');
    } else {
      login({
        email,
        password
      });
    }
  };

  return (
    <div className='form-container'>
      <h1>
        Account <span className='text-primary'>Login</span>
      </h1>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='email'>Email address</label>
          <input
            type='email'
            name='email'
            value={email}
            onChange={onChange}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            name='password'
            value={password}
            onChange={onChange}
            required
          />
        </div>
        <input
          type='submit'
          value='Login'
          className='btn btn-primary btn-block'
        />
      </form>
    </div>
  );
};

const mapStateToProps = state => ({
  error: state.auth.error,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { setAlert, clearErrors, login }
)(Login);
