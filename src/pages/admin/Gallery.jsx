import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { apiClient } from "../../lib/apiClient";

const AdminGallery = () => {
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({ title: "", description: "", imageUrl: "", category: "Salon", altText: "", featured: false, sortOrder: 0, active: true });
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery("adminGallery", async () => {
    const res = await apiClient.get("/gallery");
    return res.data.data;
  });

  const createMutation = useMutation({
    mutationFn: (data) => apiClient.post("/gallery", data),
    onSuccess: () => {
      setShowModal(false);
      setEditingItem(null);
      setFormData({ title: "", description: "", imageUrl: "", category: "Salon", altText: "", featured: false, sortOrder: 0, active: true });
      queryClient.invalidateQueries("adminGallery");
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => apiClient.put(`/gallery/${id}`, data),
    onSuccess: () => {
      setShowModal(false);
      setEditingItem(null);
      setFormData({ title: "", description: "", imageUrl: "", category: "Salon", altText: "", featured: false, sortOrder: 0, active: true });
      queryClient.invalidateQueries("adminGallery");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => apiClient.delete(`/gallery/${id}`),
    onSuccess: () => queryClient.invalidateQueries("adminGallery"),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingItem) {
      updateMutation.mutate({ id: editingItem._id, data: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  const openEdit = (item) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      description: item.description || "",
      imageUrl: item.imageUrl,
      category: item.category,
      altText: item.altText || "",
      featured: item.featured,
      sortOrder: item.sortOrder || 0,
      active: item.active,
    });
    setShowModal(true);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-3xl font-['Manrope'] font-bold text-white mb-2">Gallery</h1>
          <p className="text-white/50">Manage salon photos and portfolio</p>
        </div>
        <button onClick={() => { setEditingItem(null); setFormData({ title: "", description: "", imageUrl: "", category: "Salon", altText: "", featured: false, sortOrder: 0, active: true }); setShowModal(true); }} className="bg-gradient-to-r from-[#C9A45C] to-[#d4af37] text-[#0a0a0a] px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-[#C9A45C]/20 transition-all duration-300">
          + Add Image
        </button>
      </div>

      {isLoading ? (
        <div className="text-white">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {data?.map((item) => (
            <div key={item._id} className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-[#C9A45C]/30 transition-all duration-300">
              <div className="aspect-video bg-white/10 relative overflow-hidden">
                {item.imageUrl ? (
                  <img src={item.imageUrl} alt={item.altText || item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white/30">
                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  </div>
                )}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-3">
                  <button onClick={() => openEdit(item)} className="inline-flex items-center space-x-1.5 text-white hover:text-[#C9A45C] bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg transition-all duration-200">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                    <span>Edit</span>
                  </button>
                  <button onClick={() => deleteMutation.mutate(item._id)} className="inline-flex items-center space-x-1.5 text-white hover:text-red-400 bg-white/10 hover:bg-red-500/20 px-3 py-1.5 rounded-lg transition-all duration-200">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    <span>Delete</span>
                  </button>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-white font-medium truncate">{item.title || "Untitled"}</h3>
                <p className="text-white/50 text-sm">{item.category}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#172A3A] rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-['Manrope'] font-bold text-white">{editingItem ? "Edit Gallery Image" : "Add Gallery Image"}</h2>
              <button onClick={() => { setShowModal(false); setEditingItem(null); }} className="text-white/50 hover:text-white">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">Title</label>
                <input value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required className="w-full px-4 py-3 bg-white/10 text-white rounded-xl border border-white/10 focus:border-[#C9A45C]" placeholder="Salon Interior" />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">Description</label>
                <textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} rows="2" className="w-full px-4 py-3 bg-white/10 text-white rounded-xl border border-white/10 focus:border-[#C9A45C]" placeholder="Image description..." />
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">Image URL</label>
                  <input value={formData.imageUrl} onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })} required className="w-full px-4 py-3 bg-white/10 text-white rounded-xl border border-white/10 focus:border-[#C9A45C]" placeholder="https://..." />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">Category</label>
                  <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="w-full px-4 py-3 bg-white/10 text-white rounded-xl border border-white/10 focus:border-[#C9A45C]">
                    <option value="Haircuts">Haircuts</option>
                    <option value="Beard">Beard</option>
                    <option value="Salon">Salon</option>
                    <option value="Interior">Interior</option>
                    <option value="Team">Team</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">Alt Text</label>
                <input value={formData.altText} onChange={(e) => setFormData({ ...formData, altText: e.target.value })} className="w-full px-4 py-3 bg-white/10 text-white rounded-xl border border-white/10 focus:border-[#C9A45C]" placeholder="Image description for accessibility" />
              </div>
              <div className="flex items-center space-x-6">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input type="checkbox" checked={formData.featured} onChange={(e) => setFormData({ ...formData, featured: e.target.checked })} className="w-5 h-5 rounded bg-white/10 border-white/20 text-[#C9A45C]" />
                  <span className="text-white/80">Featured</span>
                </label>
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input type="checkbox" checked={formData.active} onChange={(e) => setFormData({ ...formData, active: e.target.checked })} className="w-5 h-5 rounded bg-white/10 border-white/20 text-[#C9A45C]" />
                  <span className="text-white/80">Active</span>
                </label>
              </div>
              <div className="flex justify-end space-x-4 pt-4">
                <button type="button" onClick={() => { setShowModal(false); setEditingItem(null); }} className="px-6 py-3 text-white/70 hover:text-white font-medium transition-colors">Cancel</button>
                <button type="submit" disabled={createMutation.isLoading || updateMutation.isLoading} className="bg-gradient-to-r from-[#C9A45C] to-[#d4af37] text-[#0a0a0a] px-8 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-[#C9A45C]/20 transition-all duration-300 disabled:opacity-50">
                  {editingItem ? "Update Image" : "Add Image"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminGallery;
