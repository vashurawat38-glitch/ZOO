import React from "react";

function Testimonials() {
  const reviews = [
    { name: "Amit", text: "One of the best-managed zoos i have visited in Asia." },
    { name: "Shrishti", text: "Loved the overall management. The zoo is clean and informative." },
    { name: "Rahul", text: "Great place for kids to learn about wildlife. Highly recommend visiting!" },
  ];

  return (
    <section id="testimonials" className="p-12 bg-white">
      <h2 className="text-4xl font-bold mb-8 text-center">What Visitors Say 💭</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {reviews.map((review, index) => (
          <div key={index} className="bg-gray-100 p-6 rounded-lg shadow hover:shadow-lg transition">
            <p className="text-[#2FA084] italic">"{review.text}"</p>
            <h4 className="mt-4 font-semibold text-[#1F6F5F]">- {review.name}</h4>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Testimonials;
