import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FoodCard from '../components/FoodCard';

export default function Menu() {
  const [menuItems, setMenuItems] = useState([]);

  // ✅ Fetch items from the backend API
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get('/api/items/items');
        setMenuItems(response.data);
      } catch (error) {
        console.error('Error fetching menu items:', error);
      }
    };

    fetchItems();
  }, []);

  return (
    <div>
      <Header />
      <section className="text-center py-10 bg-gray-100">
        <h1 className="text-4xl font-bold">Our Menu</h1>
        <p className="text-gray-600">Choose from our delicious range of dishes!</p>
      </section>

      <main className="p-6 container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {menuItems.length > 0 ? (
          menuItems.map((item, index) => (
            <FoodCard key={index} {...item} />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-600">No items available.</p>
        )}
      </main>

      <Footer />
    </div>
  );
}
