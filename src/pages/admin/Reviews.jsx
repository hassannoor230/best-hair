import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { apiClient } from "../../lib/apiClient";

const AdminReviews = () => {
  const [showModal, setShowModal] = useState(false);
  const [editingReview, setEditingReview] = useState(null);
  const [formData, setFormData] = useState({ customerName: "", rating: 5, review: "", source: "Manual", featured: false, approved: true });
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery("adminReviews", async () => {
    const res = await apiClient.get("/reviews");
    return res.data.data;
  });

  const createMutation = useMutation({
    mutationFn: (data) => apiClient.post("/reviews", data),
    onSuccess: () => {
      setShowModal(false);
      setEditingReview(null);
      setFormData({ customerName: "", rating: 5, review: "", source: "Manual", featured: false, approved: true });
      queryClient.invalidateQueries("adminReviews");
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => apiClient.put(`/reviews/${id}`, data),
    onSuccess: () => {
      setShowModal(false);
      setEditingReview(null);
      setFormData({ customerName: "", rating: 5, review: "", source: "Manual", featured: false, approved: true });
      queryClient.invalidateQueries("adminReviews");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => apiClient.delete(`/reviews/${id}`),
    onSuccess: () => queryClient.invalidateQueries("adminReviews"),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingReview) {
      updateMutation.mutate({ id: editingReview._id, data: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  const openEdit = (review) => {
    setEditingReview(review);
    setFormData({
      customerName: review.customerName,
      rating: review.rating,
      review: review.review,
      source: review.source || "Manual",
      featured: review.featured,
      approved: review.approved,
    });
    setShowModal(true);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-3xl font-['Manrope'] font-bold text-white mb-2">Reviews</h1>
          <p className="text-white/50">Manage customer reviews and testimonials</p>
        </div>
        <button onClick={() => { setEditingReview(null); setFormData({ customerName: "", rating: 5, review: "", source: "Manual", featured: false, approved: true }); setShowModal(true); }} className="bg-gradient-to-r from-[#C9A45C] to-[#d4af37] text-[#0a0a0a] px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-[#C9A45C]/20 transition-all duration-300">
          + Add Review
        </button>
      </div>

      {isLoading ? (
        <div className="text-white">Loading...</div>
      ) : (
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden">
          <table className="w-full">
            <thead className="bg-white/5">
              <tr>
                <th className="px-8 py-4 text-left text-xs font-semibold text-white/60 uppercase tracking-wider">Customer</th>
                <th className="px-8 py-4 text-left text-xs font-semibold text-white/60 uppercase tracking-wider">Rating</th>
                <th className="px-8 py-4 text-left text-xs font-semibold text-white/60 uppercase tracking-wider">Review</th>
                <th className="px-8 py-4 text-left text-xs font-semibold text-white/60 uppercase tracking-wider">Source</th>
                <th className="px-8 py-4 text-left text-xs font-semibold text-white/60 uppercase tracking-wider">Status</th>
                <th className="px-8 py-4 text-left text-xs font-semibold text-white/60 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {data?.map((review) => (
                <tr key={review._id} className="hover:bg-white/5 transition-colors">
                  <td className="px-8 py-5 text-white font-medium">{review.customerName}</td>
                  <td className="px-8 py-5">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className={`w-4 h-4 ${i < review.rating ? "text-[#C9A45C] fill-[#C9A45C]" : "text-white/20"}`} viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>
                      ))}
                    </div>
                  </td>
                  <td className="px-8 py-5 text-white/70 max-w-xs truncate">{review.review}</td>
                  <td className="px-8 py-5 text-white/70">{review.source}</td>
                  <td className="px-8 py-5">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${review.approved ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"}`}>
                      {review.approved ? "Approved" : "Pending"}
                    </span>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center space-x-3">
                      <button onClick={() => openEdit(review)} className="inline-flex items-center space-x-1.5 text-[#C9A45C] hover:text-[#d4af37] font-medium text-sm bg-[#C9A45C]/10 hover:bg-[#C9A45C]/20 px-3 py-1.5 rounded-lg transition-all duration-200">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                        <span>Edit</span>
                      </button>
                      <button onClick={() => deleteMutation.mutate(review._id)} className="inline-flex items-center space-x-1.5 text-red-400 hover:text-red-300 font-medium text-sm bg-red-500/10 hover:bg-red-500/20 px-3 py-1.5 rounded-lg transition-all duration-200">
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
              <h2 className="text-2xl font-['Manrope'] font-bold text-white">{editingReview ? "Edit Review" : "Add New Review"}</h2>
              <button onClick={() => { setShowModal(false); setEditingReview(null); }} className="text-white/50 hover:text-white">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">Customer Name</label>
                <input value={formData.customerName} onChange={(e) => setFormData({ ...formData, customerName: e.target.value })} required className="w-full px-4 py-3 bg-white/10 text-white rounded-xl border border-white/10 focus:border-[#C9A45C]" placeholder="Ali R." />
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">Rating</label>
                  <select value={formData.rating} onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })} className="w-full px-4 py-3 bg-white/10 text-white rounded-xl border border-white/10 focus:border-[#C9A45C]">
                    {[1, 2, 3, 4, 5].map((r) => <option key={r} value={r}>{r} Star{r > 1 ? "s" : ""}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">Source</label>
                  <input value={formData.source} onChange={(e) => setFormData({ ...formData, source: e.target.value })} className="w-full px-4 py-3 bg-white/10 text-white rounded-xl border border-white/10 focus:border-[#C9A45C]" placeholder="Google" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">Review</label>
                <textarea value={formData.review} onChange={(e) => setFormData({ ...formData, review: e.target.value })} required rows="4" className="w-full px-4 py-3 bg-white/10 text-white rounded-xl border border-white/10 focus:border-[#C9A45C]" placeholder="Customer review..." />
              </div>
              <div className="flex items-center space-x-6">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input type="checkbox" checked={formData.featured} onChange={(e) => setFormData({ ...formData, featured: e.target.checked })} className="w-5 h-5 rounded bg-white/10 border-white/20 text-[#C9A45C]" />
                  <span className="text-white/80">Featured</span>
                </label>
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input type="checkbox" checked={formData.approved} onChange={(e) => setFormData({ ...formData, approved: e.target.checked })} className="w-5 h-5 rounded bg-white/10 border-white/20 text-[#C9A45C]" />
                  <span className="text-white/80">Approved</span>
                </label>
              </div>
              <div className="flex justify-end space-x-4 pt-4">
                <button type="button" onClick={() => { setShowModal(false); setEditingReview(null); }} className="px-6 py-3 text-white/70 hover:text-white font-medium transition-colors">Cancel</button>
                <button type="submit" disabled={createMutation.isLoading || updateMutation.isLoading} className="bg-gradient-to-r from-[#C9A45C] to-[#d4af37] text-[#0a0a0a] px-8 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-[#C9A45C]/20 transition-all duration-300 disabled:opacity-50">
                  {editingReview ? "Update Review" : "Add Review"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminReviews;
