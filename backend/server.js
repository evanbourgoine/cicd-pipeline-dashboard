require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connectMongo, sequelize } = require('./config/db');

const app = express();

// Manual CORS headers
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  
  next();
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connections
connectMongo();
sequelize.sync().then(() => console.log('MySQL connected'));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/pipeline', require('./routes/pipeline'));

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));