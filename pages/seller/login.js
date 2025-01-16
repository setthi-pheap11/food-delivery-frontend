import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function SellerLogin() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('/api/seller/login', { email, password });
    //   alert('Login successful!');
      localStorage.setItem('seller', JSON.stringify(response.data.seller));
      router.push('/seller/dashboard');
    } catch (error) {
      alert(error.response?.data?.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Header />
      <section className="bg-gradient-to-r from-blue-400 to-blue-600 py-12">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold text-white">Seller Login</h1>
          <p className="text-white mt-2">Access your dashboard and manage your products.</p>
        </div>
      </section>

      <section className="p-6 container mx-auto">
        <form onSubmit={handleLogin} className="max-w-lg mx-auto bg-white shadow-lg p-8 rounded-lg space-y-6">
          <h2 className="text-2xl font-semibold text-center text-gray-700">Welcome Back!</h2>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            required
          />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>

          <button
            type="button"
            onClick={() => router.push('/seller/register')}
            className="w-full px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition duration-300"
          >
            New Seller? Register Here
          </button>
        </form>
      </section>
      <Footer />
    </div>
  );
}
