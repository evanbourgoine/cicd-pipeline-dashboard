require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connectMongo, sequelize } = require('./config/db');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database connections
connectMongo();
sequelize.sync().then(() => console.log('MySQL connected'));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/pipeline', require('./routes/pipeline'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));