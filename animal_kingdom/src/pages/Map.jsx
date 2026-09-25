import React from "react";

function Map() {
  return (
    <section id="map" className="p-12 bg-gray-50 flex flex-col items-center">
      <h2 className="text-4xl font-bold mb-8">Explore Our Zoo Map 📍</h2>
      
      {/* Zoo Layout Image */}
      <div className="w-full max-w-4xl overflow-hidden rounded-lg shadow-lg">
        <img 
          src="/zoomap.jpg"  
          alt="Zoo Map" 
          className="w-full h-auto object-contain"
        />
      </div>

      {/* Dummy Google Map */}
      <div className="mt-8 w-full max-w-4xl">
        <iframe
  title="Chhatbir Zoo Chandigarh"
  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3434.6067055006616!2d76.79093847629559!3d30.5886618746571!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390fbf493bffffff%3A0xcb1b5907484dfbc!2sM.C.%20Zoological%20Park%20%2F%20Chhat%20Bir%20Zoo%2C%20Zirakpur!5e0!3m2!1sen!2sin!4v1719900000000!5m2!1sen!2sin"
  width="100%"
  height="450"
  style={{ border: 0 }}
  allowFullScreen=""
  loading="lazy"
  referrerPolicy="no-referrer-when-downgrade"
></iframe>
      </div>
    </section>
  );
}

export default Map;
