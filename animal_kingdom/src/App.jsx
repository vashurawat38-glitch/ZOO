import React, { useState, useEffect } from "react";
import Login from "./pages/Login";
// Apne baaki components import rakhein (Home, Animals, Tickets, etc.)

export default function App() {
  const [user, setUser] = useState(null);

  // Check karein agar user pehle se logged in hai
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  // AGAR USER LOGGED IN NAHI HAI -> PEHLE LOGIN PAGE DIKHAYEGA
  if (!user) {
    return <Login onLoginSuccess={(userData) => setUser(userData)} />;
  }

  // LOGGED IN HO GAYA -> MAIN WEBSITE DIKHAYEGA
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar with Logout Button */}
      <div className="bg-emerald-900 text-white px-6 py-2 flex justify-between items-center text-sm">
        <span>Welcome, <strong>{user.name || user.email}</strong>! 🦁</span>
        <button 
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-xs font-semibold transition-all"
        >
          Logout
        </button>
      </div>

      {/* Yahan Aapka Existing Main Content / Navbar / Routes aayenge */}
      {/* Example: <Navbar />, <Home />, <Tickets /> */}
    </div>
  );
}