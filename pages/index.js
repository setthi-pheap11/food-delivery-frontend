import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FoodCard from '../components/FoodCard';
import Hero from '../components/Hero';

export default function Home() {
  // State to handle the search term
  const [searchTerm, setSearchTerm] = useState('');

  // State to store the food items from the API
  const [foods, setFoods] = useState([]);

  // Fetch food items from the API on component mount
  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get('/api/items/items');  // Fetch from API
      setFoods(response.data);  // Update state with fetched items
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  // Filter the food items based on the search term
  const filteredFoods = foods.filter((food) =>
    food.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Header />
      {/* Pass searchTerm and setSearchTerm to Hero for search input */}
      <Hero searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      
      {/* Display Food Items */}
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
