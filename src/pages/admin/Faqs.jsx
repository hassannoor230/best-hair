import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { apiClient } from "../../lib/apiClient";

const AdminFaqs = () => {
  const [showModal, setShowModal] = useState(false);
  const [editingFaq, setEditingFaq] = useState(null);
  const [formData, setFormData] = useState({ question: "", answer: "", category: "General", sortOrder: 0, active: true });
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery("adminFaqs", async () => {
    const res = await apiClient.get("/faqs");
    return res.data.data;
  });

  const createMutation = useMutation({
    mutationFn: (data) => apiClient.post("/faqs", data),
    onSuccess: () => {
      setShowModal(false);
      setEditingFaq(null);
      setFormData({ question: "", answer: "", category: "General", sortOrder: 0, active: true });
      queryClient.invalidateQueries("adminFaqs");
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => apiClient.put(`/faqs/${id}`, data),
    onSuccess: () => {
      setShowModal(false);
      setEditingFaq(null);
      setFormData({ question: "", answer: "", category: "General", sortOrder: 0, active: true });
      queryClient.invalidateQueries("adminFaqs");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => apiClient.delete(`/faqs/${id}`),
    onSuccess: () => queryClient.invalidateQueries("adminFaqs"),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingFaq) {
      updateMutation.mutate({ id: editingFaq._id, data: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  const openEdit = (faq) => {
    setEditingFaq(faq);
    setFormData({
      question: faq.question,
      answer: faq.answer,
      category: faq.category,
      sortOrder: faq.sortOrder || 0,
      active: faq.active,
    });
    setShowModal(true);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-3xl font-['Manrope'] font-bold text-white mb-2">FAQs</h1>
          <p className="text-white/50">Manage frequently asked questions</p>
        </div>
        <button onClick={() => { setEditingFaq(null); setFormData({ question: "", answer: "", category: "General", sortOrder: 0, active: true }); setShowModal(true); }} className="bg-gradient-to-r from-[#C9A45C] to-[#d4af37] text-[#0a0a0a] px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-[#C9A45C]/20 transition-all duration-300">
          + Add FAQ
        </button>
      </div>

      {isLoading ? (
        <div className="text-white">Loading...</div>
      ) : (
        <div className="space-y-4">
          {data?.map((faq) => (
            <div key={faq._id} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-[#C9A45C]/30 transition-all duration-300">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="px-3 py-1 rounded-full text-xs bg-[#C9A45C]/20 text-[#C9A45C] font-medium">{faq.category}</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${faq.active ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>
                      {faq.active ? "Active" : "Inactive"}
                    </span>
                  </div>
                  <h3 className="text-white font-semibold text-lg mb-2">{faq.question}</h3>
                  <p className="text-white/60 leading-relaxed">{faq.answer}</p>
                </div>
              <div className="flex items-center space-x-3 ml-4">
                <button onClick={() => openEdit(faq)} className="inline-flex items-center space-x-1.5 text-[#C9A45C] hover:text-[#d4af37] font-medium text-sm bg-[#C9A45C]/10 hover:bg-[#C9A45C]/20 px-3 py-1.5 rounded-lg transition-all duration-200">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                  <span>Edit</span>
                </button>
                <button onClick={() => deleteMutation.mutate(faq._id)} className="inline-flex items-center space-x-1.5 text-red-400 hover:text-red-300 font-medium text-sm bg-red-500/10 hover:bg-red-500/20 px-3 py-1.5 rounded-lg transition-all duration-200">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                  <span>Delete</span>
                </button>
              </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#172A3A] rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-['Manrope'] font-bold text-white">{editingFaq ? "Edit FAQ" : "Add New FAQ"}</h2>
              <button onClick={() => { setShowModal(false); setEditingFaq(null); }} className="text-white/50 hover:text-white">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">Question</label>
                <input value={formData.question} onChange={(e) => setFormData({ ...formData, question: e.target.value })} required className="w-full px-4 py-3 bg-white/10 text-white rounded-xl border border-white/10 focus:border-[#C9A45C]" placeholder="What are your salon hours?" />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">Answer</label>
                <textarea value={formData.answer} onChange={(e) => setFormData({ ...formData, answer: e.target.value })} required rows="4" className="w-full px-4 py-3 bg-white/10 text-white rounded-xl border border-white/10 focus:border-[#C9A45C]" placeholder="We are open from..." />
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">Category</label>
                  <input value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} required className="w-full px-4 py-3 bg-white/10 text-white rounded-xl border border-white/10 focus:border-[#C9A45C]" placeholder="General" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">Sort Order</label>
                  <input type="number" value={formData.sortOrder} onChange={(e) => setFormData({ ...formData, sortOrder: parseInt(e.target.value) })} className="w-full px-4 py-3 bg-white/10 text-white rounded-xl border border-white/10 focus:border-[#C9A45C]" placeholder="0" />
                </div>
              </div>
              <label className="flex items-center space-x-3 cursor-pointer">
                <input type="checkbox" checked={formData.active} onChange={(e) => setFormData({ ...formData, active: e.target.checked })} className="w-5 h-5 rounded bg-white/10 border-white/20 text-[#C9A45C]" />
                <span className="text-white/80">Active</span>
              </label>
              <div className="flex justify-end space-x-4 pt-4">
                <button type="button" onClick={() => { setShowModal(false); setEditingFaq(null); }} className="px-6 py-3 text-white/70 hover:text-white font-medium transition-colors">Cancel</button>
                <button type="submit" disabled={createMutation.isLoading || updateMutation.isLoading} className="bg-gradient-to-r from-[#C9A45C] to-[#d4af37] text-[#0a0a0a] px-8 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-[#C9A45C]/20 transition-all duration-300 disabled:opacity-50">
                  {editingFaq ? "Update FAQ" : "Add FAQ"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminFaqs;
