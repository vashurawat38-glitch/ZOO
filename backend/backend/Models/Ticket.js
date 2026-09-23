const mongoose = require("mongoose");

// Ticket Schema
const ticketSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,   // name must be provided
  },
  email: {
    type: String,
    required: true,   // email 
  },
  date: {
    type: String,
    required: true,  
  },
  adults: {
    type: Number,
    required: true,
    default: 0,
  },
  children: {
    type: Number,
    required: true,
    default: 0,
  },
  seniors: {
    type: Number,
    required: true,
    default: 0,
  },
  totalPrice: {
    type: Number,
  },
  paymentStatus: {
    type: String,
  },
},
 { timestamps: true }); // automatically adds createdAt & updatedAt

// Export Model
module.exports = mongoose.model("Ticket", ticketSchema);
