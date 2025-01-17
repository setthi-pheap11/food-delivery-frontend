import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function ItemDetail() {
  const router = useRouter();
  const { id } = router.query;  // Get the item ID from the URL

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch item data when the component mounts
  useEffect(() => {
    if (id) {
      const fetchItem = async () => {
        try {
          const response = await axios.get(`/api/items/${id}`);  // Fetch item from API
          setItem(response.data);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching item:', error);
          setLoading(false);
        }
      };

      fetchItem();
    }
  }, [id]);

  // Show loading state
  if (loading) {
    return <p className="text-center py-20 text-gray-500">Loading item details...</p>;
  }

  // Show error if item is not found
  if (!item) {
    return <p className="text-center py-20 text-red-500">Item not found.</p>;
  }

  return (
    <div>
      <Header />

      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center h-96"
        style={{ backgroundImage: `url(${item.image})` }}
      >
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center">
          <h1 className="text-5xl font-extrabold">{item.title}</h1>
          <p className="text-2xl mt-4 text-green-400 font-semibold">${parseFloat(item.price).toFixed(2)}</p>
        </div>
      </section>

      {/* Details Section */}
      <section className="container mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Image */}
        <div className="flex justify-center">
          <img
            src={item.image}
            alt={item.title}
            className="rounded-xl shadow-lg w-full max-w-lg object-cover"
          />
        </div>

        {/* Item Information */}
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">{item.title}</h2>
          <p className="text-lg text-gray-600 mb-6">
            Indulge in our delicious {item.title}! Made with the finest ingredients to satisfy your cravings.
          </p>

          <p className="text-2xl text-green-600 font-semibold mb-6">${parseFloat(item.price).toFixed(2)}</p>

          {/* Order Now Button */}
          <button
            onClick={() => router.push(`/order-details?itemId=${item.id}`)}
            className="w-full px-6 py-3 bg-green-500 text-white rounded-lg text-lg font-semibold hover:bg-green-600 transition-all"
          >
            🛒 Order Now
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
