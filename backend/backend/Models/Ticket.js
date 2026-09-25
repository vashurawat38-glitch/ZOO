const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  date: { type: String, required: true },
  adults: { type: Number, required: true, default: 0 },
  children: { type: Number, required: true, default: 0 },
  seniors: { type: Number, required: true, default: 0 },
  totalPrice: { type: Number },
  paymentStatus: { type: String }
}, { timestamps: true });

module.exports = mongoose.models.Ticket || mongoose.model("Ticket", ticketSchema, "tickets");