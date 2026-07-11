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
  }
}, { timestamps: true }); // automatically adds createdAt & updatedAt

// Export Model
module.exports = mongoose.model("Ticket", ticketSchema);
