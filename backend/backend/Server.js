const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Ticket = require("./Models/Ticket"); 

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//  MongoDB Atlas connection
mongoose.connect("mongodb+srv://vashurawat24_db_user:rawat100@cluster0.nmm9r9b.mongodb.net/?appName=Cluster0")
  .then(() => console.log("✅ MongoDB Atlas se connect ho gaya!"))
  .catch(err => console.error("❌ Connection Error:", err));

//  POST route with try/catch
app.post("/api/tickets", async (req, res) => {
  try {
    console.log("🔥 Frontend se data aagya :", req.body);
    const newTicket = new Ticket(req.body);
    await newTicket.save();
    res.json({ message: `Ticket booked for ${req.body.name} on ${req.body.date}` });
  } catch (err) {
    console.error("❌ Error saving ticket:", err);
    res.status(500).json({ error: "Server error while booking ticket" });
  }
});

// GET route with try/catch..
app.get("/api/tickets", async (req, res) => {
  try {
    const tickets = await Ticket.find();
    res.json(tickets);
  } catch (err) {
    console.error("❌ Error fetching tickets:", err);
    res.status(500).json({ error: "Server error while fetching tickets" });
  }
});

// Start server.........
app.listen(5000, () => console.log("🚀 Server running on port 5000"));
