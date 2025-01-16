import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function AddItem() {
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [imageFile, setImageFile] = useState(null);  // Handle file input
  const [imageURL, setImageURL] = useState('');     // Store uploaded image URL
  const [seller, setSeller] = useState(null);

  // Load seller data from localStorage
  useEffect(() => {
    const savedSeller = JSON.parse(localStorage.getItem('seller'));
    if (!savedSeller) {
      // alert('Please log in as a seller first!');
      router.push('/seller/register');
    } else {
      setSeller(savedSeller);
    }
  }, []);

  // Handle image upload to the server
  const handleImageUpload = async (file) => {
    const formData = new FormData();
    formData.append('file', file);  // ✅ Ensure the 'file' key is used
  
    try {
      const response = await axios.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      setImageURL(response.data.imageUrl);  // ✅ Save the uploaded image URL
      // alert('Image uploaded successfully!');
    } catch (error) {
      console.error('Image upload failed:', error);
      alert('Failed to upload image.');
    }
  };
  
  
  

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !price || !imageURL) {
      // alert('Please fill in all fields and upload an image!');
      return;
    }

    try {
      await axios.post('/api/items/items', {
        title,
        price: parseFloat(price),
        image: imageURL,  // Use the uploaded image URL
        sellerId: seller.id,
      });

      // alert('Item added successfully!');
      router.push('/seller/dashboard');
    } catch (error) {
      console.error('Error adding item:', error);
      alert('Failed to add item. Please try again.');
    }
  };

  return (
    <div>
      <Header />
      <section className="text-center py-10 bg-gray-100">
        <h1 className="text-4xl font-bold">Add New Item</h1>
      </section>

      <section className="p-6 container mx-auto">
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-4">
          {/* Item Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Item Name</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Price ($)</label>
            <input
              type="number"
              step="0.01"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Upload Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                setImageFile(e.target.files[0]);
                handleImageUpload(e.target.files[0]);
              }}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {imageURL && (
              <img
                src={imageURL}
                alt="Preview"
                className="mt-4 w-32 h-32 object-cover rounded-md"
              />
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            Add Item
          </button>
        </form>
      </section>
      <Footer />
    </div>
  );
}
