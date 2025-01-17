import { useState } from 'react';
import Link from 'next/link';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/">
              <span className="text-green-600 text-2xl font-bold flex items-center cursor-pointer">
                <span role="img" aria-label="burger">🍔</span> Foodie Express
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Link href="/menu" className="hover:text-green-500">Menu</Link>
            <Link href="/about" className="hover:text-green-500">About</Link>
            <Link href="/contact" className="hover:text-green-500">Contact</Link>
            <Link href="/seller/dashboard" className="hover:text-green-500">Seller</Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-green-600 focus:outline-none"
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <Link href="/menu" className="block px-4 py-2 hover:bg-gray-100">Menu</Link>
          <Link href="/about" className="block px-4 py-2 hover:bg-gray-100">About</Link>
          <Link href="/contact" className="block px-4 py-2 hover:bg-gray-100">Contact</Link>
          <Link href="/seller/dashboard" className="block px-4 py-2 hover:bg-gray-100">Seller</Link>
        </div>
      )}
    </nav>
  );
}
