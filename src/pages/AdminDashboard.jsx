import { useState, useEffect } from 'react';

function AdminDashboard() {
  const [testDrives, setTestDrives] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo(0, 0);
    
    // Fetch the data from your MongoDB API
    fetch(`${API_URL}/api/test-drives`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setTestDrives(data);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch test drives:", err);
        setLoading(false);
      });
  }, [API_URL]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-gray-950 pt-24 pb-20 px-6 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h1 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white uppercase tracking-widest">Admin Dashboard</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-2">Manage your test drive bookings.</p>
          </div>
          <div className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 px-4 py-2 rounded-lg font-bold text-sm">
            Total Leads: {testDrives.length}
          </div>
        </div>

        {loading ? (
          <div className="text-center text-gray-500 font-bold uppercase tracking-widest py-20">Loading leads...</div>
        ) : testDrives.length === 0 ? (
          <div className="text-center text-gray-500 bg-white dark:bg-gray-900 rounded-3xl p-10 shadow-sm border border-gray-100 dark:border-gray-800">
            No test drives booked yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testDrives.map((lead) => (
              <div key={lead._id} className="bg-white dark:bg-gray-900 p-6 rounded-3xl shadow-sm hover:shadow-xl transition-shadow border border-gray-100 dark:border-gray-800 relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-blue-600 text-white text-[10px] font-black px-3 py-1 rounded-bl-xl uppercase tracking-widest">
                  New Lead
                </div>
                
                <h3 className="text-xl font-black text-gray-900 dark:text-white mb-1 uppercase tracking-wider">{lead.name}</h3>
                <p className="text-blue-600 dark:text-blue-400 font-bold text-sm mb-4">{lead.mobile}</p>
                
                <div className="space-y-2 border-t border-gray-100 dark:border-gray-800 pt-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">Car</span>
                    <span className="text-gray-900 dark:text-white font-medium">{lead.car}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">City</span>
                    <span className="text-gray-900 dark:text-white font-medium">{lead.city}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">Pref. Date</span>
                    <span className="text-gray-900 dark:text-white font-medium">{lead.preferredDate}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">Booked On</span>
                    <span className="text-gray-500 font-medium text-xs">
                      {new Date(lead.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;