import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { apiClient } from "../../lib/apiClient";

const AdminSettings = () => {
  const queryClient = useQueryClient();
  const [saved, setSaved] = useState(false);

  const { data, isLoading } = useQuery("business", async () => {
    const res = await apiClient.get("/business");
    return res.data.data;
  });

  const updateMutation = useMutation({
    mutationFn: (data) => apiClient.put("/business", data),
    onSuccess: () => {
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
      queryClient.invalidateQueries("business");
    },
  });

  const [form, setForm] = useState({});

  React.useEffect(() => {
    if (data) {
      setForm({
        businessName: data.businessName || "",
        phone: data.phone || "",
        address: data.address || "",
      });
    }
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateMutation.mutate(form);
  };

  if (isLoading) return <div className="text-white">Loading...</div>;

  return (
    <div>
      <h1 className="text-3xl font-['Manrope'] font-bold text-white mb-10">Business Settings</h1>
      {saved && (
        <div className="bg-green-500/20 text-green-400 px-6 py-4 rounded-sm mb-8 border border-green-500/30">
          Settings saved successfully!
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-sm p-8">
          <h2 className="text-xl font-['Manrope'] font-bold text-white mb-6">General</h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm text-white/70 mb-2">Business Name</label>
              <input name="businessName" value={form.businessName || ""} onChange={handleChange} className="w-full px-4 py-3 bg-white/10 text-white rounded-sm border border-white/10 focus:border-accent focus:ring-1 focus:ring-accent" />
            </div>
            <div>
              <label className="block text-sm text-white/70 mb-2">Phone</label>
              <input name="phone" value={form.phone || ""} onChange={handleChange} className="w-full px-4 py-3 bg-white/10 text-white rounded-sm border border-white/10 focus:border-accent focus:ring-1 focus:ring-accent" />
            </div>
            <div>
              <label className="block text-sm text-white/70 mb-2">Address</label>
              <textarea name="address" value={form.address || ""} onChange={handleChange} rows="3" className="w-full px-4 py-3 bg-white/10 text-white rounded-sm border border-white/10 focus:border-accent focus:ring-1 focus:ring-accent" />
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <button type="submit" disabled={updateMutation.isLoading} className="bg-accent text-primary px-8 py-3 rounded-sm font-semibold hover:bg-opacity-90 disabled:opacity-50 transition-colors">
            {updateMutation.isLoading ? "Saving..." : "Save Settings"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminSettings;
