const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Simplified user storage (in production, use a database)
const users = [
  {
    id: 1,
    username: 'admin',
    password: '$2a$10$qZYvJ8Xd8K9YxJ0xZYvJ8eN0xJ0xZYvJ8eN0xJ0xZYvJ8eN0xJ0xZ' // 'password123'
  }
];

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    const user = users.find(u => u.username === username);
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: '24h'
    });

    res.json({ token, username: user.username });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;