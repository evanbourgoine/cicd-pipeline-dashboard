const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

// Simplified user storage (in production, use a database)
const users = [
  {
    id: 1,
    username: 'admin',
    password: 'password123'
  }
];

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    console.log('Login attempt - Username:', username, 'Password:', password); // DEBUG
    
    const user = users.find(u => u.username === username);
    if (!user) {
      console.log('User not found'); // DEBUG
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    console.log('User found:', user); // DEBUG
    console.log('Password match:', password === user.password); // DEBUG
    
    // Simple comparison - no bcrypt
    if (password !== user.password) {
      console.log('Password mismatch'); // DEBUG
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: '24h'
    });

    console.log('Login successful, sending token'); // DEBUG
    res.json({ token, username: user.username });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;