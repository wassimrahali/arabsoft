// app.js
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();


// Routes
const UserRoute = require('./routes/user');
const AuthRoute = require('./routes/auth');
const ProductRoute = require('./routes/product'); // Import product routes
const reservationRoutes = require('./routes/reservation');

// Database connection
mongoose
  .connect(`${process.env.MongoDB_URL}`, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Database connected successfully'))
  .catch((err) => console.log('Database connection failed', err));

// Starting the application
const port = process.env.PORT || 8000;
const app = express();

app.use('/uploads', express.static('uploads'));
app.use((err, req, res, next) => {
  console.error('Error:', err);
  // Additional error handling logic
  res.status(500).send('Internal Server Error');
});
// Middleware
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({   
    extended: true
}));


// Calling the routes
app.use('/api', AuthRoute);
app.use('/api', UserRoute);
app.use('/api', ProductRoute); // Use the product routes
app.use(reservationRoutes);

// Start server
app.listen(port, () => {
  console.log(`App is running at http://localhost:${port}`);
});

