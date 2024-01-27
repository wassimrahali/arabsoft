// ReservationForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const ReservationForm = () => {
    const [productData, setProductData] = useState({
        name: '',
        detail: '',
        image: null,
      });
    
   
    
      useEffect(() => {
        const fetchProducts = async () => {
          try {
            const response = await axios.get('http://localhost:8000/api/all');
            setProducts(response.data);
          } catch (error) {
            console.error('Error fetching products:', error);
          }
        };
    
        fetchProducts();
      }, []);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    adresse: '',
    productId: '', // Assuming you have a product ID
  });

  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    // Fetch products from your server
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
        // Handle error, show an error message, etc.
      }
    };

    fetchProducts();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send the reservation data to the server
      await axios.post('http://localhost:8000/api/reservations', formData);

      // Optionally, you can handle success or redirect the user
      console.log('Reservation submitted successfully');
    } catch (error) {
      console.error('Error submitting reservation:', error);
      // Handle error, show an error message, etc.
    }
  };




  return (
    <div>
      <h2>Reservation Form</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Phone Number:
          <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
        </label>

        <br />
        <label>
          Entreprise Name:
          <input type="text" name="entrepriseName" value={formData.entrepriseName} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Address:
          <input type="text" name="adresse" value={formData.adresse} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Product:
          <select name="productId" value={formData.productId} onChange={handleChange} required>
            <option value="" disabled>Select a product</option>
            {products.map((product) => (
                 <option key={product._id} value={product._id} style={{ color: 'black' }}>
                 {product.name}
               </option>
            ))}
          </select>
        </label>
        <br />
        <button type="submit">Submit Reservation</button>
      </form>
    </div>
  );
};

export default ReservationForm;
