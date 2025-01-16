import { useRouter } from 'next/router';
import { useState } from 'react';
import axios from 'axios';

export default function OrderDetails() {
  const router = useRouter();
  const { itemId, itemName, itemPrice } = router.query;

  const [phoneNumber, setPhoneNumber] = useState('');
  const [customMessage, setCustomMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!phoneNumber) {
      alert('Please fill in all fields.');
      return;
    }

    const TELEGRAM_BOT_TOKEN = '7389940873:AAFNTbX8q9cZb4uMq6c34HlloqI8ZoFlAzc';
    const TELEGRAM_CHAT_ID = '721177574';
    const message = `🛒 *New Order Received!*\n\n📦 *Item:* ${itemName}\n💰 *Price:* $${itemPrice}\n🆔 *ID:* ${itemId}\n📞 *Telegram Phone Number:* ${phoneNumber}\n📝 *Message:* ${customMessage}`;

    try {
      await axios.post(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: 'Markdown',
      });

      // Redirect to Order Success page
      router.push({
        pathname: '/order-success',
        query: { itemName, itemPrice, itemId }
      });
    } catch (error) {
      console.error('Error sending order:', error);
      alert('Failed to send the order. Please try again.');
    }
  };

return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <h1 className="text-3xl font-bold mb-6">Confirm Your Order</h1>
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-96">
            <div className="mb-4">
                <label className="block text-gray-700">
                    Telegram Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="Enter your Telegram number"
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Custom Message</label>
                <textarea
                    value={customMessage}
                    onChange={(e) => setCustomMessage(e.target.value)}
                    placeholder="Add any note or request..."
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                    rows="4"
                />
            </div>
            <button
                type="submit"
                className="w-full py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            >
                Confirm Order
            </button>
        </form>
    </div>
);
}
