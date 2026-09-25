import React, { useState, useEffect } from "react";

// Top Imports
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

// Junior Zoo Ranger Imports
import JuniorRangerBanner from "./components/JuniorRangerBanner";
import JuniorZooRangerPage from "./pages/JuniorZooRangerPage";

// Chatbot Imports
import ChatButton from "./components/ChatButton";
import ChatWindow from "./components/ChatWindow";

export default function App() {
  const [user, setUser] = useState(null);
  const [ticketCount, setTicketCount] = useState(0);
  const [open, setOpen] = useState(false);
  
  // ✅ View switcher state
  const [currentView, setCurrentView] = useState("main");

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

  if (!user) {
    return <Login onLoginSuccess={(userData) => setUser(userData)} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 relative overflow-x-clip">
      {/* Header */}
      <header className="relative z-50">
        <Navbar user={user} handleLogout={handleLogout} ticketCount={ticketCount} />
      </header>

      {/* Dynamic View Switcher */}
      {currentView === "junior-ranger" ? (
        <main className="relative z-10">
          {/* Dedicated Junior Ranger Registration Page */}
          <JuniorZooRangerPage onBack={() => setCurrentView("main")} />
        </main>
      ) : (
        /* Main Home Scroll Page */
        <main className="relative z-10">
          <Home />
          <Stats />
          <Animals />
          {/* Junior Ranger Banner */}
          <JuniorRangerBanner onExplore={() => setCurrentView("junior-ranger")} />
          <Price />
          <Tickets setTicketCount={setTicketCount} />
          <Map />
          <Testimonials />
          <FAQ />
          <Contact />
          <Footer />
        </main>
      )}

      {/* Chat Popup */}
      {open && <ChatWindow onClose={() => setOpen(false)} />}
      <ChatButton onClick={() => setOpen(true)} />
    </div>
  );
}