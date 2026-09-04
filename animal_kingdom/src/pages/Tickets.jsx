import React, { useState, useEffect } from "react";

function Tickets({ setTicketCount }) {
  const [formData, setFormData] = useState({ 
    name: "", 
    email: "", 
    date: "", 
    adults: 0, 
    children: 0, 
    seniors: 0, 
    paymentMethod: "UPI" 
  });
  
  const [step, setStep] = useState("form"); // 'form' ya 'payment'
  const [response, setResponse] = useState("");
  const [tickets, setTickets] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Total Price calculation
  const totalPrice = (Number(formData.adults) * 150) + (Number(formData.children) * 50) + (Number(formData.seniors) * 100);

  const handleProceedToPay = (e) => {
    e.preventDefault();
    if (totalPrice <= 0) {
      setError("❌ Please select at least one ticket.");
      return;
    }
    setError("");
    setStep("payment"); // Form se payment QR screen par switch karega
  };

  const handleConfirmPayment = async () => {
    setLoading(true);
    try {
      const payload = {
        ...formData,
        totalPrice,
        paymentStatus: "Paid"
      };

      const res = await fetch("https://zoo-qnls.onrender.com/api/tickets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Server error while booking ticket");

      const data = await res.json();
      setResponse(data.message || "Ticket booked successfully with UPI payment!");
      
      const totalTickets = Number(formData.adults) + Number(formData.children) + Number(formData.seniors);
      setTicketCount(prev => prev + totalTickets);
      setError("");
      fetchTickets(); // Refresh list
    } catch (err) {
      console.error("Error booking ticket:", err);
      setError("❌ Failed to book ticket. Please try again.");
      setStep("form");
    } finally {
      setLoading(false);
    }
  };

  const fetchTickets = async () => {
    try {
      const res = await fetch("https://zoo-qnls.onrender.com/api/tickets");
      if (!res.ok) throw new Error("Server error while fetching tickets");

      const data = await res.json();
      if (Array.isArray(data)) {
        setTickets(data);
      } else {
        setTickets([]);
      }
    } catch (err) {
      console.error("Error fetching tickets:", err);
      setTickets([]);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  return (
    <section id="tickets" className="p-6 md:p-12 bg-gray-50 min-h-screen">
      <h2 className="text-4xl font-bold mb-8 text-center">Book Your Tickets</h2>

      {error && <p className="text-red-600 font-semibold mb-4 text-center">{error}</p>}
      {response && <p className="text-green-700 font-semibold mb-4 text-center text-lg">{response}</p>}

      {/* Step 1: Ticket Details Form */}
      {!response && step === "form" && (
        <form onSubmit={handleProceedToPay} className="max-w-xl mx-auto space-y-4 bg-white p-6 rounded-lg shadow-md">
          <input
            type="text"
            name="name"
            value={formData.name}
            placeholder="Your Name"
            onChange={handleChange}
            className="w-full p-3 border rounded"
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            placeholder="Your Email"
            onChange={handleChange}
            className="w-full p-3 border rounded"
            required
          />
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full p-3 border rounded"
            required
          />

          {/* Adults Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Adults (12+ years) - ₹150</label>
            <input
              type="number"
              name="adults"
              min="0"
              value={formData.adults}
              onChange={handleChange}
              className="w-full p-3 border rounded"
            />
          </div>

          {/* Children Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Children (5-12 years) - ₹50</label>
            <input
              type="number"
              name="children"
              min="0"
              value={formData.children}
              onChange={handleChange}
              className="w-full p-3 border rounded"
            />
          </div>

          {/* Senior Citizens Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Senior Citizens - ₹100</label>
            <input
              type="number"
              name="seniors"
              min="0"
              value={formData.seniors}
              onChange={handleChange}
              className="w-full p-3 border rounded"
            />
          </div>

          {/* Dynamic Total Price Display */}
          <div className="text-lg font-bold text-emerald-700 text-center">
            Total Price: ₹{totalPrice}
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-700 hover:bg-[#105544] text-white p-3 rounded font-semibold transition"
          >
            Proceed to Payment (UPI)
          </button>
        </form>
      )}

      {/* Step 2: UPI QR Code & Payment Confirmation Screen */}
      {!response && step === "payment" && (
        <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md text-center space-y-4">
          <h3 className="text-2xl font-bold text-gray-800">Scan & Pay via UPI</h3>
          <p className="text-gray-600 text-sm">Scan this QR code using GPay, PhonePe, or Paytm on your phone</p>
          
          <div className="p-4 border rounded bg-gray-50 inline-block">
            <img 
              src="/QR.jpeg"
              alt="UPI QR Code" 
              className="mx-auto w-40 h-40 object-contain"
            />
          </div>

          <div className="text-xl font-bold text-emerald-700">
            Amount to Pay: ₹{totalPrice}
          </div>

          <div className="flex space-x-4 pt-2">
            <button
              type="button"
              onClick={() => setStep("form")}
              className="w-1/2 bg-gray-200 hover:bg-gray-300 text-gray-800 p-3 rounded font-semibold transition"
            >
              Back
            </button>
            <button
              type="button"
              onClick={handleConfirmPayment}
              disabled={loading}
              className="w-1/2 bg-emerald-700 hover:bg-[#105544] text-white p-3 rounded font-semibold transition"
            >
              {loading ? "Processing..." : "I Have Paid, Book Now"}
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

export default Tickets;