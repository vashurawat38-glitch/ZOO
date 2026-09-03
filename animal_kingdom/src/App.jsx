import React, { useState, useEffect } from "react";
import Login from "./pages/Login";

// Aapke saare pages import karein:
import Home from "./pages/Home";       // Agar Home.jsx src me hai toh "./Home" karein
import Animals from "./pages/Animals"; // Agar Animals.jsx src me hai toh "./Animals" karein
import Tickets from "./pages/Tickets";

export default function App() {
  const [user, setUser] = useState(null);

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

  // Agar user logged in nahi hai -> Login Screen
  if (!user) {
    return <Login onLoginSuccess={(userData) => setUser(userData)} />;
  }

  // Logged in user ke liye Main Website
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Header Bar */}
      <div className="bg-emerald-900 text-white px-6 py-3 flex justify-between items-center text-sm shadow-md sticky top-0 z-50">
        <span className="font-medium">
          Welcome, <strong className="text-emerald-300">{user.name || user.email}</strong>! 🦁
        </span>
        <button 
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded-xl text-xs font-bold transition-all shadow"
        >
          Logout
        </button>
      </div>

      {/* Main Website Components */}
      <main>
        <Home />
        <Animals />
        <Tickets />
      </main>
    </div>
  );
}