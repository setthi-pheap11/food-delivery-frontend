import Link from 'next/link';

export default function OrderSuccess({ query }) {
  const { itemName, itemPrice } = query;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-50 px-4">
      <div className="bg-white shadow-lg rounded-lg p-8 md:p-12 max-w-md w-full text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-green-700 mb-4">
          🎉 Order Placed Successfully!
        </h1>
        
        <p className="text-gray-700 text-lg md:text-xl mb-6">
          Thank you for ordering <strong className="text-green-700">{itemName}</strong> for <strong>${itemPrice}</strong>.
        </p>

        <Link href="/" passHref>
          <button className="w-full md:w-auto px-6 py-3 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition duration-300">
            Back to Home
          </button>
        </Link>
      </div>
    </div>
  );
}

// To access query parameters on the server-side
OrderSuccess.getInitialProps = ({ query }) => {
  return { query };
};
