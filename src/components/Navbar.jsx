import { Link } from 'react-router-dom';

function Navbar({ darkMode, setDarkMode }) {
  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50 transition-colors duration-300 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* LOGO AREA */}
        <Link to="/" className="text-2xl font-black tracking-widest text-black dark:text-white uppercase">
          NEXA<span className="text-blue-600">.</span>
        </Link>

        {/* LINKS & TOGGLE */}
        <div className="flex items-center gap-6">
          <Link to="/" className="font-bold text-sm uppercase tracking-wider text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition">
            Lineup
          </Link>
          <Link to="/contact" className="font-bold text-sm uppercase tracking-wider text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition">
            Contact
          </Link>
          
          <button 
            onClick={() => setDarkMode(!darkMode)}
            className="ml-4 px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-full text-xs font-bold uppercase tracking-wider hover:scale-105 transition-transform"
          >
            {darkMode ? "☀️ Light" : "🌙 Dark"}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;