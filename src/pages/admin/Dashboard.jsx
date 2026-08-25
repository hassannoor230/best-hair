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

  const stats = [
    { title: "Pending Appointments", value: appointments?.filter((a) => a.status === "pending").length || 0 },
    { title: "Total Services", value: services?.length || 0 },
  ];

  return (
    <div>
      <h1 className="text-3xl font-['Manrope'] font-bold text-white mb-10">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-sm">
            <p className="text-white/60 text-sm mb-2 uppercase tracking-wider">{stat.title}</p>
            <p className="text-4xl font-bold text-white">{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
