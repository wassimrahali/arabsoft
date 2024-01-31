import React from 'react';
import { Routes, Route, BrowserRouter as Router, Navigate } from 'react-router-dom';
import Signin from './Components/SigninPage/Signin.js';
import Signup from './Components/SignupPage/Signup.js';
import Home from './Components/Home.js';
import Admin from './Components/admin.js';  // Assuming your admin component is named Admin
import ProductList from './productList.js';  // Correcting the import
import UpdateUserPage from './UpdateUserPage.js'
import { isAuthenticated } from './Backend';
import ReservationForm from './ReservationForm.js';
import AdminReservationList from './AdminReservationList.js';
import NotFound from './Notfound.js';
import MyForm from './MyForm.js';

 import HRManagementDetails from '../src/Components/productDetails/AjirDetails.js'


function App() {
  const authenticatedUser = isAuthenticated(); // Check if the user is authenticated

  return (
    <div className='App'>
      {/* Setting up the Router component from react-router-dom */}
      <Router>
        {/* Defining different Routes using Routes and Route components */}
        <Routes>
        <Route path='*' element={<NotFound />} />

          {/* Route for the Home component */}
          <Route path='/' element={<Home />} />
          <Route path='/home' element={<Home />} />

          {/* Route for the Signin component */}
          <Route path="/signin" element={<Signin />} />
          {/* Route for the ProductList component */}
          <Route path="/products" element={<ProductList />} />
          <Route path="/update" element={<UpdateUserPage />} />
          <Route path="/submit" element={<ReservationForm />} />
          <Route path="/contact" element={<MyForm />}/>
          {/* Route for the Signup component */}
          <Route path='/signup' element={<Signup />} />
          {/* Route for the Admin component */}
          {authenticatedUser && authenticatedUser.user.role === 'admin' ? (
            <Route path='/admin' element={<AdminReservationList />} />
            // <Route path='/reservationlist' element={<AdminReservationList/>} />

     
          ) : null}

          <Route
            path="*"
            element={
              authenticatedUser && authenticatedUser.user.role === 'user'
                ? <Navigate to="/" />
                : <Navigate to="/signin" />
            }
          />
        </Routes>
      </Router>
    </div>

    
  );
}

export default App;
