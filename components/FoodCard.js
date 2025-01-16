export default function FoodCard({ title, image, price }) {
    return (
      <div className="border rounded-lg overflow-hidden shadow-lg transform transition-transform hover:scale-105">
        <img src={image} alt={title} className="w-full h-40 object-cover" />
        <div className="p-4">
          <h2 className="text-xl font-semibold">{title}</h2>
          <p className="text-green-600 font-bold">${price}</p>
          <button className="mt-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 w-full">
            Order Now
          </button>
        </div>
      </div>
    );
  }
  