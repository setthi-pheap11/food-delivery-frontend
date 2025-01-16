import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <h1 className="text-3xl font-bold text-green-600">🍔 Foodie Express</h1>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/menu">Menu</Link>
            </li>
            <li>
              <Link href="/about">About</Link>  {/* ✅ Correct Path */}
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
            <li><Link href="/seller/register">Seller</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
