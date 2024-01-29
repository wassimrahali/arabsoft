// UpdateUserPage.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css'
import Dashboard from './Components/Dashboard/Dashboard'
const UpdateUserPage = ({ match }) => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '', // Initialize with an initial value for password
    phoneNumber: '',
    enterpriseName: '',
    adresse :'Tunisie',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const userString = localStorage.getItem('user');
  const userObject = JSON.parse(userString);

  // Now you can access the _id property
  const userId = userObject._id;

  useEffect(() => {
    // Fetch user data based on the userId from the URL params
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/user/${userId}`);
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError('Error fetching user data. Please try again.');
      }
    };

    fetchUserData();
  }, [userId]);

  const handleChange = (e) => {
    setUser((prevUser) => ({
      ...prevUser,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:8000/api/admin/user/${userId}`, user);

      setSuccess(true);
      setError('');
    } catch (error) {
      setSuccess(false);
      setError(error.response.data.error || 'Something went wrong.');
    }
  };

  return (
    
    <div>
      <>
      <Dashboard />
      </>
      <h2>User Information</h2>
      {user && (
        <div>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <p>Password: ********</p>
          <p>Phone Number: {user.phoneNumber}</p>
          <p>Enterprise Name: {user.enterpriseName}</p>
          <p>Adress: {user.adresse}</p>
        </div>
      )}

      <hr />

      <h2>Update User Information</h2>
      {success && <p>User information updated successfully!</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" value={user.name} onChange={handleChange} disabled />
        </label>
        <br />
        <label>
          Email:
          <input type="email" name="email" value={user.email} onChange={handleChange}  disabled />
        </label>
        <br />
        <label>
          Password:
          <input type="password" name="password" value={user.password || ''} onChange={handleChange} disabled />
        </label>
        <br />
        <label>
          Phone Number:
          <input type="text" name="phoneNumber" value={user.phoneNumber} onChange={handleChange} />
        </label>
        <br />
       <label>
          Adresse
          <input type="text" name="adresse" value={user.adresse} onChange={handleChange} />
        </label>
        <br />
        <label>
          Enterprise Name:
          <input type="text" name="enterpriseName" value={user.enterpriseName} onChange={handleChange} />
        </label>
        <br />
        <br />
        <button type="submit">Update Information</button>
      </form>
    </div>
  );
};

export default UpdateUserPage;
