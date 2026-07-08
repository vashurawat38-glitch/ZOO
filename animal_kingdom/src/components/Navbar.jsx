import React from "react";

function Navbar() {
  return (
    <nav className="bg-[#1F6F5F] text-white p-4 sticky top-0 shadow-md z-50">
      <div className="flex justify-between items-center max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold">Animal Kingdom</h1>
        <div className="flex space-x-8 text-lg">
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
