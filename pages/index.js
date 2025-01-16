import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FoodCard from '../components/FoodCard';
import Hero from '../components/Hero';

export default function Home() {
  // State to handle the search term
  const [searchTerm, setSearchTerm] = useState('');

  // Food items data
  const foods = [
    { title: 'Burger', image: '/images/hambuger.png', price: 5.99 },
    { title: 'Pizza', image: '/images/pizza.png', price: 8.99 },
    { title: 'Sushi', image: '/images/sushi.png', price: 12.99 },
    { title: 'Pizza', image: '/images/pizza.png', price: 8.99 },
    { title: 'Sushi', image: '/images/sushi.png', price: 12.99 },
    { title: 'Burger', image: '/images/hambuger.png', price: 5.99 },
    { title: 'Pizza', image: '/images/pizza.png', price: 8.99 },
    { title: 'Sushi', image: '/images/sushi.png', price: 12.99 },

    
    
  ];

  // Filter the food items based on the search term
  const filteredFoods = foods.filter((food) =>
    food.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Header />
      {/* Pass searchTerm and setSearchTerm to Hero for search input */}
      <Hero searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <main className="p-6 container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredFoods.length > 0 ? (
          filteredFoods.map((food, index) => (
            <FoodCard key={index} {...food} />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-600">
            No food items match your search.
          </p>
        )}
      </main>
      <Footer />
    </div>
  );
}
