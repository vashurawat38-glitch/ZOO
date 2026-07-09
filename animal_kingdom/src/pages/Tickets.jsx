import React, { useState, useEffect } from "react";

function Tickets() {
  const [formData, setFormData] = useState({ name: "", email: "", date: "" });
  const [response, setResponse] = useState("");
  const [tickets, setTickets] = useState([]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/api/tickets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    setResponse(data.message);
    fetchTickets(); // refreshhh after booking........
  };

  const fetchTickets = async () => {
    const res = await fetch("http://localhost:5000/api/tickets");
    const data = await res.json();
    setTickets(data);
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  return (
    <section id="tickets" className="p-12 bg-gray-50 min-h-screen flex flex-col items-center">
      <h2 className="text-4xl font-bold mb-8">Book Your Tickets 🎟️</h2>

      {!response ? (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-md w-full">
          <input type="text" name="name" placeholder="Your Name" onChange={handleChange} className="w-full p-3 border rounded" required />
          <input type="email" name="email" placeholder="Your Email" onChange={handleChange} className="w-full p-3 border rounded" required />
          <input type="date" name="date" onChange={handleChange} className="w-full p-3 border rounded" required />
          <button type="submit" className="bg-[#1F6F5F] text-white px-4 py-2 rounded w-full">Book Now</button>
        </form>
      ) : (
        <p className="text-[#2FA084] font-semibold">{response}</p>
      )}

    </section>
  );
}

export default Tickets;
