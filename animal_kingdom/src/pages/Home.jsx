import React from "react";

function Home() {
  return (
    <section 
      id="home" 
      className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-green-100 to-green-200 text-center p-8"
    >
      <h2 className="text-5xl font-extrabold mb-6">Welcome to Our Zoo 🦁</h2>
      <p className="text-lg text-gray-700 max-w-2xl leading-relaxed">
       Ready to meet some amazing animals? From majestic big cats to exotic birds, our zoo is the pefect spot for a fun day out with friends and family.
       Skip the long lines at the entry gate by booking your tickets online right here. Take a look around, find your favourite animals, and plan your weekend adventure today!
      </p>
    </section>
  );
}

export default Home;
