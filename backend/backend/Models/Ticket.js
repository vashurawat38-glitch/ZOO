const mongoose = require("mongoose");

//  Ticket schema define krnaa
const ticketSchema = new mongoose.Schema({
  name: String,
  email: String,
  date: String,
});

//  Export model
module.exports = mongoose.model("Ticket", ticketSchema);
