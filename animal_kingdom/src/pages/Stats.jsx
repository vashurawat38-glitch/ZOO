function Stats() {
  const stats = [
    { label: "Animals", value: "120+" },
    { label: "Species", value: "50+" },
    { label: "Visitors per year", value: "1M+" },
  ];

  return (
    <section id="stats" className="p-4 md:p-12 bg-green-100 text-center">
      <h2 className="text-3xl font-bold mb-8">Zoo Highlights 📊</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md w-full">
            <h3 className="text-2xl font-bold text-emerald-700">{stat.value}</h3>
            <p className="text- sm text-gray-600 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Stats;
