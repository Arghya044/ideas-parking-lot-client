'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { FiMenu, FiX, FiUser, FiLogOut, FiPlus, FiSettings } from 'react-icons/fi';
import { authAPI } from '@/lib/api';
import { onAuthStateChange, getCurrentUser, logout } from '@/lib/auth';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Subscribe to Firebase auth state changes
    const unsubscribe = onAuthStateChange(async (firebaseUser) => {
      if (firebaseUser) {
        // Fetch user details from API
        try {
          const response = await authAPI.getMe();
          if (response.success) {
            setUser(response.user);
          } else {
            // If API call fails, use Firebase user data
            setUser({
              id: firebaseUser.uid,
              name: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'User',
              email: firebaseUser.email,
              image: firebaseUser.photoURL || null,
            });
          }
        } catch (error) {
          // Fallback to Firebase user data
          setUser({
            id: firebaseUser.uid,
            name: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'User',
            email: firebaseUser.email,
            image: firebaseUser.photoURL || null,
          });
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await logout();
    setUser(null);
    setIsUserMenuOpen(false);
    router.push('/');
  };

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/ideas', label: 'Ideas' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">IP</span>
              </div>
              <span className="ml-2 text-xl font-bold text-gray-800">Ideas Parking Lot</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-gray-700 hover:text-blue-600 transition-colors font-medium ${
                  pathname === link.href ? 'text-blue-600' : ''
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Auth Buttons / User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {loading ? (
              <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            ) : user ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  {user.image ? (
                    <img
                      src={user.image}
                      alt={user.name}
                      className="w-8 h-8 rounded-full"
                    />
                  ) : (
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                      <FiUser className="text-white" />
                    </div>
                  )}
                  <span className="text-gray-700 font-medium">{user.name}</span>
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                    <Link
                      href="/add-idea"
                      className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-100 transition-colors"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <FiPlus className="text-gray-600" />
                      <span className="text-gray-700">Add Idea</span>
                    </Link>
                    <Link
                      href="/manage-ideas"
                      className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-100 transition-colors"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <FiSettings className="text-gray-600" />
                      <span className="text-gray-700">Manage Ideas</span>
                    </Link>
                    <div className="border-t border-gray-200 my-1"></div>
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-100 transition-colors w-full text-left"
                    >
                      <FiLogOut className="text-gray-600" />
                      <span className="text-gray-700">Logout</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  href="/login"
                  className="px-4 py-2 text-gray-700 hover:text-blue-600 transition-colors font-medium"
                >
                  Login
                </Link>
                <Link
                  href="/login?mode=register"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 text-gray-700 hover:text-blue-600 transition-colors font-medium ${
                    pathname === link.href ? 'text-blue-600' : ''
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              {user ? (
                <>
                  <Link
                    href="/add-idea"
                    className="px-4 py-2 text-gray-700 hover:text-blue-600 transition-colors font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    Add Idea
                  </Link>
                  <Link
                    href="/manage-ideas"
                    className="px-4 py-2 text-gray-700 hover:text-blue-600 transition-colors font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    Manage Ideas
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="px-4 py-2 text-left text-gray-700 hover:text-blue-600 transition-colors font-medium"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="px-4 py-2 text-gray-700 hover:text-blue-600 transition-colors font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    href="/login?mode=register"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-center"
                    onClick={() => setIsOpen(false)}
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

