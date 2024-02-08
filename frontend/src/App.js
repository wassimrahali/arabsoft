import React from 'react';
import {
  Routes,
  Route,
  BrowserRouter as Router,
  Navigate
} from 'react-router-dom';
import Signin from './Components/SigninPage/Signin.js';
import Signup from './Components/SignupPage/Signup.js';
import Home from './Components/Home.js';
import AdminUsers from './Components/adminUsers.js';
import ProductList from './productList.js';
import UpdateUserPage from './UpdateUserPage.js';
import { isAuthenticated } from './Backend';
import ReservationForm from './ReservationForm.js';
import AdminReservationList from './AdminReservationList.js';
import NotFound from './Notfound.js';
import MyForm from './Myform.js';
import AjirDetails from '../src/Components/productDetails/AjirDetails.js';
import Sidebar from './Components/AdminDahboard/Sidebar.js';
import AdminProduct from './AdminProduct.js';
import ResetPassword from './Components/SigninPage/ResetPassword.js';
import ForgetPassword from './Components/SigninPage/ForgetPassword.js';

function App() {
  const authenticatedUser = isAuthenticated(); // Check if the user is authenticated

  return (
    <div className='App'>
      {/* Setting up the Router component from react-router-dom */}
      <Router>
        {/* Defining different Routes using Routes and Route components */}
        <Routes>
        <Route path='/submit' element={<ReservationForm />} />

          {/* Route for the Home component */}
          <Route path='/' element={<Home />} />
          <Route path='/home' element={<Home />} />

          {/* Route for the Signin component */}
          <Route path='/signin' element={<Signin />} />

          {/* Route for the Signup component */}
          <Route path='/signup' element={<Signup />} />

          {/* Route for the ProductList component */}
          <Route path='/products' element={<ProductList />} />
          <Route path="/products/:productId" element={<AjirDetails />} />

          <Route path='/contact' element={<MyForm />} />
           <Route path='/ajir' element={<AjirDetails />} />
           <Route path='/reset-password/:id/:token' element={<ResetPassword />} />
           <Route path='/forget' element={<ForgetPassword />} />


          {/* Admin Routes */}
          {authenticatedUser && authenticatedUser.user.role === 'admin' && (
            <>
              <Route path='/reservation' element={<AdminReservationList />} />
              <Route path='/users' element={<AdminUsers />} />
              <Route path='/addproduct' element={<AdminProduct />} />
              <Route path='/side' element={<Sidebar />} />
              {/* <Route path='/submit' element={<Signin />} /> */}

            </>
          )}

          {/* User Routes */}
          {authenticatedUser && authenticatedUser.user.role === 'user' && (
            <>
              <Route path='/update' element={<UpdateUserPage />} />
              <Route path='/submit' element={<ReservationForm />} />
              <Route path='*' element={<NotFound />} />

            </>
          )}

          {/* Redirect authenticated users to Home, and unauthenticated users to Signin */}
          <Route
            // path='*'
            element={
              authenticatedUser ? (
                <Navigate to='/home' replace={true} />
              ) : (
                <Navigate to='/' replace={true} />
              )
            }
          />

          {/* 404 Not Found */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
