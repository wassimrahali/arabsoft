// // AdminPage.js
// import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const AdminPage = () => {
//   const [users, setUsers] = useState([]);
//   const [alert, setAlert] = useState(null);

//   useEffect(() => {
//     // Fetch users when the component mounts
//     const fetchUsers = async () => {
//       try {
//         const response = await axios.get('http://localhost:8000/api/admin/users');
//         setUsers(response.data);
//       } catch (error) {
//         console.error('Error fetching users:', error);
//       }
//     };

//     fetchUsers();
//   }, []);

//   const handleDelete = async (userId) => {
//     try {
//       // Make a DELETE request to delete the user
//       const response = await axios.delete(`http://localhost:8000/api/admin/user/${userId}`);

//       if (response.data.message === 'User deleted successfully') {
//         // If deletion is successful, update the users state
//         setUsers(users.filter(user => user._id !== userId));

//         // Show success alert
//         setAlert({
//           type: 'success',
//           message: 'User deleted successfully!',
//         });
//       } else {
//         console.error('Error deleting user:', response.data.error);

//         // Show error alert
//         setAlert({
//           type: 'danger',
//           message: 'Error deleting user. Please try again.',
//         });
//       }
//     } catch (error) {
//       console.error('Error deleting user:', error);

//       // Show error alert
//       setAlert({
//         type: 'danger',
//         message: 'Error deleting user. Please try again.',
//       });
//     }
//   };

//   return (
//     <div>
//       <h2>Admin Page</h2>

//       {/* Bootstrap Alert */}
//       {alert && (
//         <div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
//           {alert.message}
//           <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={() => setAlert(null)}>
//             <span aria-hidden="true">&times;</span>
//           </button>
//         </div>
//       )}

//       <table className="table">
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Name</th>
//             <th>Email</th>
//             <th>Phone Number</th>
//             <th>Entreprise Name</th>
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users
//             .filter(user => user.role !== 'admin') // Filter out users with admin role
//             .map((user) => (
//               <tr key={user._id}>
//                 <td>{user._id}</td>
//                 <td>{user.name}</td>
//                 <td>{user.email}</td>
//                 <th>{user.phoneNumber}</th>
//                 <th>{user.enterpriseName}</th>
//                 <td>
//                   <button className="btn btn-danger" onClick={() => handleDelete(user._id)}>Delete</button>
//                 </td>
//               </tr>
//             ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default AdminPage;




















// Import necessary dependencies
// Import necessary dependencies


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Alert, Table, Modal, Button } from 'react-bootstrap'; // Import Bootstrap components
import 'bootstrap/dist/css/bootstrap.min.css';
import './AdminProduct.css';

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
    <div className="admin-product-container">
      {alert && <Alert variant={alert.variant}>{alert.message}</Alert>}

      <h2>Add Product</h2>
      <form onSubmit={handleSubmit} className="product-form">
        <label>Name:</label>
        <input type="text" name="name" value={productData.name} onChange={handleInputChange} />

        <label>Detail:</label>
        <input type="text" name="detail" value={productData.detail} onChange={handleInputChange} />

        <label>Image:</label>
        <input type="file" name="image" onChange={handleImageChange} />

        <button type="submit">Add Product</button>
      </form>

      <h2>Product List</h2>
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
                <button onClick={() => handleDelete(product._id)}>Delete</button>
                <button onClick={() => handleShowModal(product._id)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Product</Modal.Title>
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
  );
};

export default AdminProduct;
