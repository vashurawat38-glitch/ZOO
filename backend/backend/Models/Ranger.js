const mongoose = require("mongoose");

const rangerSchema = new mongoose.Schema({
  certificateId: { type: String, required: true, unique: true },
  studentName: { type: String, required: true },
  schoolName: { type: String, required: true },
  email: { type: String, required: true },
  issuedAt: { type: String, required: true }
}, { timestamps: true });

// Direct active connection binding
module.exports = mongoose.connection.model("Ranger", rangerSchema, "rangers");