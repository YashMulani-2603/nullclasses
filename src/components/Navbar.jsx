import { useState } from 'react';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="relative flex items-center justify-between sm:h-20 md:justify-center py-6 px-4 mt-2 bg-gray-900">
      <div className="flex items-center flex-1 md:absolute md:inset-y-0 md:left-0">
        <div className="flex items-center justify-between w-full md:w-auto">
          <a href="/">
            <h1 className="font-bold text-white text-2xl p-4">TrafiX</h1>
          </a>

          <div className="right-4 flex items-center md:hidden">
            <button
              type="button"
              id="main-menu"
              aria-label="Main menu"
              aria-haspopup="true"
              onClick={() => setMenuOpen(!menuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-gray-300 hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-gray-300 transition duration-150 ease-in-out"
            >
              <svg
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`absolute top-16 left-0 w-full bg-gray-900 text-white flex flex-col items-center space-y-4 py-4 transition-all duration-300 ease-in-out ${menuOpen ? 'block' : 'hidden'} md:hidden`}>
        <a href="/dashboard" className="font-bold hover:text-gray-300">Overview</a>
        <a href="/candlescan" className="font-bold hover:text-gray-300">Analyzer</a>
        <a href="/currency" className="font-bold hover:text-gray-300">Convertor</a>
        <a href="/tradecraft" className="font-bold hover:text-gray-300">Strategies</a>
        <a href="/trading" className="font-bold hover:text-gray-300">AutoTrade</a>
        <a href="/insighthub" target="_blank" className="font-bold hover:text-gray-300">Insights</a>
        <a href="/login" className="font-bold hover:text-gray-300">Login</a>
        <a href="/signup" className="font-bold bg-gradient-to-r from-violet-600 to-cyan-600 px-4 py-2 rounded-md">Get started</a>
      </div>

      <div className="hidden md:flex md:space-x-5">
        <a href="/dashboard" className="font-bold text-white hover:text-gray-300 transition duration-150 ease-in-out">Overview</a>
        <a href="/candlescan" className="font-bold text-white hover:text-gray-300 transition duration-150 ease-in-out">Analyzer</a>
        <a href="/currency" className="font-bold text-white hover:text-gray-300 transition duration-150 ease-in-out">Convertor</a>
        <a href="/tradecraft" className="font-bold text-white hover:text-gray-300 transition duration-150 ease-in-out">Strategies</a>
        <a href="/trading" className="font-bold text-white hover:text-gray-300 transition duration-150 ease-in-out">AutoTrade</a>
        <a href="/insighthub" target="_blank" className="font-bold text-white hover:text-gray-300 transition duration-150 ease-in-out">Insights</a>
      </div>

      <div className="hidden md:absolute md:flex md:items-center md:justify-end md:inset-y-0 md:right-4">
        <span className="inline-flex">
          <a href="/login" className="inline-flex items-center px-4 py-2 text-xl font-bold text-white hover:text-gray-300 focus:outline-none transition duration-150 ease-in-out">Login</a>
        </span>
        <span className="inline-flex rounded-md shadow ml-2">
          <a href="/signup" className="inline-flex items-center px-4 py-2 text-base font-bold rounded-md text-white bg-gradient-to-r from-violet-600 to-cyan-600 transition duration-150 ease-in-out">Get started</a>
        </span>
      </div>
    </nav>
  );
}

export default Navbar;
