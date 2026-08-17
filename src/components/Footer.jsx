import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-white dark:bg-black border-t border-gray-200 dark:border-gray-900 pt-16 pb-8 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        
        {/* Brand Section */}
        <div className="md:col-span-1">
          <Link to="/" className="text-3xl font-black tracking-widest text-black dark:text-white uppercase inline-block mb-4">
            NEXA<span className="text-blue-600">.</span>
          </Link>
          <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-6">
            Create. Inspire. Evolve. Experience the premium automotive lifestyle with advanced technology and stunning designs.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-gray-900 dark:text-white font-black uppercase tracking-widest text-sm mb-6">Explore</h3>
          <ul className="flex flex-col gap-4">
            <li><Link to="/" className="text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 text-sm font-medium transition-colors">Lineup</Link></li>
            <li><Link to="/contact" className="text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 text-sm font-medium transition-colors">Contact Us</Link></li>
            <li><a href="#" className="text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 text-sm font-medium transition-colors">Book a Test Drive</a></li>
          </ul>
        </div>

        {/* Models */}
        <div>
          <h3 className="text-gray-900 dark:text-white font-black uppercase tracking-widest text-sm mb-6">Models</h3>
          <ul className="flex flex-col gap-4">
            <li><Link to="/car/FR" className="text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 text-sm font-medium transition-colors">FRONX</Link></li>
            <li><Link to="/car/GV" className="text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 text-sm font-medium transition-colors">Grand Vitara</Link></li>
            <li><Link to="/car/IN" className="text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 text-sm font-medium transition-colors">Invicto</Link></li>
            <li><Link to="/car/JM" className="text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 text-sm font-medium transition-colors">Jimny</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-gray-900 dark:text-white font-black uppercase tracking-widest text-sm mb-6">Get in Touch</h3>
          <ul className="flex flex-col gap-4">
            <li className="text-gray-500 text-sm font-medium">1800 102 1800 (Toll Free)</li>
            <li className="text-gray-500 text-sm font-medium">contact@nexaexperience.com</li>
            <li className="text-gray-500 text-sm font-medium mt-2">Available 24/7 for our premium customers.</li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="max-w-7xl mx-auto px-6 border-t border-gray-200 dark:border-gray-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-gray-400 dark:text-gray-600 text-xs font-medium">
          © {new Date().getFullYear()} NEXA Experience. All rights reserved.
        </p>
        <div className="flex gap-4">
          <a href="#" className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition">Privacy Policy</a>
          <a href="#" className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition">Terms & Conditions</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;