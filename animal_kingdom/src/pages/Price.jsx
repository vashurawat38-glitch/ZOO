import React from 'react';

function Price() {
  return (
    <section id="Prices" className="py-12 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Ticket Pricing</h2>
        
        <div className="overflow-x-auto">
          <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-[#1F6F5F] text-white">
              <tr>
                <th className="p-4 text-left">Visitor Type</th>
                <th className="p-4 text-center">Price (INR)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="p-4">Adults (12+ years)</td>
                <td className="p-4 text-center">₹150</td>
              </tr>
              <tr>
                <td className="p-4">Children (5-12 years)</td>
                <td className="p-4 text-center">₹50</td>
              </tr>
              <tr>
                <td className="p-4">Senior Citizens</td>
                <td className="p-4 text-center">₹100</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export default Price;