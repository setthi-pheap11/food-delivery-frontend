import { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function SellerDashboard() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const seller = JSON.parse(localStorage.getItem('seller'));
      if (!seller) {
        alert('Please log in as a seller first.');
        window.location.href = '/seller/login';
        return;
      }

      // ✅ Fetch all items
      const response = await axios.get('/api/items/items');
      
      // ✅ Filter items belonging to the logged-in seller
      const sellerItems = response.data.filter(item => item.seller_id === seller.id);
      setItems(sellerItems);
    } catch (error) {
      console.error('Error fetching items:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this item?')) return;

    try {
      // ✅ Delete item by ID
      await axios.delete(`/api/items/${id}`);
      alert('Item deleted successfully!');
      fetchItems();  // Refresh after deletion
    } catch (error) {
      console.error('Error deleting item:', error);
      alert('Failed to delete item.');
    }
  };

  return (
    <div>
      <Header />
      <section className="text-center py-10 bg-gray-100">
        <h1 className="text-4xl font-bold">Seller Dashboard</h1>
        <p className="text-gray-600">Manage your items here.</p>
      </section>

      <div className="text-center my-6">
        <button
          onClick={() => window.location.href = '/seller/add-item'}
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
        >
          ➕ Add New Item
        </button>
      </div>

      <main className="p-6 container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {loading ? (
          <p>Loading...</p>
        ) : items.length > 0 ? (
          items.map((item) => (
            <div key={item.id} className="border rounded-lg overflow-hidden shadow-lg p-4">
              <img src={item.image} alt={item.title} className="w-full h-40 object-cover" />
              <h2 className="text-xl font-semibold mt-2">{item.title}</h2>
              <p className="text-green-600 font-bold">${parseFloat(item.price).toFixed(2)}</p>
              <button
                onClick={() => handleDelete(item.id)}
                className="mt-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 w-full"
              >
                🗑️ Delete
              </button>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-600">
            You haven't added any items yet.
          </p>
        )}
      </main>

      <Footer />
    </div>
  );
}
