// models.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const options = { timestamps: true };
// Employee Schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  lname: { type: String, required: true },
  password: { type: String, required: true }, // ✅ added definition for password
  email: { type: String, required: true, unique: true },
  empType: { 
    type: String, 
    enum: ['ADMIN', 'SUPERVISOR', 'L1ENGINEER', 'L2L3ENGINEER', 'L4ENGINEER'], 
    required: true 
  }
},options);

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Compare password
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Ticket Schema
const ticketSchema = new mongoose.Schema({
  clientName: { type: String, required: true },
  email: { type: String, required: true },
  occupation: { type: String, required: true },
  contactNumber: { type: String, required: true },
  status: {type: String,enum: ['New', 'Assigned', 'In Progress', 'Escalated', 'Resolved', 'Closed'],default: 'New'},
  ticketHeading: { type: String, required: true },
  description: { type: String, required: true }
},options);

// TBody Schema (Ticket Notes)
const tbodySchema = new mongoose.Schema({
  ticketId: { type: mongoose.Schema.Types.ObjectId, ref: 'Ticket', required: true },
  noteby: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  note: { type: String, required: true }
},options);

// Export Models
const User = mongoose.model('User', userSchema);
const Ticket = mongoose.model('Ticket', ticketSchema);
const TBody = mongoose.model('TBody', tbodySchema);

module.exports = { User, Ticket, TBody };
