import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Navigation Bar */}
      <nav className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="text-green-600 text-2xl font-bold flex items-center cursor-pointer">
                <span role="img" aria-label="burger">🍔</span> Foodie Express
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="flex md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="text-gray-500 hover:text-green-500 focus:outline-none focus:text-green-500"
                aria-controls="mobile-menu"
                aria-expanded={isOpen ? 'true' : 'false'}
              >
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
                </svg>
              </button>
            </div>

            {/* Static Navigation Links */}
            <div className="hidden md:flex items-center space-x-6">
              <Link href="/" className="hover:text-green-500 cursor-pointer">Home</Link>
              <Link href="/menu" className="hover:text-green-500 cursor-pointer">Menu</Link>
              <Link href="/about" className="hover:text-green-500 cursor-pointer">About</Link>
              <Link href="/contact" className="hover:text-green-500 cursor-pointer">Contact</Link>
              <Link href="/seller/dashboard" className="hover:text-green-500 cursor-pointer">Seller</Link>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden" id="mobile-menu">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link href="/" className="block text-gray-700 hover:text-green-500 cursor-pointer">Home</Link>
              <Link href="/menu" className="block text-gray-700 hover:text-green-500 cursor-pointer">Menu</Link>
              <Link href="/about" className="block text-gray-700 hover:text-green-500 cursor-pointer">About</Link>
              <Link href="/contact" className="block text-gray-700 hover:text-green-500 cursor-pointer">Contact</Link>
              <Link href="/seller/dashboard" className="block text-gray-700 hover:text-green-500 cursor-pointer">Seller</Link>
            </div>
          </div>
        )}
      </nav>

      {/* Spacer to prevent content overlap */}
      <div className="h-16"></div>
    </>
  );
}
