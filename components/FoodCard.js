import axios from 'axios';
import { useRouter } from 'next/router';

export default function FoodCard({ id, title, image, price }) {
  const router = useRouter();

  const sendOrderToTelegram = async () => {
    const TELEGRAM_BOT_TOKEN = '7389940873:AAFNTbX8q9cZb4uMq6c34HlloqI8ZoFlAzc';
    const TELEGRAM_CHAT_ID = '721177574';

    const message = `🛒 *New Order Received!*\n\n📦 *Item:* ${title}\n💰 *Price:* $${price}\n🆔 *ID:* ${id}`;

    try {
      await axios.post(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: 'Markdown'
      });

      // Redirect to order success page with item details
      router.push({
        pathname: '/order-success',
        query: { itemName: title, itemPrice: price }
      });
    } catch (error) {
      console.error('Error sending message to Telegram:', error);
      alert('Failed to send the order.');
    }
  };

  return (
    <div className="border rounded-lg overflow-hidden shadow-lg transform transition-transform hover:scale-105">
      <img src={image} alt={title} className="w-full h-40 object-cover" />
      <div className="p-4">
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="text-green-600 font-bold">${price}</p>
        <button
          onClick={sendOrderToTelegram}
          className="mt-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 w-full"
        >
          Order Now
        </button>
      </div>
    </div>
  );
}
