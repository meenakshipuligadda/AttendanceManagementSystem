const express = require('express');
const router = express.Router();
const { User } = require('../models');

// POST - Create user
router.post('/users', async (req, res) => {
  try {
    const { name, email, mobile } = req.body;

    const user = await User.create({ name, email, mobile });

    res.status(201).json({
      message: 'User created successfully',
      data: user
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET - Fetch all users
router.get('/users', async (req, res) => {
  try {
    const users = await User.findAll();

    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;