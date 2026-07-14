import React from "react";

function Navbar() {
  return (
    <nav className="bg-[#1F6F5F] text-white p-4 sticky top-0 shadow-md z-50">
  <div className="flex flex-col items-center gap-3 max-w-6xl mx-auto">
    {/* Heading */}
    <h1 className="text-2xl font-bold">Animal Kingdom</h1>
    
    {/* Links */}
    <div className="flex gap-4 text-sm">
      <a href="#home" className="hover:text-yellow-300">Home</a>
      <a href="#animals" className="hover:text-yellow-300">Animals</a>
      <a href="#tickets" className="hover:text-yellow-300">Tickets</a>
      <a href="#contact" className="hover:text-yellow-300">Contact</a>
    </div>
  </div>
</nav>
  );
}

export default Navbar;
