import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { apiClient } from "../../lib/apiClient";

const AdminServices = () => {
  const [showModal, setShowModal] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [formData, setFormData] = useState({ name: "", description: "", category: "Haircut", price: "", duration: "", image: "", featured: false, active: true });
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery("adminServices", async () => {
    const res = await apiClient.get("/services");
    return res.data.data;
  });

  const createMutation = useMutation({
    mutationFn: (data) => apiClient.post("/services", data),
    onSuccess: () => {
      setShowModal(false);
      setEditingService(null);
      setFormData({ name: "", description: "", category: "Haircut", price: "", duration: "", image: "", featured: false, active: true });
      queryClient.invalidateQueries("adminServices");
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => apiClient.put(`/services/${id}`, data),
    onSuccess: () => {
      setShowModal(false);
      setEditingService(null);
      setFormData({ name: "", description: "", category: "Haircut", price: "", duration: "", image: "", featured: false, active: true });
      queryClient.invalidateQueries("adminServices");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => apiClient.delete(`/services/${id}`),
    onSuccess: () => queryClient.invalidateQueries("adminServices"),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      price: Number(formData.price),
      duration: Number(formData.duration),
      slug: formData.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, ""),
    };
    if (editingService) {
      updateMutation.mutate({ id: editingService._id, data: payload });
    } else {
      createMutation.mutate(payload);
    }
  };

  const openEdit = (service) => {
    setEditingService(service);
    setFormData({
      name: service.name,
      description: service.description || "",
      category: service.category,
      price: service.price.toString(),
      duration: service.duration.toString(),
      image: service.image || "",
      featured: service.featured,
      active: service.active,
    });
    setShowModal(true);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-3xl font-['Manrope'] font-bold text-white mb-2">Services</h1>
          <p className="text-white/50">Manage your salon services and pricing</p>
        </div>
        <button onClick={() => { setEditingService(null); setFormData({ name: "", description: "", category: "Haircut", price: "", duration: "", image: "", featured: false, active: true }); setShowModal(true); }} className="bg-gradient-to-r from-[#C9A45C] to-[#d4af37] text-[#0a0a0a] px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-[#C9A45C]/20 transition-all duration-300">
          + Add Service
        </button>
      </div>

      {isLoading ? (
        <div className="text-white">Loading...</div>
      ) : (
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden">
          <table className="w-full">
            <thead className="bg-white/5">
              <tr>
                <th className="px-8 py-4 text-left text-xs font-semibold text-white/60 uppercase tracking-wider">Service</th>
                <th className="px-8 py-4 text-left text-xs font-semibold text-white/60 uppercase tracking-wider">Category</th>
                <th className="px-8 py-4 text-left text-xs font-semibold text-white/60 uppercase tracking-wider">Price</th>
                <th className="px-8 py-4 text-left text-xs font-semibold text-white/60 uppercase tracking-wider">Duration</th>
                <th className="px-8 py-4 text-left text-xs font-semibold text-white/60 uppercase tracking-wider">Status</th>
                <th className="px-8 py-4 text-left text-xs font-semibold text-white/60 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {data?.map((service) => (
                <tr key={service._id} className="hover:bg-white/5 transition-colors">
                  <td className="px-8 py-5">
                    <div>
                      <p className="text-white font-medium">{service.name}</p>
                      <p className="text-white/50 text-sm">{service.description?.substring(0, 50)}...</p>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span className="px-3 py-1 rounded-full text-xs bg-white/10 text-white/80">{service.category}</span>
                  </td>
                  <td className="px-8 py-5 text-white font-semibold">Rs. {service.price}</td>
                  <td className="px-8 py-5 text-white/70">{service.duration} min</td>
                  <td className="px-8 py-5">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${service.active ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>
                      {service.active ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center space-x-3">
                      <button onClick={() => openEdit(service)} className="inline-flex items-center space-x-1.5 text-[#C9A45C] hover:text-[#d4af37] font-medium text-sm bg-[#C9A45C]/10 hover:bg-[#C9A45C]/20 px-3 py-1.5 rounded-lg transition-all duration-200">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                        <span>Edit</span>
                      </button>
                      <button onClick={() => deleteMutation.mutate(service._id)} className="inline-flex items-center space-x-1.5 text-red-400 hover:text-red-300 font-medium text-sm bg-red-500/10 hover:bg-red-500/20 px-3 py-1.5 rounded-lg transition-all duration-200">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                        <span>Delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#172A3A] rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-['Manrope'] font-bold text-white">{editingService ? "Edit Service" : "Add New Service"}</h2>
              <button onClick={() => { setShowModal(false); setEditingService(null); }} className="text-white/50 hover:text-white">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">Service Name</label>
                <input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required className="w-full px-4 py-3 bg-white/10 text-white rounded-xl border border-white/10 focus:border-[#C9A45C] focus:ring-1 focus:ring-[#C9A45C]" placeholder="Classic Haircut" />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">Description</label>
                <textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} rows="3" className="w-full px-4 py-3 bg-white/10 text-white rounded-xl border border-white/10 focus:border-[#C9A45C] focus:ring-1 focus:ring-[#C9A45C]" placeholder="Service description..." />
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">Category</label>
                  <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="w-full px-4 py-3 bg-white/10 text-white rounded-xl border border-white/10 focus:border-[#C9A45C]">
                    <option value="Haircut">Haircut</option>
                    <option value="Beard Grooming">Beard Grooming</option>
                    <option value="Hair Styling">Hair Styling</option>
                    <option value="Shaving">Shaving</option>
                    <option value="Hair Treatment">Hair Treatment</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">Price (Rs.)</label>
                  <input type="number" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} required className="w-full px-4 py-3 bg-white/10 text-white rounded-xl border border-white/10 focus:border-[#C9A45C]" placeholder="500" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">Duration (minutes)</label>
                  <input type="number" value={formData.duration} onChange={(e) => setFormData({ ...formData, duration: e.target.value })} required className="w-full px-4 py-3 bg-white/10 text-white rounded-xl border border-white/10 focus:border-[#C9A45C]" placeholder="30" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">Image URL</label>
                  <input value={formData.image} onChange={(e) => setFormData({ ...formData, image: e.target.value })} className="w-full px-4 py-3 bg-white/10 text-white rounded-xl border border-white/10 focus:border-[#C9A45C]" placeholder="https://..." />
                </div>
              </div>
              <div className="flex items-center space-x-6">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input type="checkbox" checked={formData.featured} onChange={(e) => setFormData({ ...formData, featured: e.target.checked })} className="w-5 h-5 rounded bg-white/10 border-white/20 text-[#C9A45C] focus:ring-[#C9A45C]" />
                  <span className="text-white/80">Featured</span>
                </label>
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input type="checkbox" checked={formData.active} onChange={(e) => setFormData({ ...formData, active: e.target.checked })} className="w-5 h-5 rounded bg-white/10 border-white/20 text-[#C9A45C] focus:ring-[#C9A45C]" />
                  <span className="text-white/80">Active</span>
                </label>
              </div>
              <div className="flex justify-end space-x-4 pt-4">
                <button type="button" onClick={() => { setShowModal(false); setEditingService(null); }} className="px-6 py-3 text-white/70 hover:text-white font-medium transition-colors">Cancel</button>
                <button type="submit" disabled={createMutation.isLoading || updateMutation.isLoading} className="bg-gradient-to-r from-[#C9A45C] to-[#d4af37] text-[#0a0a0a] px-8 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-[#C9A45C]/20 transition-all duration-300 disabled:opacity-50">
                  {editingService ? "Update Service" : "Create Service"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminServices;
