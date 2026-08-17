import { useState, useEffect } from 'react';

function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  // Check how far down the user has scrolled
  const toggleVisibility = () => {
    if (window.scrollY > 400) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Scroll to the very top smoothly
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    // Cleanup the event listener when component unmounts
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className={`fixed bottom-10 right-10 z-50 p-4 bg-black dark:bg-white text-white dark:text-black rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.3)] hover:scale-110 hover:-translate-y-2 hover:bg-blue-600 dark:hover:bg-blue-500 hover:text-white dark:hover:text-white transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
      }`}
    >
      {/* Up Arrow SVG Icon */}
      <svg 
        className="w-6 h-6" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 15l7-7 7 7" />
      </svg>
    </button>
  );
}

export default ScrollToTop;