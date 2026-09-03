import React, { useState, useEffect } from "react";

// Top Imports (Saare Pages aur Components)
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Animals from "./pages/Animals";
import Map from "./pages/Map";
import Stats from "./pages/Stats";
import Testimonials from "./pages/Testimonials";
import FAQ from "./pages/FAQ";
import Price from "./pages/Price";
import Tickets from "./pages/Tickets";
import Contact from "./pages/Contact";
import Footer from "./pages/Footer";
import Login from "./pages/Login";

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

  // Agar User Login nahi hai toh Login Page dikhayega
  if (!user) {
    return <Login onLoginSuccess={(userData) => setUser(userData)} />;
  }

  // Login hone ke baad Main Website
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Welcome Bar */}
      <div className="bg-emerald-900 text-white px-6 py-2 flex justify-between items-center text-sm shadow-md sticky top-0 z-50">
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

      {/* Navbar Component */}
      <Navbar />

      {/* Main Website Sections */}
      <main>
        <Home />
        <Animals />
         <Map />
        <Stats />
        <FAQ />
        <Testimonials />
        <Price />
        <Tickets />
        <Contact />
        <Footer />
      </main>
    </div>
  );
}