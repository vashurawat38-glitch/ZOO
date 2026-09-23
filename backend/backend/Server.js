const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config(); // ✅ Load .env file

// Models import
const Ticket = require("./Models/Ticket");
const User = require("./Models/User");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("🟢 MongoDB connected"))
  .catch((err) => console.error("❌ Connection Error:", err));

// ================= AUTH ROUTES =================

// Signup
app.post("/api/auth/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ error: "Email already exists!" });

    const newUser = new User({ name, email, password });
    await newUser.save();
    res.json({ message: "Account created successfully! Please log in." });
  } catch (err) {
    res.status(500).json({ error: "Server error during registration" });
  }
});

// Login
app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    if (!user) return res.status(400).json({ error: "Invalid email or password!" });

    res.json({ message: "Login successful!", user: { name: user.name, email: user.email } });
  } catch (err) {
    res.status(500).json({ error: "Server error during login" });
  }
});

// ================= TICKET ROUTES =================

// Book Ticket
app.post("/api/tickets", async (req, res) => {
  try {
    const newTicket = new Ticket(req.body);
    await newTicket.save();
    res.json({ message: `Ticket booked for ${req.body.name} on ${req.body.date}` });
  } catch (err) {
    res.status(500).json({ error: "Server error while booking ticket" });
  }
});

// Get Tickets
app.get("/api/tickets", async (req, res) => {
  try {
    const tickets = await Ticket.find();
    res.json(tickets);
  } catch (err) {
    res.status(500).json({ error: "Server error while fetching tickets" });
  }
});

// ================= CHATBOT ROUTE =================
app.post("/api/chatbot", async (req, res) => {
  try {
    const { message } = req.body;
    let reply = "I can help with zoo info: tickets, timings, animals, location, and more!";

    if (message.toLowerCase().includes("hello")) {
      reply = "Hello! Welcome to our Zoo 🦁🎟️";
    } else if (message.toLowerCase().includes("ticket")) {
      reply = "You can book tickets online from the Tickets section.";
    } else if (message.toLowerCase().includes("animals")) {
      reply = "We have lions, elephants, zebras, giraffes and more amazing animals!";
    } else if (message.toLowerCase().includes("timing")) {
      reply = "Our zoo is open from 9 AM to 6 PM every day.";
    } else if (message.toLowerCase().includes("price")) {
      reply = "Ticket prices: Adults ₹150, Children ₹50, Senior Citizens ₹100.";
    } else if (message.toLowerCase().includes("location")) {
      reply = "Our zoo is located in Chandigarh-Zirakpur-Patiala highway in Chhat village, Punjab about 17-20 km from Chandigarh";
    } else if (message.toLowerCase().includes("contact")) {
      reply = "You can reach us via the Contact page on the site.";
    }

    res.json({ reply });
  } catch (err) {
    console.error("❌ Chatbot Error:", err);
    res.status(500).json({ error: "Server error in chatbot" });
  }
});

// ================= SERVER START =================
app.listen(5000, () => console.log("🚀 Server running on port 5000"));
