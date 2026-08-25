import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { apiClient } from "../../lib/apiClient";

const AdminAppointments = () => {
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery("adminAppointments", async () => {
    const res = await apiClient.get("/appointments");
    return res.data.data;
  });

  const statusMutation = useMutation({
    mutationFn: ({ id, status }) => apiClient.patch(`/appointments/${id}/status`, { status }),
    onSuccess: () => queryClient.invalidateQueries("adminAppointments"),
  });

  return (
    <div>
      <h1 className="text-3xl font-['Manrope'] font-bold text-white mb-10">Appointments</h1>
      {isLoading ? (
        <div className="text-white">Loading...</div>
      ) : (
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-white/5">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-white/60 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-white/60 uppercase tracking-wider">Phone</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-white/60 uppercase tracking-wider">Service</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-white/60 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-white/60 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {data?.map((apt) => (
                <tr key={apt._id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 text-white">{apt.customerName}</td>
                  <td className="px-6 py-4 text-white/70">{apt.phone}</td>
                  <td className="px-6 py-4 text-white/70">{apt.service}</td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 rounded-full text-xs bg-yellow-500/20 text-yellow-400">{apt.status}</span>
                  </td>
                  <td className="px-6 py-4">
                    <button onClick={() => statusMutation.mutate({ id: apt._id, status: "confirmed" })} className="text-green-400 hover:text-green-300 mr-3 text-sm font-medium">Confirm</button>
                    <button onClick={() => statusMutation.mutate({ id: apt._id, status: "rejected" })} className="text-red-400 hover:text-red-300 text-sm font-medium">Reject</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminAppointments;
