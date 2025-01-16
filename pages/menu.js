import Header from '../components/Header';
import Footer from '../components/Footer';
import FoodCard from '../components/FoodCard';

export default function Menu() {
  const menuItems = [
    { title: 'Burger', image: '/images/hambuger.png', price: 5.99 },
    { title: 'Pizza', image: '/images/pizza.png', price: 8.99 },
    { title: 'Sushi', image: '/images/sushi.png', price: 12.99 },
    { title: 'Burger', image: '/images/hambuger.png', price: 5.99 },
    { title: 'Pizza', image: '/images/pizza.png', price: 8.99 },
    { title: 'Sushi', image: '/images/sushi.png', price: 12.99 },
    { title: 'Burger', image: '/images/hambuger.png', price: 5.99 },
    { title: 'Pizza', image: '/images/pizza.png', price: 8.99 },
    { title: 'Sushi', image: '/images/sushi.png', price: 12.99 },
    { title: 'Burger', image: '/images/hambuger.png', price: 5.99 },
    { title: 'Pizza', image: '/images/pizza.png', price: 8.99 },
    { title: 'Sushi', image: '/images/sushi.png', price: 12.99 },
    { title: 'Burger', image: '/images/hambuger.png', price: 5.99 },
    { title: 'Pizza', image: '/images/pizza.png', price: 8.99 },
    { title: 'Sushi', image: '/images/sushi.png', price: 12.99 },
    { title: 'Burger', image: '/images/hambuger.png', price: 5.99 },
    { title: 'Pizza', image: '/images/pizza.png', price: 8.99 },
    { title: 'Sushi', image: '/images/sushi.png', price: 12.99 },
    { title: 'Burger', image: '/images/hambuger.png', price: 5.99 },
    { title: 'Pizza', image: '/images/pizza.png', price: 8.99 },
    { title: 'Sushi', image: '/images/sushi.png', price: 12.99 },
    { title: 'Burger', image: '/images/hambuger.png', price: 5.99 },
    { title: 'Pizza', image: '/images/pizza.png', price: 8.99 },
    { title: 'Sushi', image: '/images/sushi.png', price: 12.99 },
    { title: 'Burger', image: '/images/hambuger.png', price: 5.99 },
    { title: 'Pizza', image: '/images/pizza.png', price: 8.99 },
    { title: 'Sushi', image: '/images/sushi.png', price: 12.99 },
    { title: 'Burger', image: '/images/hambuger.png', price: 5.99 },
    { title: 'Pizza', image: '/images/pizza.png', price: 8.99 },
    { title: 'Sushi', image: '/images/sushi.png', price: 12.99 },
    { title: 'Burger', image: '/images/hambuger.png', price: 5.99 },
    { title: 'Pizza', image: '/images/pizza.png', price: 8.99 },
    { title: 'Sushi', image: '/images/sushi.png', price: 12.99 },
    { title: 'Burger', image: '/images/hambuger.png', price: 5.99 },
    { title: 'Pizza', image: '/images/pizza.png', price: 8.99 },
    { title: 'Sushi', image: '/images/sushi.png', price: 12.99 },
    { title: 'Burger', image: '/images/hambuger.png', price: 5.99 },
    { title: 'Pizza', image: '/images/pizza.png', price: 8.99 },
    { title: 'Sushi', image: '/images/sushi.png', price: 12.99 },
    
  ];

  return (
    <div>
      <Header />
      <section className="text-center py-10 bg-gray-100">
        <h1 className="text-4xl font-bold">Our Menu</h1>
        <p className="text-gray-600">Choose from our delicious range of dishes!</p>
      </section>
      <main className="p-6 container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {menuItems.map((item, index) => (
          <FoodCard key={index} {...item} />
        ))}
      </main>
      <Footer />
    </div>
  );
}
