import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
const currentPath = location.pathname;

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    // Check if email exists in localStorage
    const email = localStorage.getItem('userEmail');
    if (email) {
      setIsLoggedIn(true);
      setUserEmail(email);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userEmail');
    setIsLoggedIn(false);
    setUserEmail('');
    // Redirect to homepage
    window.location.href = '/';
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white border-b border-gray-200 px-4 py-2.5 fixed w-full top-0 left-0 z-50">
      <div className="flex flex-wrap justify-between items-center mx-auto max-w-7xl">
        <a href="/" className="flex items-center">
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-primary-700">
            CodeSentry
          </span>
        </a>

        {/* Mobile menu button */}
        <button 
          onClick={toggleMenu} 
          type="button" 
          className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
        >
          <span className="sr-only">Open main menu</span>
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path>
          </svg>
        </button>

        {/* Desktop menu */}
        <div className={`${isMenuOpen ? 'block' : 'hidden'} w-full md:block md:w-auto`}>
        <ul className="flex flex-col p-4 mt-4 bg-gray-50 rounded-lg border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white">
  <li>
    <Link
      to="/"
      className={`block py-2 pr-4 pl-3 rounded md:p-0 ${
        currentPath === '/' ? 'text-primary-700 font-semibold' : 'text-gray-700 hover:text-primary-700'
      }`}
    >
      Home
    </Link>
  </li>

  <li>
    <Link
      to="/about"
      className={`block py-2 pr-4 pl-3 rounded md:p-0 ${
        currentPath === '/about' ? 'text-primary-700 font-semibold' : 'text-gray-700 hover:text-primary-700'
      }`}
    >
      About
    </Link>
  </li>

  <li>
    <Link
      to="/contact"
      className={`block py-2 pr-4 pl-3 rounded md:p-0 ${
        currentPath === '/contact' ? 'text-primary-700 font-semibold' : 'text-gray-700 hover:text-primary-700'
      }`}
    >
      Contact
    </Link>
  </li>

  <li>
    <Link
      to="/owner"
      className={`block py-2 pr-4 pl-3 rounded md:p-0 ${
        currentPath === '/owner' ? 'text-primary-700 font-semibold' : 'text-gray-700 hover:text-primary-700'
      }`}
    >
      For Employers
    </Link>
  </li>

  {isLoggedIn ? (
    <>
      <li className="md:border-l md:border-gray-200 md:pl-4">
        <Link
          to="/profile"
          className={`block py-2 pr-4 pl-3 rounded md:p-0 ${
            currentPath === '/profile' ? 'text-primary-700 font-semibold' : 'text-gray-700 hover:text-primary-700'
          }`}
        >
          <span className="font-medium">{userEmail}</span>
        </Link>
      </li>
      <li>
        <button
          onClick={handleLogout}
          className="block py-2 pr-4 pl-3 text-red-600 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-red-700 md:p-0"
        >
          Logout
        </button>
      </li>
    </>
  ) : (
    <li className="md:border-l md:border-gray-200 md:pl-4">
      <Link
        to="/login"
        className={`block py-2 pr-4 pl-3 rounded md:p-0 ${
          currentPath === '/login' ? 'bg-primary-600 text-white font-medium' : 'text-primary-700 hover:text-primary-800'
        }`}
      >
        Login / Sign Up
      </Link>
    </li>
  )}
</ul>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;