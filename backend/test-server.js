const express = require('express');
const app = express();

// CORS headers FIRST
app.use((req, res, next) => {
  console.log(`Incoming: ${req.method} ${req.url}`);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    console.log('Preflight handled');
    return res.status(200).end();
  }
  next();
});

app.use(express.json());

// Simple test route
app.post('/api/auth/login', (req, res) => {
  console.log('Login route hit!', req.body);
  res.json({ 
    token: 'test-token-123',
    username: 'admin'
  });
});

app.listen(5001, () => {
  console.log('Test server on port 5001');
});