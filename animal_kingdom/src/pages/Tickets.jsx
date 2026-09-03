import React, { useState, useEffect } from "react";

function Tickets() {
  const [formData, setFormData] = useState({ name: "", email: "", date: "" });
  const [response, setResponse] = useState("");
  const [tickets, setTickets] = useState([]);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("https://zoo-qnls.onrender.com/api/tickets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Server error while booking ticket");

      const data = await res.json();
      setResponse(data.message || "Ticket booked successfully!");
      setError("");
      fetchTickets(); // refresh list
    } catch (err) {
      console.error("Error booking ticket:", err);
      setResponse("");
      setError("❌ Failed to book ticket. Please try again.");
    }
  };

  const fetchTickets = async () => {
    try {
      const res = await fetch("https://zoo-qnls.onrender.com/api/tickets");
      if (!res.ok) throw new Error("Server error while fetching tickets");

      const data = await res.json();
      if (Array.isArray(data)) {
        setTickets(data);
        setError("");
      } else {
        setTickets([]);
        setError("❌ Invalid data format from server");
      }
    } catch (err) {
      console.error("Error fetching tickets:", err);
      setTickets([]);
      setError("❌ Failed to load tickets. Please check backend.");
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  return (
    <section id="tickets" className="p-12 bg-gray-50 min-h-screen flex flex-col items-center">
      <h2 className="text-4xl font-bold mb-8">Book Your Tickets 🎟️</h2>

      {error && <p className="text-red-600 font-semibold">{error}</p>}
      {response && <p className="text-green-700 font-semibold">{response}</p>}

      {!response && (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-md w-full">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            onChange={handleChange}
            className="w-full p-3 border rounded"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            onChange={handleChange}
            className="w-full p-3 border rounded"
            required
          />
          <input
            type="date"
            name="date"
            onChange={handleChange}
            className="w-full p-3 border rounded"
            required
          />
          <button
            type="submit"
            className="bg-[#1F6F5F] text-white px-4 py-2 rounded w-full"
          >
            Book Now
          </button>
        </form>
      )}

    </section>
  );
}

export default Tickets;
