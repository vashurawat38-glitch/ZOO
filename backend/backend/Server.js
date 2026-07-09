const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Ticket = require("./models/Ticket");

const app = express();


app.use(cors()); // CORS allow karne ke liye
app.use(express.json()); // JSON data parse karne ke liye
app.use(express.urlencoded({ extended: true })); // Form data handle karne ke liye

// MongoDB Atlas Connection
const dbURI = "mongodb+srv://vashurawat24_db_user:rawat124@cluster0.nmm9r9b.mongodb.net/?appName=Cluster0"
mongoose.connect(dbURI)
.then(() => console.log("✅ MongoDB Atlas se connect ho gaya!"))
.catch((err) => console.error("❌ Connection Error:", err));

//  Ticket booking Route
app.post("/api/tickets", async (req, res) => {
  try {
    console.log("Frontend data agya:", req.body); // Debugging ke liye
    const newTicket = new Ticket(req.body);
    await newTicket.save();
    res.json({ message: `Ticket booked for ${req.body.name} on ${req.body.date}` });
  } catch (err) {
    console.error("Error saving ticket:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// Get all tickets Route
app.get("/api/tickets", async (req, res) => {
  try {
    const tickets = await Ticket.find();
    res.json(tickets);
  } catch (err) {
    console.error(" Error fetching tickets:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
