import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function CarList() {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    fetch(`${API_URL}/api/cars`)
      .then(res => res.json())
      .then(data => setCars(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-gray-950 transition-colors duration-500 pb-24 overflow-hidden">
      
      {/* STUNNING PREMIUM HEADER */}
      <header className="relative bg-black text-white py-32 text-center overflow-hidden z-10 shadow-2xl">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-32 bg-blue-600/30 blur-[120px] rounded-full -z-10 pointer-events-none"></div>
        <h1 className="text-5xl md:text-7xl font-black tracking-[0.2em] uppercase mb-6 drop-shadow-lg">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-300 to-gray-500 dark:from-white dark:via-blue-200 dark:to-blue-600">
            NEXA Lineup
          </span>
        </h1>
        <p className="text-gray-400 mt-4 text-xl font-medium tracking-[0.3em] uppercase">Create. Inspire. Evolve.</p>
      </header>

      {/* NEW FULL-WIDTH EDITORIAL LAYOUT */}
      <main className="max-w-[1400px] mx-auto px-6 mt-20 flex flex-col gap-16 md:gap-24">
        {cars.map((car, index) => {
          // Alternating Layout: Even numbers have image on left, Odd have image on right
          const isImageLeft = index % 2 === 0;

          return (
            <div 
              key={car.modelCd} 
              className={`group relative flex flex-col ${isImageLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'} bg-white dark:bg-gray-900 rounded-[3rem] shadow-xl hover:shadow-2xl transition-all duration-500 ease-out border border-gray-100 dark:border-gray-800 overflow-hidden`}
            >
              
              {/* MASSIVE IMAGE SIDE */}
              <div className="w-full lg:w-3/5 relative p-10 md:p-20 flex justify-center items-center bg-gradient-to-br from-gray-50 to-gray-200 dark:from-gray-800 dark:to-gray-950 min-h-[400px] md:min-h-[500px]">
                {/* Magical Aura Glow */}
                <div className="absolute inset-0 bg-blue-500/0 group-hover:bg-blue-500/20 dark:group-hover:bg-blue-500/30 blur-[100px] transition-colors duration-700 rounded-full scale-50 group-hover:scale-100"></div>
                
                <img 
                  src={car.carImage?._publishUrl} 
                  alt={car.modelDesc} 
                  className="relative z-10 w-full max-w-[700px] object-contain mix-blend-multiply dark:mix-blend-normal drop-shadow-2xl transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:scale-[1.12] group-hover:-translate-y-4 group-hover:drop-shadow-[0_40px_40px_rgba(0,0,0,0.5)]" 
                />
              </div>
              
              {/* TEXT DETAILS SIDE */}
              <div className="w-full lg:w-2/5 p-10 md:p-16 flex flex-col justify-center relative z-20">
                
                {/* Logo and Body Type */}
                <div className="flex justify-between items-center mb-8 gap-4">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-4 py-2 rounded-full">
                    {car.bodyType}
                  </span>
                  
                  {car.carLogoImage?._publishUrl && (
                    <div className="dark:bg-white/90 dark:py-2 dark:px-3 rounded-xl flex items-center justify-center shadow-sm">
                      <img 
                        src={car.carLogoImage._publishUrl} 
                        alt="logo" 
                        className="h-6 w-auto max-w-[120px] object-contain opacity-70 group-hover:opacity-100 transition-opacity duration-300" 
                      />
                    </div>
                  )}
                </div>

                {/* Car Title */}
                <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-6 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                  {car.modelDesc}
                </h2>

                {/* Short Overview */}
                <p className="text-gray-500 dark:text-gray-400 text-base leading-relaxed mb-10 md:line-clamp-3">
                  {car.modelOverview}
                </p>

                {/* Price */}
                <div className="mb-10 p-6 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-gray-100 dark:border-gray-700">
                  <span className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest block mb-2">Starting At</span>
                  <span className="text-3xl font-black text-gray-900 dark:text-white">
                    ₹{car.exShowroomPrice?.toLocaleString('en-IN')}
                  </span>
                </div>

                {/* Explore Button */}
                <Link 
                  to={`/car/${car.modelCd}`} 
                  className="w-full md:w-max px-10 py-5 bg-black dark:bg-white text-white dark:text-black font-black rounded-2xl hover:scale-105 hover:bg-blue-600 dark:hover:bg-blue-500 dark:hover:text-white hover:shadow-[0_10px_30px_rgba(37,99,235,0.4)] transition-all duration-300 uppercase tracking-widest text-xs flex justify-center items-center gap-3"
                >
                  Explore {car.modelDesc} 
                  <span className="text-lg group-hover:translate-x-2 transition-transform">→</span>
                </Link>

              </div>
            </div>
          );
        })}
      </main>
    </div>
  );
}

export default CarList;