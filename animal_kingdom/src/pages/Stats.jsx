function Stats() {
  const stats = [
    { label: "Animals", value: "120+" },
    { label: "Species", value: "50+" },
    { label: "Visitors per year", value: "1M+" },
  ];

  return (
    <section id="stats" className="p-12 bg-green-100 text-center">
      <h2 className="text-4xl font-bold mb-8">Zoo Highlights 📊</h2>
      <div className="flex justify-center space-x-12">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow w-40">
            <h3 className="text-2xl font-bold text-[#2FA084]">{stat.value}</h3>
            <p className="text-gray-600">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Stats;
