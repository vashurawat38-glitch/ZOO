const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let Ticket, User, Ranger;

async function startApp() {
  try {
    // 1. Connect to MongoDB FIRST with explicit dbName
    await mongoose.connect(process.env.MONGO_URI, { dbName: "zooDB" });
    console.log("🟢 Connected to MongoDB!");
    console.log("📌 Active DB Name:", mongoose.connection.name);

    // 2. Load Models AFTER connection is established
    Ticket = require("./Models/Ticket");
    User = require("./Models/User");
    Ranger = require("./Models/Ranger");

    // ================= AUTH ROUTES =================

    app.post("/api/auth/register", async (req, res) => {
      try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ error: "Email already exists!" });

        const newUser = new User({ name, email, password });
        await newUser.save();
        res.json({ message: "Account created successfully! Please log in." });
      } catch (err) {
        console.error("❌ Register Error:", err);
        res.status(500).json({ error: "Server error during registration" });
      }
    });

    app.post("/api/auth/login", async (req, res) => {
      try {
        const { email, password } = req.body;
        const user = await User.findOne({ email, password });
        if (!user) return res.status(400).json({ error: "Invalid email or password!" });

        res.json({ message: "Login successful!", user: { name: user.name, email: user.email } });
      } catch (err) {
        console.error("❌ Login Error:", err);
        res.status(500).json({ error: "Server error during login" });
      }
    });

    // ================= TICKET ROUTES =================

    app.post("/api/tickets", async (req, res) => {
      try {
        const newTicket = new Ticket(req.body);
        await newTicket.save();
        res.json({ message: `Ticket booked for ${req.body.name} on ${req.body.date}` });
      } catch (err) {
        console.error("❌ Ticket Error:", err);
        res.status(500).json({ error: "Server error while booking ticket" });
      }
    });

    app.get("/api/tickets", async (req, res) => {
      try {
        const tickets = await Ticket.find();
        res.json(tickets);
      } catch (err) {
        console.error("❌ Fetch Tickets Error:", err);
        res.status(500).json({ error: "Server error while fetching tickets" });
      }
    });

    // ================= CHATBOT ROUTE =================

    app.post("/api/chatbot", (req, res) => {
      try {
        const { message } = req.body;
        const userMsg = (message || "").toLowerCase();

        let reply = "👋 Hi! How can I help you with your Zoo visit today?";

        if (userMsg.includes("ticket") || userMsg.includes("price") || userMsg.includes("book")) {
          reply = "🎟️ You can easily book tickets from our Tickets section on the website or directly at the Zoo entrance!";
        } else if (userMsg.includes("time") || userMsg.includes("timing") || userMsg.includes("open")) {
          reply = "⏰ The zoo is open daily from 9:00 AM to 6:00 PM.";
        } else if (userMsg.includes("location") || userMsg.includes("where") || userMsg.includes("address")) {
          reply = "📍 Animal Kingdom Zoo is located in the central park region with full parking facilities.";
        } else if (userMsg.includes("animal") || userMsg.includes("lion") || userMsg.includes("tiger") || userMsg.includes("ranger")) {
          reply = "🦁 We have lions, tigers, giraffes, elephants, and our special Junior Zoo Ranger program!";
        }

        res.json({ reply });
      } catch (err) {
        console.error("❌ Chatbot Error:", err);
        res.status(500).json({ reply: "❌ Sorry, I had trouble processing that request." });
      }
    });

    // ================= JUNIOR ZOO RANGER ROUTE =================

    const handleRangerEnroll = async (req, res) => {
      try {
        const { studentName, schoolName, email } = req.body;
        if (!studentName || !schoolName || !email) {
          return res.status(400).json({ success: false, message: "All fields are required!" });
        }

        const certificateId = `RANGER-${Math.floor(100000 + Math.random() * 900000)}`;
        const issuedAt = new Date().toLocaleDateString();

        const newRanger = new Ranger({ certificateId, studentName, schoolName, email, issuedAt });
        await newRanger.save();

        res.status(201).json({
          success: true,
          message: "Junior Ranger Pass generated successfully!",
          data: newRanger,
        });
      } catch (err) {
        console.error("❌ Ranger Enrollment Error:", err);
        res.status(500).json({ success: false, error: "Server error during ranger registration" });
      }
    };

    app.post("/api/ranger/enroll", handleRangerEnroll);
    app.post("/api/rangers", handleRangerEnroll);

    // Dynamic port assignment for production deployments
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });

  } catch (err) {
    console.error("❌ Connection failed:", err);
  }
}

startApp();