import { useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Contact() {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !phoneNumber || !message) {
      alert('Please fill in all fields.');
      return;
    }

    const TELEGRAM_BOT_TOKEN = '7389940873:AAFNTbX8q9cZb4uMq6c34HlloqI8ZoFlAzc';
    const TELEGRAM_CHAT_ID = '721177574';

    const telegramMessage = `📩 *New Contact Message!*\n\n👤 *Name:* ${name}\n📞 *Telegram Phone:* ${phoneNumber}\n📝 *Message:* ${message}`;

    try {
      await axios.post(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        chat_id: TELEGRAM_CHAT_ID,
        text: telegramMessage,
        parse_mode: 'Markdown',
      });

      alert('Your message has been sent to us on Telegram!');
      // Reset the form after submission
      setName('');
      setPhoneNumber('');
      setMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send the message. Please try again.');
    }
  };

  return (
    <div>
      <Header />
      <section className="text-center py-10 bg-gray-100">
        <h1 className="text-4xl font-bold">Contact Us</h1>
        <p className="text-gray-600">We would love to hear from you!</p>
      </section>
      <section className="p-6 container mx-auto">
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Your Name"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Telegram phone number</label>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Your Telegram phone number"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Message</label>
            <textarea
              rows="4"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
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
