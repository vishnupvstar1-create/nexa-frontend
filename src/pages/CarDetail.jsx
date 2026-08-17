import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';

// 1. ADD THIS ARRAY OF CITIES
const indianCities = [
  "Ahmedabad", "Bengaluru", "Bhopal", "Chandigarh", "Chennai", 
  "Delhi", "Faridabad", "Ghaziabad", "Gurgaon", "Hyderabad", 
  "Indore", "Jaipur", "Kanpur", "Kochi", "Kolkata", "Lucknow", 
  "Ludhiana", "Mumbai", "Nagpur", "Nashik", "Noida", "Patna", 
  "Pune", "Rajkot", "Surat", "Thane", "Vadodara", "Varanasi", "Visakhapatnam"
];

function CarDetail() {
  const { modelCd } = useParams();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formStatus, setFormStatus] = useState('');

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  useEffect(() => {
    window.scrollTo(0, 0); 
    fetch(`${API_URL}/api/cars/${modelCd}`)
      .then(res => {
        if (!res.ok) throw new Error("Car not found");
        return res.json();
      })
      .then(data => {
        setCar(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  }, [modelCd, API_URL]);

  // 1. REGEX FOR INDIAN PHONE NUMBERS (10 digits starting with 6-9)
  const phoneRegExp = /^[6-9]\d{9}$/;

  // 2. FORMIK CONFIGURATION
  const formik = useFormik({
    initialValues: {
      name: '',
      mobile: '',
      city: ''
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(2, 'Name must be at least 2 characters')
        .required('Full Name is required'),
      mobile: Yup.string()
        .matches(phoneRegExp, 'Must be a valid 10-digit mobile number')
        .required('Mobile Number is required'),
      city: Yup.string()
        .required('City is required')
    }),
    onSubmit: async (values, { resetForm }) => {
      setFormStatus('Submitting...');
      try {
        const response = await fetch(`${API_URL}/api/contact`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          // PERFECT, CLEAN PAYLOAD:
          body: JSON.stringify({ 
            name: values.name, 
            mobile: values.mobile, 
            city: values.city,
            car: car?.modelDesc,
            message: `New Lead: Interested in ${car?.modelDesc} from ${values.city}` 
          })
        });
        
        if (response.ok) {
          setFormStatus(`Thank you, ${values.name}! Our specialists will contact you soon.`);
          resetForm();
        } else {
          setFormStatus('Error submitting. Please try again.');
        }
      } catch (error) {
        console.error("Form Error:", error);
        setFormStatus('Network Error. Could not connect to server.');
      }
    }
  });

  if (loading) return <div className="min-h-screen flex items-center justify-center dark:bg-gray-950 dark:text-white text-2xl font-bold uppercase tracking-widest">Loading...</div>;
  if (!car) return <div className="min-h-screen flex items-center justify-center dark:bg-gray-950 dark:text-white text-2xl font-bold uppercase tracking-widest">Car Not Found</div>;

  return (
    <div className="min-h-screen bg-cover bg-center bg-fixed transition-colors duration-500" style={{ backgroundImage: `url(${car.carImage?._publishUrl})` }}>
      <div className="min-h-screen bg-white/90 dark:bg-black/95 backdrop-blur-xl">
        
        {/* SECONDARY STICKY NAVIGATION */}
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

         {/* SECTION 5: REGISTER YOUR INTEREST & DOWNLOADS */}
          <section id="register" className="bg-black dark:bg-gray-900 rounded-[3rem] p-10 md:p-16 shadow-2xl relative overflow-hidden scroll-mt-24">
            <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-l from-blue-900/40 to-transparent pointer-events-none"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 relative z-10">
              
{/* LEFT SIDE: TEXT & BROCHURE DOWNLOADS */}
              <div>
                <h2 className="text-4xl md:text-5xl font-black text-white mb-6">Register your interest!</h2>
                <p className="text-gray-400 text-lg leading-relaxed mb-10">
                  Explore the {car.modelDesc} and get all the details you need. Download our resources below or fill out your details and our specialists will be in touch.
                </p>
                
                {/* NEW SLEEK PILL-SHAPED BUTTONS */}
                <div className="flex flex-wrap gap-4">
                  
                  {/* Map through Brochures */}
                  {car.brochures?.map((brochure, i) => (
                    <a 
                      key={`b-${i}`} 
                      href={brochure.downloadPath?._publishUrl || brochure.downloadPath?._dmS7Url || '#'} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="flex items-center gap-2 px-6 py-3 border border-gray-700 rounded-full text-white text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors"
                    >
                      📄 {brochure.manualbrochureLabel || "E-Brochure"}
                    </a>
                  ))}

                  {/* Map through Manuals */}
                  {car.manuals?.map((manual, i) => (
                    <a 
                      key={`m-${i}`} 
                      href={manual.downloadPath?._publishUrl || manual.downloadPath?._dmS7Url || '#'} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="flex items-center gap-2 px-6 py-3 border border-gray-700 rounded-full text-white text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors"
                    >
                      📘 {manual.manualbrochureLabel || "Manual"}
                    </a>
                  ))}

                  {/* Fallback Single Brochure if arrays don't exist */}
                  {!car.brochures && !car.manuals && car.brochure?._publishUrl && (
                    <a 
                      href={car.brochure._publishUrl} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="flex items-center gap-2 px-6 py-3 border border-gray-700 rounded-full text-white text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors"
                    >
                      📄 E-Brochure
                    </a>
                  )}
                  
                </div>
              </div>

              {/* RIGHT SIDE: FORMIK REGISTRATION FORM */}
              <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl">
                <form onSubmit={formik.handleSubmit} className="flex flex-col gap-5">
                  
                  {/* FULL NAME */}
                  <div>
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 block">Full Name</label>
                    <input 
                      type="text" 
                      className={`w-full bg-gray-50 dark:bg-gray-900 border ${formik.touched.name && formik.errors.name ? 'border-red-500' : 'border-none'} rounded-xl p-4 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none`} 
                      placeholder="John Doe" 
                      {...formik.getFieldProps('name')}
                    />
                    {formik.touched.name && formik.errors.name && (
                      <div className="text-red-500 text-[10px] font-bold uppercase tracking-widest mt-2 px-2">{formik.errors.name}</div>
                    )}
                  </div>

                  {/* MOBILE NUMBER */}
                  <div>
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 block">Mobile Number</label>
                    <input 
                      type="tel" 
                      className={`w-full bg-gray-50 dark:bg-gray-900 border ${formik.touched.mobile && formik.errors.mobile ? 'border-red-500' : 'border-none'} rounded-xl p-4 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none`} 
                      placeholder="9876543210" 
                      {...formik.getFieldProps('mobile')}
                    />
                    {formik.touched.mobile && formik.errors.mobile && (
                      <div className="text-red-500 text-[10px] font-bold uppercase tracking-widest mt-2 px-2">{formik.errors.mobile}</div>
                    )}
                  </div>

                  {/* CITY DROPDOWN */}
                  <div>
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 block">City</label>
                    <div className="relative">
                      <select 
                        className={`w-full bg-gray-50 dark:bg-gray-900 border ${formik.touched.city && formik.errors.city ? 'border-red-500' : 'border-none'} rounded-xl p-4 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none appearance-none cursor-pointer`}
                        {...formik.getFieldProps('city')}
                      >
                        <option value="" disabled>Select your city...</option>
                        {indianCities.map((city) => (
                          <option key={city} value={city}>{city}</option>
                        ))}
                      </select>
                      
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 dark:text-gray-500">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                    {formik.touched.city && formik.errors.city && (
                      <div className="text-red-500 text-[10px] font-bold uppercase tracking-widest mt-2 px-2">{formik.errors.city}</div>
                    )}
                  </div>
                  
                  <p className="text-[10px] text-gray-400 mt-2">
                    By clicking "Show Interest", I explicitly solicit a call/message via WhatsApp from Maruti Suzuki India Ltd or its partners.
                  </p>

                  <button type="submit" className="bg-blue-600 text-white font-black uppercase tracking-widest py-4 rounded-xl hover:bg-blue-700 hover:shadow-[0_10px_20px_rgba(37,99,235,0.4)] transition-all mt-2">
                    Show Interest
                  </button>
                  
                  {formStatus && <p className={`text-center font-bold mt-2 text-sm ${formStatus.includes('Error') ? 'text-red-500' : 'text-blue-500'}`}>{formStatus}</p>}
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