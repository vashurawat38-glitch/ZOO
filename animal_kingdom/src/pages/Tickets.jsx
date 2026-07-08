import React, { useState } from "react";

function Tickets() {
  const [formData, setFormData] = useState({ name: "", email: "", date: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = (e) => { e.preventDefault(); setSubmitted(true); };

  return (
    <section id="tickets" className="p-12 bg-gray-50 min-h-screen flex flex-col items-center justify-center">
      <h2 className="text-4xl font-bold mb-8">Book Your Tickets 🎫</h2>
      {!submitted ? (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-md w-full bg-white shadow-lg p-6 rounded-lg">
          <input type="text" name="name" placeholder="Your Name" onChange={handleChange} className="w-full p-3 border rounded" required />
          <input type="email" name="email" placeholder="Your Email" onChange={handleChange} className="w-full p-3 border rounded" required />
          <input type="date" name="date" onChange={handleChange} className="w-full p-3 border rounded" required />
          <button type="submit" className="bg-[#2FA084] text-white px-4 py-2 rounded w-full hover:bg-[#1F6F5F] transition">Book Now</button>
        </form>
      ) : (
        <p className="text-green-700 font-semibold text-center bg-[#1F6F5F] p-4 rounded-lg shadow">
          Thank you {formData.name}! Your booking is confirmed for {formData.date}.
        </p>
      )}
    </section>
  );
}

export default Tickets;
