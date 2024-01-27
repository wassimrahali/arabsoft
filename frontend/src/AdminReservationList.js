import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // Import the CSS file

const AdminReservationList = () => {
  const [reservations, setReservations] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await axios.get('http://localhost:8000/get-all-reservations');
        setReservations(response.data.reservations);
      } catch (error) {
        console.error('Error fetching reservations:', error);
        setError('Error fetching reservations. Please try again.');
      }
    };

    fetchReservations();
  }, []);

  return (
    <div className="admin-reservation-list">
      <h2>Admin Reservation List</h2>
      {error && <p className="error-message">{error}</p>}
      {reservations.length === 0 ? (
        <p>No reservations available.</p>
      ) : (
        <table className="reservation-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Product Name</th>
              <th>Enterprise Name</th>
              <th>Address</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((reservation) => (
              <tr key={reservation._id}>
                <td>{reservation.name}</td>
                <td>{reservation.email}</td>
                <td>{reservation.phoneNumber}</td>
                <td>{reservation.productName}</td>
                <td>{reservation.enterpriseName}</td>
                <td>{reservation.adresse}</td>
                <td>{new Date(reservation.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminReservationList;
