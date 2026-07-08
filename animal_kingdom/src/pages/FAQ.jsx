function FAQ() {
  const faqs = [
    { q: "What are the zoo timings?", a: "Our zoo is open daily from 9 AM to 6 PM." },
    { q: "Do you offer group discounts?", a: "Yes, we provide discounts for school trips and groups of 10+ visitors." },
    { q: "Is outside food allowed?", a: "Outside food is not allowed, but we have a cafeteria inside." },
  ];

  return (
    <section id="faq" className="p-12 bg-gray-50">
      <h2 className="text-4xl font-bold mb-8 text-center">Frequently Asked Questions ❓</h2>
      <div className="max-w-4xl mx-auto space-y-6">
        {faqs.map((item, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="font-semibold text-green-700">{item.q}</h3>
            <p className="text-gray-700 mt-2">{item.a}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default FAQ;
