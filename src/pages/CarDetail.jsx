import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

function CarDetail() {
  const { modelCd } = useParams();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // State for the "Register Interest" form
  const [formData, setFormData] = useState({ name: '', mobile: '', city: '' });
  const [formStatus, setFormStatus] = useState('');

  useEffect(() => {
    // 1. ADD THIS LINE: Instantly scroll to the very top when the page opens!
    window.scrollTo(0, 0);
    fetch(`http://localhost:5000/api/cars/${modelCd}`)
      .then(res => res.json())
      .then(data => {
        setCar(data);
        setLoading(false);
      })
      .catch(err => console.error(err));
  }, [modelCd]);

  const handleRegister = async (e) => {
    e.preventDefault();
    setFormStatus('Submitting...');
    // We will use the contact API we built earlier to save this lead!
    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: formData.name, email: formData.mobile, message: `Interested in ${car.modelDesc} from ${formData.city}` })
      });
      if (response.ok) {
        setFormStatus(`Thank you, ${formData.name}! Our specialists will contact you soon.`);
        setFormData({ name: '', mobile: '', city: '' });
      } else {
        setFormStatus('Error submitting. Please try again.');
      }
    } catch {
      setFormStatus('Server error.');
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center dark:bg-gray-950 dark:text-white text-2xl font-bold uppercase tracking-widest">Loading...</div>;
  if (!car) return <div className="min-h-screen flex items-center justify-center dark:bg-gray-950 dark:text-white text-2xl font-bold uppercase tracking-widest">Car Not Found</div>;

  return (
    <div className="min-h-screen bg-cover bg-center bg-fixed transition-colors duration-500" style={{ backgroundImage: `url(${car.carImage?._publishUrl})` }}>
      <div className="min-h-screen bg-white/90 dark:bg-black/95 backdrop-blur-xl">
        
        {/* SECONDARY STICKY NAVIGATION (Just like the real Nexa site) */}
        <div className="sticky top-0 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 shadow-sm hidden md:block">
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Link to="/" className="text-gray-500 hover:text-black dark:hover:text-white transition">←</Link>
              <span className="font-black uppercase tracking-widest dark:text-white">{car.modelDesc}</span>
            </div>
            <div className="flex gap-8">
              <a href="#overview" className="text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition">Overview</a>
              <a href="#technology" className="text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition">Technology</a>
              <a href="#specifications" className="text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition">Specifications</a>
              <a href="#variants" className="text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition">Variants</a>
              <a href="#register" className="text-xs font-bold uppercase tracking-widest text-white bg-black dark:bg-white dark:text-black px-4 py-2 rounded-full hover:scale-105 transition-transform">Register Interest</a>
            </div>
          </div>
        </div>

        <main className="max-w-7xl mx-auto px-6 pt-10 pb-20">
          
          {/* SECTION 1: HERO OVERVIEW */}
          <section id="overview" className="bg-white/70 dark:bg-gray-900/60 backdrop-blur-2xl rounded-[3rem] p-10 md:p-16 shadow-2xl border border-white/50 dark:border-gray-700/50 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24 relative overflow-hidden mt-8">
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 dark:bg-blue-500/20 blur-[120px] rounded-full pointer-events-none"></div>

            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <span className="inline-block bg-gradient-to-r from-blue-600 to-blue-800 text-white text-xs font-black px-5 py-2 rounded-full uppercase tracking-widest shadow-lg">
                  {car.bodyType}
                </span>
                {car.carLogoImage?._publishUrl && (
                  <div className="dark:bg-white/90 dark:py-1.5 dark:px-3 rounded-lg flex items-center justify-center">
                    <img src={car.carLogoImage._publishUrl} alt="Logo" className="h-6 w-auto max-w-[120px] object-contain" />
                  </div>
                )}
              </div>

              <h1 className="text-6xl md:text-7xl font-black text-gray-900 dark:text-white mb-6 drop-shadow-sm">{car.modelDesc}</h1>
              <p className="text-gray-700 dark:text-gray-300 text-lg md:text-xl leading-relaxed mb-10 font-medium">
                {car.modelOverview}
              </p>

              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-3xl p-8 shadow-lg border border-white/60 dark:border-gray-700/50 mb-10">
                <span className="text-xs uppercase tracking-widest text-gray-500 dark:text-gray-400 font-black block mb-2">Starting Ex-Showroom Price</span>
                <span className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400">
                  ₹{car.exShowroomPrice?.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            <div className="group relative flex justify-center items-center w-full h-[300px] md:h-[450px]">
              <div className="absolute inset-0 bg-blue-500/20 dark:bg-blue-400/20 blur-[80px] rounded-full scale-75 group-hover:scale-110 group-hover:bg-blue-500/30 transition-all duration-700 pointer-events-none"></div>
              <img src={car.carImage?._publishUrl} alt={car.modelDesc} className="relative z-10 w-full max-h-full object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.3)] dark:drop-shadow-[0_20px_30px_rgba(0,0,0,0.6)] transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:scale-[1.10] group-hover:-translate-y-8" />
            </div>
          </section>

          {/* SECTION 2: TECHNOLOGY & FEATURES */}
          {(car.technology || car.additionalSpecifications) && (
            <section id="technology" className="mb-24 scroll-mt-24">
              <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-2 tracking-wider">Advanced Technology</h2>
              <p className="text-gray-500 dark:text-gray-400 mb-8 font-medium">Experience the pinnacle of automotive engineering.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {car.technology?.map((tech, i) => (
                  <div key={i} className="bg-white/70 dark:bg-gray-900/60 backdrop-blur-xl p-8 rounded-3xl border border-white/50 dark:border-gray-700/50 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/50 rounded-2xl flex items-center justify-center mb-6">
                      <span className="text-blue-600 dark:text-blue-400 font-black text-xl">⚡</span>
                    </div>
                    <h3 className="text-xl font-black text-gray-900 dark:text-white mb-2">{tech}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Optimized performance and efficiency for the modern road.</p>
                  </div>
                ))}
                {car.additionalSpecifications?.map((spec, i) => (
                  <div key={`spec-${i}`} className="bg-white/70 dark:bg-gray-900/60 backdrop-blur-xl p-8 rounded-3xl border border-white/50 dark:border-gray-700/50 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
                    <div className="w-12 h-12 bg-gray-900 dark:bg-white rounded-2xl flex items-center justify-center mb-6">
                      <span className="text-white dark:text-black font-black text-xl">🛡️</span>
                    </div>
                    <h3 className="text-xl font-black text-gray-900 dark:text-white mb-2">{spec}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Superior capability built into the DNA of the {car.modelDesc}.</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* SECTION 3: KEY SPECIFICATIONS */}
          <section id="specifications" className="mb-24 scroll-mt-24">
            <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-8 tracking-wider">Key Specifications</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
              {car.maxFuelEfficiency && (
                <div className="bg-white/70 dark:bg-gray-900/60 backdrop-blur-xl p-6 rounded-3xl border border-white/50 dark:border-gray-700/50 shadow-lg">
                  <span className="text-[10px] text-gray-500 dark:text-gray-400 font-black uppercase tracking-widest block mb-2">Fuel Efficiency</span>
                  <span className="text-xl font-black text-gray-900 dark:text-white">{car.maxFuelEfficiency}</span>
                </div>
              )}
              {car.maxPower && (
                <div className="bg-white/70 dark:bg-gray-900/60 backdrop-blur-xl p-6 rounded-3xl border border-white/50 dark:border-gray-700/50 shadow-lg">
                  <span className="text-[10px] text-gray-500 dark:text-gray-400 font-black uppercase tracking-widest block mb-2">Max Power</span>
                  <span className="text-xl font-black text-gray-900 dark:text-white">{car.maxPower}</span>
                </div>
              )}
              {car.maxDisplacement && (
                <div className="bg-white/70 dark:bg-gray-900/60 backdrop-blur-xl p-6 rounded-3xl border border-white/50 dark:border-gray-700/50 shadow-lg">
                  <span className="text-[10px] text-gray-500 dark:text-gray-400 font-black uppercase tracking-widest block mb-2">Displacement</span>
                  <span className="text-xl font-black text-gray-900 dark:text-white">{car.maxDisplacement}</span>
                </div>
              )}
              {car.transmissionType && (
                <div className="bg-white/70 dark:bg-gray-900/60 backdrop-blur-xl p-6 rounded-3xl border border-white/50 dark:border-gray-700/50 shadow-lg">
                  <span className="text-[10px] text-gray-500 dark:text-gray-400 font-black uppercase tracking-widest block mb-2">Transmission</span>
                  <span className="text-xl font-black text-gray-900 dark:text-white">{car.transmissionType.join(' / ')}</span>
                </div>
              )}
            </div>
          </section>

          {/* SECTION 4: VARIANTS */}
          {car.variants && car.variants.length > 0 && (
            <section id="variants" className="mb-24 scroll-mt-24">
              <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-8 tracking-wider">Available Trims & Variants</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {car.variants.map((v, i) => (
                  <div key={i} className="bg-white/70 dark:bg-gray-900/60 backdrop-blur-xl p-6 rounded-3xl border border-white/50 dark:border-gray-700/50 shadow-lg flex flex-col justify-between">
                    <div>
                      <h3 className="text-lg font-black text-gray-900 dark:text-white mb-1">{v.variantDesc}</h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400 font-mono mb-4">Code: {v.variantCd}</p>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      {v.variantTechnology?.map((tech, tIdx) => (
                        <span key={tIdx} className="px-3 py-1 bg-black/5 dark:bg-white/10 text-gray-800 dark:text-gray-200 text-[10px] font-black rounded-md uppercase tracking-widest">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* SECTION 5: REGISTER YOUR INTEREST (Like the Nexa site) */}
          <section id="register" className="bg-black dark:bg-gray-900 rounded-[3rem] p-10 md:p-16 shadow-2xl relative overflow-hidden scroll-mt-24">
            <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-l from-blue-900/40 to-transparent pointer-events-none"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 relative z-10">
              <div>
                <h2 className="text-4xl md:text-5xl font-black text-white mb-6">Register your interest!</h2>
                <p className="text-gray-400 text-lg leading-relaxed mb-8">
                  Explore the {car.modelDesc} and get all the details you need. Fill out your details and our specialists will be in touch with information just for you.
                </p>
                <div className="flex gap-4">
                  {car.brochure?._publishUrl && (
                    <a href={car.brochure._publishUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-6 py-3 border border-gray-700 rounded-full text-white text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors">
                      📄 E-Brochure
                    </a>
                  )}
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-3xl p-8">
                <form onSubmit={handleRegister} className="flex flex-col gap-5">
                  <div>
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 block">Full Name</label>
                    <input required type="text" className="w-full bg-gray-50 dark:bg-gray-900 border-none rounded-xl p-4 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none" placeholder="John Doe" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 block">Mobile Number</label>
                    <input required type="tel" className="w-full bg-gray-50 dark:bg-gray-900 border-none rounded-xl p-4 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none" placeholder="+91 XXXXX XXXXX" value={formData.mobile} onChange={e => setFormData({...formData, mobile: e.target.value})} />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 block">City</label>
                    <input required type="text" className="w-full bg-gray-50 dark:bg-gray-900 border-none rounded-xl p-4 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none" placeholder="e.g. Mumbai" value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} />
                  </div>
                  
                  <p className="text-[10px] text-gray-400 mt-2">
                    By clicking "Show Interest", I explicitly solicit a call/message via WhatsApp from Maruti Suzuki India Ltd or its partners.
                  </p>

                  <button type="submit" className="bg-blue-600 text-white font-black uppercase tracking-widest py-4 rounded-xl hover:bg-blue-700 transition mt-2">
                    Show Interest
                  </button>
                  
                  {formStatus && <p className="text-center font-bold text-blue-600 dark:text-blue-400 mt-2 text-sm">{formStatus}</p>}
                </form>
              </div>
            </div>
          </section>

        </main>
      </div>
    </div>
  );
}

export default CarDetail;