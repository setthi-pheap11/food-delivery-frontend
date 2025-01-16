import Header from '../components/Header';
import Footer from '../components/Footer';

export default function About() {
  return (
    <div>
      <Header />
      <section className="text-center py-10 bg-gray-100">
        <h1 className="text-4xl font-bold">About Us</h1>
        <p className="text-gray-600 mt-4 px-6">
          Welcome to Foodie Express! We are passionate about delivering fresh and delicious food to your doorstep.
        </p>
      </section>
      <Footer />
    </div>
  );
}
