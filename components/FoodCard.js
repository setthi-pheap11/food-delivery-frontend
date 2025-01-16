import axios from 'axios';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function FoodCard({ id, title, image, price }) {
  const router = useRouter();

  // 🛒 Handle Order Now Button
  const handleOrderClick = () => {
    router.push({
      pathname: '/order-details',
      query: { itemId: id, itemName: title, itemPrice: price }
    });
  };

  return (
    <div className="border rounded-lg overflow-hidden shadow-lg transform transition-transform hover:scale-105">
      {/* ✅ Link to Item Detail Page */}
      <Link href={`/item/${id}`}>
        <img 
          src={image} 
          alt={title} 
          className="w-full h-40 object-cover cursor-pointer" 
        />
      </Link>

      <div className="p-4">
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="text-green-600 font-bold">${price}</p>

        {/* ✅ View Details Button */}
        <Link href={`/item/${id}`}>
          <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 w-full">
            View Details
          </button>
        </Link>

        {/* ✅ Order Now Button */}
        <button
          onClick={handleOrderClick}
          className="mt-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 w-full"
        >
          Order Now
        </button>
      </div>
    </div>
  );
}
