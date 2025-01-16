import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Contact() {
  return (
    <div>
      <Header />
      <section className="text-center py-10 bg-gray-100">
        <h1 className="text-4xl font-bold">Contact Us</h1>
        <p className="text-gray-600">We would love to hear from you!</p>
      </section>
      <section className="p-6 container mx-auto">
        <form className="max-w-lg mx-auto space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Your Name"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Your Email"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Message</label>
            <textarea
              rows="4"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Your Message"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            Send Message
          </button>
        </form>
      </section>
      <Footer />
    </div>
  );
}
