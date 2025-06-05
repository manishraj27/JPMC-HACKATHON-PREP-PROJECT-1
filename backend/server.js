// Entry point of the backend server
require('dotenv').config();
const dbconnection = require('./db/connection');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5173', // Your frontend URL
  credentials: true
}));

// Route files
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');

// Mount routers
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);

// Route to display the initial message on browser
app.get('/', (req, res) => {
  res.send('BACKEND BACKEND API');
});

app.listen(PORT, () => {
  console.log(`Server is up and running at http://localhost:${PORT} 🚀`);
});