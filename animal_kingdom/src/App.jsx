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
  const[ticketCount, setTicketCount] = useState(0);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        setUser(savedUser);
      }
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
      {/* Navbar Component ko props pass karein */}
      <Navbar user={user} handleLogout={handleLogout} ticketCount={ticketCount} />

      {/* Main Website Sections */}
      <main>
        <Home />
        <Animals />
        <Map />
        <Stats />
        <FAQ />
        <Testimonials />
        <Price />
        <Tickets setTicketCount={setTicketCount} />
        <Contact />
        <Footer />
      </main>
    </div>
  );
}