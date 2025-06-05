const express = require('express');
const userroutes = express.Router();

const { User } = require('../models.js');

userroutes.post("/add", async (req, res) => {
  const { name, lname, email, password, empType } = req.body;
  try {
    const user = await User.create({ name, lname, email, password, empType });
    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = userroutes;
