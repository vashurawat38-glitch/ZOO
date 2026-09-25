import React, { useState, useEffect } from "react";

function Home() {
  const slides = [
    {
      image: "https://images.unsplash.com/photo-1534567153574-2b12153a87f0?q=80&w=1600",
      title: "Welcome to Our Zoo",
      subtitle:
        "Ready to meet some amazing animals? From majestic big cats to exotic birds, our zoo is the perfect spot for a fun day out with friends and family.",
    },
    {
      image:"https://images.unsplash.com/photo-1614027164847-1b28cfe1df60?q=80&w=1600",
      title: "Discover Amazing Wild Animals",
      subtitle:
        "Skip the long lines at the entry gate by booking your tickets online right here.",
    },
    {
      image: "https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?q=80&w=1600",
      title: "Plan Your Weekend Adventure",
      subtitle:
        "Take a look around, find your favourite animals, and plan your perfect visit today!",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 4000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  return (
    <section id="home" className="relative w-full h-[70vh] sm:h-[85vh] overflow-hidden bg-gray-950">
      {/* Background Image Container with fixed positioning */}
      <div className="absolute inset-0 w-full h-full flex items-center justify-center">
        <img
          src={slides[currentIndex].image}
          alt={slides[currentIndex].title}
          className="w-full h-full object-cover object-[center_20%] transition-all duration-700 ease-in-out"
        />
      </div>

      {/* Dark Overlay for better readability */}
      <div className="absolute inset-0 bg-black/45"></div>

      {/* Hero Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 max-w-4xl mx-auto text-white">
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-black mb-3 drop-shadow-lg">
          {slides[currentIndex].title}
        </h2>
        <p className="text-sm sm:text-lg md:text-xl text-gray-100 leading-relaxed max-w-2xl drop-shadow">
          {slides[currentIndex].subtitle}
        </p>
      </div>

      {/* Navigation Controls (Arrows & Dots) */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 sm:gap-3 bg-black/50 backdrop-blur-md px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl border border-white/20">
        <button
          onClick={handlePrev}
          type="button"
          className="p-1 sm:p-2 border border-white/50 rounded-lg text-white hover:bg-white/20 transition cursor-pointer text-xs sm:text-sm"
        >
          ❮
        </button>

        <div className="flex gap-1.5 sm:gap-2 mx-1 sm:mx-2">
          {slides.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setCurrentIndex(index)}
              className={`h-2 sm:h-2.5 rounded-full transition-all duration-300 ${
                currentIndex === index
                  ? "bg-emerald-400 w-5 sm:w-6"
                  : "bg-white/50 hover:bg-white w-2 sm:w-2.5"
              }`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          type="button"
          className="p-1 sm:p-2 border border-white/50 rounded-lg text-white hover:bg-white/20 transition cursor-pointer text-xs sm:text-sm"
        >
          ❯
        </button>
      </div>
    </section>
  );
}

export default Home;