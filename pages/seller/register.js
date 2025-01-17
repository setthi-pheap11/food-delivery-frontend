import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function SellerRegister() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('/api/seller/register', formData);
      alert('Registration successful! Please login.');
      router.push('/seller/login');
    } catch (error) {
      setError(error.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-400 to-green-600 py-12">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold text-white">Become a Seller</h1>
          <p className="text-white mt-2">Join us to start selling your products today!</p>
        </div>
      </section>

      {/* Registration Form */}
      <section className="p-6 container mx-auto">
        <form
          onSubmit={handleSubmit}
          className="max-w-lg mx-auto bg-white shadow-xl p-8 rounded-lg space-y-6"
        >
          <h2 className="text-3xl font-semibold text-center text-gray-700">Register</h2>

          {error && (
            <div className="bg-red-100 text-red-700 px-4 py-2 rounded-md text-center">
              {error}
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="First Name"
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500"
              required
            />
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Last Name"
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email Address"
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500"
            required
          />

          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder="Telegram Phone Number"
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500"
            required
          />

          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500"
            required
          />

          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Password"
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-300"
          >
            {loading ? 'Registering...' : 'Register'}
          </button>

          <button
            type="button"
            onClick={() => router.push('/seller/login')}
            className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
          >
            Already have an account? Login
          </button>
        </form>
      </section>

      <Footer />
    </div>
  );
}
