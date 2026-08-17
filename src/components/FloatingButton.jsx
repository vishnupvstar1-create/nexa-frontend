import { Link, useLocation } from 'react-router-dom';

function FloatingButton() {
  const location = useLocation();

  // Don't show the floating button if the user is ALREADY on the test drive page!
  if (location.pathname === '/test-drive') {
    return null;
  }

  return (
    <div className="fixed bottom-8 right-8 z-50 animate-bounce-slow">
      <Link 
        to="/test-drive" 
        className="flex items-center gap-3 bg-black dark:bg-white text-white dark:text-black px-6 py-4 rounded-full shadow-[0_10px_25px_rgba(0,0,0,0.3)] hover:scale-105 hover:shadow-[0_10px_35px_rgba(37,99,235,0.4)] transition-all duration-300 group border border-gray-800 dark:border-gray-200"
      >
        <span className="text-xl group-hover:rotate-12 transition-transform duration-300">🚗</span>
        <span className="text-xs font-black uppercase tracking-widest">Book Test Drive</span>
      </Link>
    </div>
  );
}

export default FloatingButton;