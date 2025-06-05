const express = require('express');
const ticketroutes = express.Router();

const { Ticket } = require('../models');

ticketroutes.post('/add', async (req, res) => {
  try {
    const ticket = new Ticket(req.body);
    await ticket.save();
    res.status(201).json(ticket);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = ticketroutes;