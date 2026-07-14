import React from "react";

const animals = [
  { name:"Lion", species: "Panthera leo", img: "/lion.jpg", description: "Lions are known as kings of the jungle, but they live more like a team. Lionesses usually hunt while the males guard the pride. A lion’s roar can travel up to 8 kilometers, almost like nature’s loudspeaker." },
  { name:"Elephant", species: "Elephas maximus", img: "/elephant.jpg", description: "Elephants are the largest land animals. They are herbivores and known for their intelligence and memory. They live in herds led by a matriarch." },
  { name:"Zebra", species: "Equus quagga", img: "/zebra.jpg", description: "Every zebra has a unique stripe pattern, just like human fingerprints. These stripes are not only beautiful but also help confuse insects and predators. If zebras had ID cards, their stripes would be the signature." },
  { name: "Giraffe", species: "Giraffa camelopardalis", img: "/giraffe.jpg", description: "Giraffes are the tallest land animals, with necks that can reach up to 6 feet long. Interestingly, their necks have the same number of bones as humans — seven — but each bone is much larger." },
  { name:"Panda", species: "Ailuropoda melanoleuca", img: "/panda.jpg", description: "Pandas spend most of their day eating bamboo, even though their stomach is not really built to digest it well. They often roll around lazily, making them look calm but playful. Each panda has its own way of enjoying food, sometimes lying flat while chewing." },
  { name: "Deer", species: " Cervidae", img: "/deer.jpg", description: "The deer is a graceful herbivore found in forests and grasslands across the world. Known for its antlers and agility, deer are gentle animals that play an important role in the ecosystem by maintaining plant balance. They are social creatures and often live in herds."},
]; 

function Animals() {
  return (
    <section id="animals" className="p-4 md:p-12 bg-white">
      <h2 className="text-4xl font-bold mb-10 text-center">Our Animals</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {animals.map((animal, index) => (
          <div key={index} className="border rounded-lg shadow-lg p-6 text-center hover:shadow-2xl transition">
            <img 
              src={animal.img} 
              alt={animal.name} 
              className="w-full h-auto max-h-80 object-contain rounded mb-4 transform hover:scale-105 transition"
            />
            <h3 className="text-2xl font-semibold">{animal.name}</h3>
            <p className="text-gray-600 italic">{animal.species}</p>
            <p className="text-gray-700 mt-3 text-sm leading-relaxed text-justify">{animal.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Animals;
