import React, { useState } from 'react';
import { signin, authenticate } from '../../Backend';
import { Navigate } from 'react-router-dom';
import Navbar from '../Dashboard/Dashboard';
import { Alert } from 'react-bootstrap'; // Import Bootstrap Alert component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import './signin.css';

// Signin component for the login form
export function Signin() {
  const [values, setValues] = useState({
    email: '',
    password: '',
    error: '',
    loading: false,
    success: false,
    showPassword: false,
  });

  const { email, password, error, loading, success, showPassword } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const togglePasswordVisibility = () => {
    setValues({ ...values, showPassword: !showPassword });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setValues({ ...values, success: false, loading: true });

    // Simulating a 5-second loading delay
    setTimeout(() => {
      signin({ email, password })
        .then((data) => {
          if (data.error) {
            setValues({ ...values, error: data.error, loading: false, success: false });
          } else {
            authenticate(data, () => {
              setValues({ ...values, success: true });
            });
          }
        })
        .catch();
    }, 3000); // 5000 milliseconds (5 seconds)
  };

  const errorMessage = () => {
    return (
      <Alert variant="danger" show={error != '' && !loading}>
        {error}
      </Alert>
    );
  };

  const loadingMessage = () => {
    return (
      loading && (
        <Alert variant="warning">
          <div className='loading-spinner'></div>
          <p>Loading...</p>
        </Alert>
      )
    );
  };

  return (
    <>
      <Navbar />
      <h2 className='text-signin' style={{ color: 'black' }}>
        Découvrez nos logiciels Entreprise Management pour chaque secteur d’activité
      </h2>
      {success ? (
        <Navigate to='/' />
      ) : (
        <div className='form-container' >
          <div className='form-box' style={{marginTop:'-310px'}}>
            <h2>Sign In</h2>
            {loadingMessage()}
            {errorMessage()}
            <div className='form-group'>
              <label htmlFor='email'>Email</label>
              <input type='text' id='email' name='email' value={email} onChange={handleChange('email')} required />
            </div>
            <div className='form-group'>
              <label htmlFor='password'>Password</label>
              <div className='password-input-container'>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id='password'
                  name='password'
                  value={password}
                  onChange={handleChange('password')}
                  required
                />
                <FontAwesomeIcon
                  onClick={togglePasswordVisibility}
                  icon={showPassword ? faEye : faEyeSlash}
                  className='eye-icon'
                />
              </div>
            </div>
            <div className='form-group-button'>
              <button onClick={onSubmit}>Log in</button>
            </div>
            <br />
            <div className='login-message'>
              <center>
                <p className='login_redirect mt-2 '>
                  Don't have an account ?<b style={{ color: 'red' }}><a href='/signup'> Signup Here</a></b>
                </p>
              </center>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Signin;
