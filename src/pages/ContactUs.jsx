import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

function ContactUs() {
  const [status, setStatus] = useState('');
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // 1. FORMIK CONFIGURATION
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      message: ''
    },
    // 2. YUP VALIDATION SCHEMA
    validationSchema: Yup.object({
      name: Yup.string()
        .min(2, 'Name is too short')
        .required('Name is required'),
      email: Yup.string()
        .email('Please enter a valid email address')
        .required('Email is required'),
      message: Yup.string()
        .min(10, 'Please provide a bit more detail (min 10 characters)')
        .required('Message is required')
    }),
    // 3. SUBMIT HANDLER
    onSubmit: async (values, { resetForm }) => {
      setStatus('Sending...');
      try {
        const response = await fetch(`${API_URL}/api/contact`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(values)
        });
        
        if (response.ok) {
          setStatus('Message sent successfully! We will get back to you shortly.');
          resetForm(); // Clears the form magically!
        } else {
          setStatus('Failed to send message.');
        }
      } catch (error) {
        console.error(error);
        setStatus('Error connecting to server.');
      }
    }
  });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-gray-950 transition-colors duration-300 pt-20 pb-24 px-6">
      <div className="max-w-2xl mx-auto bg-white dark:bg-gray-900 rounded-[3rem] shadow-xl hover:shadow-2xl transition-shadow duration-300 border border-gray-100 dark:border-gray-800 p-10 md:p-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 dark:bg-blue-500/20 blur-[80px] rounded-full pointer-events-none"></div>

        <div className="relative z-10">
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-3 tracking-wide">Get in Touch</h1>
          <p className="text-gray-500 dark:text-gray-400 mb-10 text-lg">Have a question about our lineup? Drop us a message.</p>

          <form onSubmit={formik.handleSubmit} className="flex flex-col gap-6">
            
            {/* NAME FIELD */}
            <div>
              <label className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-2 block">Name</label>
              <input 
                type="text" 
                placeholder="John Doe"
                className={`w-full bg-gray-50 dark:bg-gray-800 border ${formik.touched.name && formik.errors.name ? 'border-red-500' : 'border-gray-100 dark:border-gray-700'} rounded-2xl p-4 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all`}
                {...formik.getFieldProps('name')}
              />
              {/* ERROR MESSAGE */}
              {formik.touched.name && formik.errors.name && (
                <div className="text-red-500 text-[10px] font-bold uppercase tracking-widest mt-2 px-2">{formik.errors.name}</div>
              )}
            </div>
            
            {/* EMAIL FIELD */}
            <div>
              <label className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-2 block">Email</label>
              <input 
                type="email" 
                placeholder="john@example.com"
                className={`w-full bg-gray-50 dark:bg-gray-800 border ${formik.touched.email && formik.errors.email ? 'border-red-500' : 'border-gray-100 dark:border-gray-700'} rounded-2xl p-4 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all`}
                {...formik.getFieldProps('email')}
              />
              {/* ERROR MESSAGE */}
              {formik.touched.email && formik.errors.email && (
                <div className="text-red-500 text-[10px] font-bold uppercase tracking-widest mt-2 px-2">{formik.errors.email}</div>
              )}
            </div>
            
            {/* MESSAGE FIELD */}
            <div>
              <label className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-2 block">Message</label>
              <textarea 
                rows="5" 
                placeholder="How can we help you today?"
                className={`w-full bg-gray-50 dark:bg-gray-800 border ${formik.touched.message && formik.errors.message ? 'border-red-500' : 'border-gray-100 dark:border-gray-700'} rounded-2xl p-4 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none resize-none transition-all`}
                {...formik.getFieldProps('message')}
              />
              {/* ERROR MESSAGE */}
              {formik.touched.message && formik.errors.message && (
                <div className="text-red-500 text-[10px] font-bold uppercase tracking-widest mt-2 px-2">{formik.errors.message}</div>
              )}
            </div>
            
            <button type="submit" className="w-full mt-4 bg-blue-600 text-white font-black uppercase tracking-widest py-5 rounded-2xl hover:bg-blue-700 hover:shadow-[0_10px_20px_rgba(37,99,235,0.3)] hover:-translate-y-1 transition-all duration-300">
              Send Message
            </button>
            
            {status && (
              <div className={`mt-4 p-4 rounded-xl text-center font-bold text-sm ${status.includes('Error') || status.includes('Failed') ? 'bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400' : 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'}`}>
                {status}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;