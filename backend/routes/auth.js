const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// SIGNUP
router.post('/signup', authController.signup);

// SIGNIN
router.post('/signin', authController.signin);

// SIGNOUT
router.get('/signout', authController.signout);

// Protected Route for testing
router.get('/testroute', authController.isSignedIn, (req, res) => {
    res.send('A protected route');
});

// Admin Dashboard Route (protected)
router.get('/admin-dashboard', authController.isSignedIn, authController.isAdmin, (req, res) => {
    res.send('Admin Dashboard');
});

// Temporary route to sign in as admin
router.post('/signin-as-admin', authController.signInAsAdmin);

module.exports = router;
