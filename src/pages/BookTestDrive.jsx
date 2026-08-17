import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const indianCities = [
  "Ahmedabad", "Bengaluru", "Bhopal", "Chandigarh", "Chennai", 
  "Delhi", "Hyderabad", "Indore", "Jaipur", "Kochi", "Kolkata", 
  "Lucknow", "Mumbai", "Pune", "Surat", "Thane"
];

function BookTestDrive() {
  const [status, setStatus] = useState('');
  const [cars, setCars] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  // Fetch available cars for the dropdown when the page loads
  useEffect(() => {
    window.scrollTo(0, 0);
    fetch(`${API_URL}/api/cars`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setCars(data);
      })
      .catch(err => console.error("Failed to load cars", err));
  }, [API_URL]);

  const phoneRegExp = /^[6-9]\d{9}$/;

  const formik = useFormik({
    initialValues: {
      name: '',
      mobile: '',
      city: '',
      car: '',
      preferredDate: ''
    },
    validationSchema: Yup.object({
      name: Yup.string().min(2, 'Name is too short').required('Name is required'),
      mobile: Yup.string().matches(phoneRegExp, 'Must be a valid 10-digit mobile number').required('Mobile is required'),
      city: Yup.string().required('City is required'),
      car: Yup.string().required('Please select a car model'),
      preferredDate: Yup.date().min(new Date(), 'Date cannot be in the past').required('Date is required')
    }),
    onSubmit: async (values, { resetForm }) => {
      setStatus('Booking...');
      try {
        const response = await fetch(`${API_URL}/api/test-drive`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(values)
        });
        
        if (response.ok) {
          setStatus('Test Drive successfully booked! Our team will call you to confirm the time.');
          resetForm();
        } else {
          setStatus('Failed to book. Please try again.');
        }
      } catch (error) {
        console.error(error);
        setStatus('Network Error. Could not connect to server.');
      }
    }
  });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-gray-950 transition-colors duration-300 pt-24 pb-24 px-6">
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-900 rounded-[3rem] shadow-xl border border-gray-100 dark:border-gray-800 p-10 md:p-16 relative overflow-hidden">
        
        {/* Decorative Background Blur */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 dark:bg-blue-500/20 blur-[80px] rounded-full pointer-events-none"></div>

        <div className="relative z-10">
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-3 tracking-wide">Book a Test Drive</h1>
          <p className="text-gray-500 dark:text-gray-400 mb-10 text-lg">Experience the thrill firsthand. Choose your car, and we will have it ready for you.</p>

          <form onSubmit={formik.handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* NAME */}
            <div className="md:col-span-2">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2 block">Full Name</label>
              <input 
                type="text" 
                placeholder="John Doe"
                className={`w-full bg-gray-50 dark:bg-gray-800 border ${formik.touched.name && formik.errors.name ? 'border-red-500' : 'border-gray-100 dark:border-gray-700'} rounded-2xl p-4 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none`}
                {...formik.getFieldProps('name')}
              />
              {formik.touched.name && formik.errors.name && (
                <div className="text-red-500 text-[10px] font-bold uppercase tracking-widest mt-2 px-2">{formik.errors.name}</div>
              )}
            </div>

            {/* MOBILE */}
            <div>
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2 block">Mobile Number</label>
              <input 
                type="tel" 
                placeholder="9876543210"
                className={`w-full bg-gray-50 dark:bg-gray-800 border ${formik.touched.mobile && formik.errors.mobile ? 'border-red-500' : 'border-gray-100 dark:border-gray-700'} rounded-2xl p-4 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none`}
                {...formik.getFieldProps('mobile')}
              />
              {formik.touched.mobile && formik.errors.mobile && (
                <div className="text-red-500 text-[10px] font-bold uppercase tracking-widest mt-2 px-2">{formik.errors.mobile}</div>
              )}
            </div>

            {/* CITY */}
            <div>
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2 block">City</label>
              <select 
                className={`w-full bg-gray-50 dark:bg-gray-800 border ${formik.touched.city && formik.errors.city ? 'border-red-500' : 'border-gray-100 dark:border-gray-700'} rounded-2xl p-4 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer`}
                {...formik.getFieldProps('city')}
              >
                <option value="" disabled>Select City...</option>
                {indianCities.map(city => <option key={city} value={city}>{city}</option>)}
              </select>
              {formik.touched.city && formik.errors.city && (
                <div className="text-red-500 text-[10px] font-bold uppercase tracking-widest mt-2 px-2">{formik.errors.city}</div>
              )}
            </div>

            {/* CAR SELECTION */}
            <div>
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2 block">Select Car</label>
              <select 
                className={`w-full bg-gray-50 dark:bg-gray-800 border ${formik.touched.car && formik.errors.car ? 'border-red-500' : 'border-gray-100 dark:border-gray-700'} rounded-2xl p-4 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer`}
                {...formik.getFieldProps('car')}
              >
                <option value="" disabled>Which car?</option>
                {cars.map((c, i) => (
                  <option key={i} value={c.modelDesc}>{c.modelDesc}</option>
                ))}
              </select>
              {formik.touched.car && formik.errors.car && (
                <div className="text-red-500 text-[10px] font-bold uppercase tracking-widest mt-2 px-2">{formik.errors.car}</div>
              )}
            </div>

            {/* PREFERRED DATE */}
            <div>
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2 block">Preferred Date</label>
              <input 
                type="date"
                className={`w-full bg-gray-50 dark:bg-gray-800 border ${formik.touched.preferredDate && formik.errors.preferredDate ? 'border-red-500' : 'border-gray-100 dark:border-gray-700'} rounded-2xl p-4 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer`}
                {...formik.getFieldProps('preferredDate')}
              />
              {formik.touched.preferredDate && formik.errors.preferredDate && (
                <div className="text-red-500 text-[10px] font-bold uppercase tracking-widest mt-2 px-2">{formik.errors.preferredDate}</div>
              )}
            </div>
            
            {/* SUBMIT BUTTON */}
            <div className="md:col-span-2 mt-4">
              <button type="submit" className="w-full bg-black dark:bg-white text-white dark:text-black font-black uppercase tracking-widest py-5 rounded-2xl hover:scale-[1.02] transition-transform duration-300">
                Confirm Booking
              </button>
            </div>
            
            {/* STATUS MESSAGE */}
            {status && (
              <div className={`md:col-span-2 mt-2 p-4 rounded-xl text-center font-bold text-sm ${status.includes('Error') || status.includes('Failed') ? 'bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400' : 'bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400'}`}>
                {status}
              </div>
            )}

          </form>
        </div>
      </div>
    </div>
  );
}

export default BookTestDrive;