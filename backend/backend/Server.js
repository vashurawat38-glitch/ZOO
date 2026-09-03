const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Ticket = require("./Models/Ticket");
const User = require("./Models/User"); // Naya User model import kiya

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('API is running');
});

// MongoDB Atlas Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("🟢 MongoDB Atlas se connect ho gaya!"))
  .catch((err) => console.error("❌ Connection Error:", err));

// ================= AUTH ROUTES (LOGIN & SIGNUP) =================

// 1. SIGNUP API
app.post("/api/auth/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "email already exists!" });
    }

    const newUser = new User({ name, email, password });
    await newUser.save();

    res.json({ message: "Account crreated successfully! Please log in." });
  } catch (err) {
    console.error("❌ Registration Error:", err);
    res.status(500).json({ error: "Server error during registration" });
  }
});

// 2. LOGIN API
app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email, password });
    if (!user) {
      return res.status(400).json({ error: "invalid email or password!" });
    }

    res.json({ 
      message: "Login successful!", 
      user: { name: user.name, email: user.email } 
    });
  } catch (err) {
    console.error("❌ Login Error:", err);
    res.status(500).json({ error: "Server error during login" });
  }
});

// ================= TICKET ROUTES =================

app.post("/api/tickets", async (req, res) => {
  try {
    console.log("🟢 Frontend se data aagya :", req.body);
    const newTicket = new Ticket(req.body);
    await newTicket.save();
    res.json({ message: `Ticket booked for ${req.body.name}` });
  } catch (err) {
    console.error("❌ Error saving ticket:", err);
    res.status(500).json({ error: "Server error while booking ticket" });
  }
});

app.get("/api/tickets", async (req, res) => {
  try {
    const tickets = await Ticket.find();
    res.json(tickets);
  } catch (err) {
    console.error("❌ Error fetching tickets:", err);
    res.status(500).json({ error: "Server error while fetching tickets" });
  }
});

// Start Server
app.listen(5000, () => console.log("🚀 Server running on port 5000"));