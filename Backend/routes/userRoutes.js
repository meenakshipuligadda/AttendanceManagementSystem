const express = require('express');
const router = express.Router();
const { User } = require('../models');

// ==========================
// CREATE USER
// ==========================

router.post('/users', async (req, res) => {
  try {

    const { name, email, mobile } = req.body;

    const user = await User.create({
      name,
      email,
      mobile
    });

    res.status(201).json(user);

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }
});

// ==========================
// GET ALL USERS
// ==========================

router.get('/users', async (req, res) => {

  try {

    const users = await User.findAll({
      order: [["id", "DESC"]]
    });

    res.json(users);

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

});

// ==========================
// UPDATE USER
// ==========================

router.put('/users/:id', async (req, res) => {

  try {

    const { id } = req.params;

    const { name, email, mobile } = req.body;

    const user = await User.findByPk(id);

    if (!user) {

      return res.status(404).json({
        message: "User not found"
      });

    }

    user.name = name;
    user.email = email;
    user.mobile = mobile;

    await user.save();

    res.json({
      message: "User Updated Successfully",
      data: user
    });

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

});

// ==========================
// DELETE USER
// ==========================

router.delete('/users/:id', async (req, res) => {

  try {

    const { id } = req.params;

    const user = await User.findByPk(id);

    if (!user) {

      return res.status(404).json({
        message: "User not found"
      });

    }

    await user.destroy();

    res.json({
      message: "User Deleted Successfully"
    });

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

});

module.exports = router;