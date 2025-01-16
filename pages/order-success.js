import Link from 'next/link';

export default function OrderSuccess({ query }) {
  const { itemName, itemPrice } = query;

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-green-100">
      <h1 className="text-4xl font-bold text-green-700 mb-4">🎉 Order Placed Successfully!</h1>
      <p className="text-lg mb-6">Thank you for ordering <strong>{itemName}</strong> for ${itemPrice}.</p>
      
      <Link href="/">
        <button className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
          Back to Home
        </button>
      </Link>
    </div>
  );
}

// To access query parameters on the server-side
OrderSuccess.getInitialProps = ({ query }) => {
  return { query };
};
