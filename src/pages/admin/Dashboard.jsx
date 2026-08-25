import React from "react";
import { useQuery } from "react-query";
import { apiClient } from "../../lib/apiClient";

const AdminDashboard = () => {
  const { data: appointments } = useQuery("adminAppointments", async () => {
    const res = await apiClient.get("/appointments");
    return res.data.data;
  });

  const { data: services } = useQuery("adminServices", async () => {
    const res = await apiClient.get("/services");
    return res.data.data;
  });

  const { data: contacts } = useQuery("adminContacts", async () => {
    const res = await apiClient.get("/contact");
    return res.data.data;
  });

  const stats = [
    { title: "Pending Appointments", value: appointments?.filter((a) => a.status === "pending").length || 0, change: "+12%", trend: "up" },
    { title: "Total Services", value: services?.length || 0, change: "+2", trend: "up" },
    { title: "New Enquiries", value: contacts?.filter((c) => c.status === "new").length || 0, change: "+5", trend: "up" },
    { title: "Total Revenue", value: "Rs. 45,000", change: "+18%", trend: "up" },
  ];

  return (
    <div>
      <div className="mb-12">
        <h1 className="text-3xl font-['Manrope'] font-bold text-white mb-2">Dashboard</h1>
        <p className="text-white/50">Welcome back! Here's what's happening with your salon today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-[#C9A45C]/30 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <p className="text-white/60 text-sm font-medium uppercase tracking-wider">{stat.title}</p>
              <span className="text-green-400 text-xs font-semibold bg-green-400/10 px-2 py-1 rounded-full">{stat.change}</span>
            </div>
            <p className="text-4xl font-bold text-white mb-1">{stat.value}</p>
            <div className="h-1 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-[#C9A45C] to-[#d4af37] rounded-full" style={{ width: `${60 + idx * 10}%` }} />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
          <h3 className="text-xl font-['Manrope'] font-bold text-white mb-6">Recent Appointments</h3>
          <div className="space-y-4">
            {appointments?.slice(0, 5).map((apt, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                <div>
                  <p className="text-white font-medium">{apt.customerName}</p>
                  <p className="text-white/50 text-sm">{apt.service}</p>
                </div>
                <span className="px-3 py-1 rounded-full text-xs bg-yellow-500/20 text-yellow-400">{apt.status}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
          <h3 className="text-xl font-['Manrope'] font-bold text-white mb-6">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            <a href="/admin/services" className="p-6 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#C9A45C]/30 rounded-xl transition-all duration-300 group">
              <div className="w-12 h-12 bg-[#C9A45C]/20 rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#C9A45C]/30 transition-colors">
                <svg className="w-6 h-6 text-[#C9A45C]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
              </div>
              <p className="text-white font-semibold">Add Service</p>
              <p className="text-white/50 text-sm">Create new service</p>
            </a>
            <a href="/admin/reviews" className="p-6 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#C9A45C]/30 rounded-xl transition-all duration-300 group">
              <div className="w-12 h-12 bg-[#C9A45C]/20 rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#C9A45C]/30 transition-colors">
                <svg className="w-6 h-6 text-[#C9A45C]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>
              </div>
              <p className="text-white font-semibold">Add Review</p>
              <p className="text-white/50 text-sm">Add customer review</p>
            </a>
            <a href="/admin/gallery" className="p-6 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#C9A45C]/30 rounded-xl transition-all duration-300 group">
              <div className="w-12 h-12 bg-[#C9A45C]/20 rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#C9A45C]/30 transition-colors">
                <svg className="w-6 h-6 text-[#C9A45C]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              </div>
              <p className="text-white font-semibold">Add Gallery</p>
              <p className="text-white/50 text-sm">Upload new image</p>
            </a>
            <a href="/admin/settings" className="p-6 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#C9A45C]/30 rounded-xl transition-all duration-300 group">
              <div className="w-12 h-12 bg-[#C9A45C]/20 rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#C9A45C]/30 transition-colors">
                <svg className="w-6 h-6 text-[#C9A45C]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /></svg>
              </div>
              <p className="text-white font-semibold">Settings</p>
              <p className="text-white/50 text-sm">Manage website</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
