

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Alert, Table, Modal, Button } from 'react-bootstrap'; // Import Bootstrap components
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from './Components/AdminDahboard/Sidebar.js';
import './AdminRervationList.css'; // Import the CSS file
const AdminProduct = () => {
  const [productData, setProductData] = useState({
    name: '',
    detail: '',
    image: null,
  });

  const [products, setProducts] = useState([]);
  const [alert, setAlert] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);

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

  const handleInputChange = (e) => {
    setProductData({
      ...productData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    setProductData({
      ...productData,
      image: e.target.files[0],
    });
  };

  const showAlert = (message, variant) => {
    setAlert({ message, variant });
    setTimeout(() => {
      setAlert(null);
    }, 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!productData.image) {
        showAlert('Image is required', 'danger');
        return;
      }

      const formData = new FormData();
      formData.append('name', productData.name);
      formData.append('detail', productData.detail);
      formData.append('image', productData.image);

      const addResponse = await axios.post('http://localhost:8000/api/add', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        },
      });

      showAlert('Product added successfully', 'success');

      const fetchResponse = await axios.get('http://localhost:8000/api/all');
      setProducts(fetchResponse.data);

      setProductData({
        name: '',
        detail: '',
        image: null,
      });

    } catch (error) {
      console.error('Error adding product:', error);
      showAlert('Error adding product', 'danger');
    }
  };

  const handleDelete = async (productId) => {
    try {
      const deleteResponse = await axios.delete(`http://localhost:8000/api/${productId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        },
      });

      showAlert('Product deleted successfully', 'success');

      const fetchResponse = await axios.get('http://localhost:8000/api/all');
      setProducts(fetchResponse.data);
    } catch (error) {
      console.error('Error deleting product:', error);
      showAlert('Error deleting product', 'danger');
    }
  };

  const handleShowModal = (productId) => {
    setSelectedProductId(productId);
    setShowModal(true);
    const selectedProduct = products.find((product) => product._id === productId);
    setProductData({
      name: selectedProduct.name,
      detail: selectedProduct.detail,
      image: null,
    });
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setProductData({
      name: '',
      detail: '',
      image: null,
    });
  };

  const handleUpdate = async () => {
    try {
      const formData = new FormData();
      formData.append('name', productData.name);
      formData.append('detail', productData.detail);
      formData.append('image', productData.image);

      const updateResponse = await axios.put(
        `http://localhost:8000/api/${selectedProductId}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem('jwt')}`,
          },
        }
      );

      showAlert('Product updated successfully', 'success');

      const fetchResponse = await axios.get('http://localhost:8000/api/all');
      setProducts(fetchResponse.data);

      setShowModal(false);
    } catch (error) {
      console.error('Error updating product:', error);
      showAlert('Error updating product', 'danger');
    }
  };

  return (
    <>
    <div className="admin-reservation-list">
    <Sidebar />
    <div className="content">
    <div className="admin-product-container">
      {alert && <Alert variant={alert.variant}>{alert.message}</Alert>}

      <h2 style={{color:'black'}}>Ajouter un produit</h2>
      <form onSubmit={handleSubmit} className="product-form">
        <label>Name:</label>
        <input type="text" name="name" value={productData.name} onChange={handleInputChange} />

        <label>Detail:</label>
        <input type="text" name="detail" value={productData.detail} onChange={handleInputChange} />

        <label>Image:</label>
        <input type="file" name="image" onChange={handleImageChange} />

        <button type="submit" style={{marginTop:"50px"}}>Ajouter un produit </button>
      </form>

      <h2  style={{color:'black'}} >Listes des produits</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Detail</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product._id}</td>
              <td>{product.name}</td>
              <td>{product.detail}</td>
              <td>
                {product.image && (
                  <img
                    src={`http://localhost:8000/${product.image}`}
                    alt={product.name}
                    className="product-image" width="150px"
                  />
                )}
              </td>
              <td>
                <button onClick={() => handleDelete(product._id)}  style={{margin:"5px"}}>Supprimer</button>
                <button onClick={() => handleShowModal(product._id) } style={{margin:"5px"}}>Modifier</button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Modifier un produit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={productData.name}
              onChange={handleInputChange}
            />

            <label>Detail:</label>
            <input
              type="text"
              name="detail"
              value={productData.detail}
              onChange={handleInputChange}
            />

            <label>Image:</label>
            <input type="file" name="image" onChange={handleImageChange} />
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
    </div>
    </div>
    </>
  );
};

export default AdminProduct;
