import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { apiClient } from "../../lib/apiClient";

const AdminSettings = () => {
  const queryClient = useQueryClient();
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState("general");

  const { data, isLoading } = useQuery("business", async () => {
    const res = await apiClient.get("/business");
    return res.data.data;
  });

  const updateMutation = useMutation({
    mutationFn: (formData) => apiClient.put("/business", formData),
    onSuccess: () => {
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
      queryClient.invalidateQueries("business");
    },
  });

  const [form, setForm] = useState({
    businessName: "",
    tagline: "",
    description: "",
    phone: "",
    whatsapp: "",
    email: "",
    address: "",
    city: "",
    province: "",
    country: "",
    googleMapsUrl: "",
    googleBusinessUrl: "",
    seo: { siteTitle: "", metaDescription: "", ogImage: "" },
    socialLinks: { facebook: "", instagram: "", tiktok: "" },
    appointmentEnabled: true,
    whatsappEnabled: true,
    openingHours: {
      monday: { isOpen: true, open: "10:00 AM", close: "01:00 AM" },
      tuesday: { isOpen: true, open: "10:00 AM", close: "01:00 AM" },
      wednesday: { isOpen: true, open: "10:00 AM", close: "01:00 AM" },
      thursday: { isOpen: true, open: "10:00 AM", close: "01:00 AM" },
      friday: { isOpen: true, open: "10:00 AM", close: "01:00 AM" },
      saturday: { isOpen: true, open: "10:00 AM", close: "01:00 AM" },
      sunday: { isOpen: true, open: "10:00 AM", close: "01:00 AM" },
    },
  });

  React.useEffect(() => {
    if (data) {
      setForm({
        businessName: data.businessName || "",
        tagline: data.tagline || "",
        description: data.description || "",
        phone: data.phone || "",
        whatsapp: data.whatsapp || "",
        email: data.email || "",
        address: data.address || "",
        city: data.city || "",
        province: data.province || "",
        country: data.country || "",
        googleMapsUrl: data.googleMapsUrl || "",
        googleBusinessUrl: data.googleBusinessUrl || "",
        seo: data.seo || { siteTitle: "", metaDescription: "", ogImage: "" },
        socialLinks: data.socialLinks || { facebook: "", instagram: "", tiktok: "" },
        appointmentEnabled: data.appointmentEnabled ?? true,
        whatsappEnabled: data.whatsappEnabled ?? true,
        openingHours: data.openingHours || form.openingHours,
      });
    }
  }, [data]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name.startsWith("seo.")) {
      const field = name.split(".")[1];
      setForm((prev) => ({ ...prev, seo: { ...prev.seo, [field]: value } }));
    } else if (name.startsWith("socialLinks.")) {
      const field = name.split(".")[1];
      setForm((prev) => ({ ...prev, socialLinks: { ...prev.socialLinks, [field]: value } }));
    } else if (name.startsWith("openingHours.")) {
      const [day, field] = name.split(".");
      setForm((prev) => ({
        ...prev,
        openingHours: {
          ...prev.openingHours,
          [day]: { ...prev.openingHours[day], [field]: type === "checkbox" ? checked : value },
        },
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateMutation.mutate(form);
  };

  if (isLoading) return <div className="text-white">Loading...</div>;

  const tabs = [
    { id: "general", label: "General" },
    { id: "contact", label: "Contact" },
    { id: "hours", label: "Hours" },
    { id: "social", label: "Social" },
    { id: "seo", label: "SEO" },
    { id: "options", label: "Options" },
  ];

  return (
    <div>
      <div className="mb-10">
        <h1 className="text-3xl font-['Manrope'] font-bold text-white mb-2">Business Settings</h1>
        <p className="text-white/50">Manage your salon's website settings and information</p>
      </div>

      {saved && (
        <div className="bg-green-500/20 text-green-400 px-6 py-4 rounded-xl mb-8 border border-green-500/30">
          Settings saved successfully!
        </div>
      )}

      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden">
        <div className="flex border-b border-white/10">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-4 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? "text-[#C9A45C] border-b-2 border-[#C9A45C]"
                  : "text-white/50 hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="p-8">
          {activeTab === "general" && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">Business Name</label>
                <input name="businessName" value={form.businessName} onChange={handleChange} className="w-full px-4 py-3 bg-white/10 text-white rounded-xl border border-white/10 focus:border-[#C9A45C]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">Tagline</label>
                <input name="tagline" value={form.tagline} onChange={handleChange} className="w-full px-4 py-3 bg-white/10 text-white rounded-xl border border-white/10 focus:border-[#C9A45C]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">Description</label>
                <textarea name="description" value={form.description} onChange={handleChange} rows="4" className="w-full px-4 py-3 bg-white/10 text-white rounded-xl border border-white/10 focus:border-[#C9A45C]" />
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">City</label>
                  <input name="city" value={form.city} onChange={handleChange} className="w-full px-4 py-3 bg-white/10 text-white rounded-xl border border-white/10 focus:border-[#C9A45C]" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">Province</label>
                  <input name="province" value={form.province} onChange={handleChange} className="w-full px-4 py-3 bg-white/10 text-white rounded-xl border border-white/10 focus:border-[#C9A45C]" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">Country</label>
                <input name="country" value={form.country} onChange={handleChange} className="w-full px-4 py-3 bg-white/10 text-white rounded-xl border border-white/10 focus:border-[#C9A45C]" />
              </div>
            </div>
          )}

          {activeTab === "contact" && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">Phone</label>
                <input name="phone" value={form.phone} onChange={handleChange} className="w-full px-4 py-3 bg-white/10 text-white rounded-xl border border-white/10 focus:border-[#C9A45C]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">WhatsApp</label>
                <input name="whatsapp" value={form.whatsapp} onChange={handleChange} className="w-full px-4 py-3 bg-white/10 text-white rounded-xl border border-white/10 focus:border-[#C9A45C]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">Email</label>
                <input name="email" value={form.email} onChange={handleChange} className="w-full px-4 py-3 bg-white/10 text-white rounded-xl border border-white/10 focus:border-[#C9A45C]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">Address</label>
                <textarea name="address" value={form.address} onChange={handleChange} rows="3" className="w-full px-4 py-3 bg-white/10 text-white rounded-xl border border-white/10 focus:border-[#C9A45C]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">Google Maps URL</label>
                <input name="googleMapsUrl" value={form.googleMapsUrl} onChange={handleChange} className="w-full px-4 py-3 bg-white/10 text-white rounded-xl border border-white/10 focus:border-[#C9A45C]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">Google Business URL</label>
                <input name="googleBusinessUrl" value={form.googleBusinessUrl} onChange={handleChange} className="w-full px-4 py-3 bg-white/10 text-white rounded-xl border border-white/10 focus:border-[#C9A45C]" />
              </div>
            </div>
          )}

          {activeTab === "hours" && (
            <div className="space-y-4">
              {Object.entries(form.openingHours).map(([day, hours]) => (
                <div key={day} className="flex items-center space-x-4 p-4 bg-white/5 rounded-xl">
                  <div className="w-24">
                    <span className="text-white font-medium capitalize">{day}</span>
                  </div>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input type="checkbox" name={`openingHours.${day}.isOpen`} checked={hours.isOpen} onChange={handleChange} className="w-4 h-4 rounded bg-white/10 border-white/20 text-[#C9A45C]" />
                    <span className="text-white/70 text-sm">Open</span>
                  </label>
                  <input type="text" name={`openingHours.${day}.open`} value={hours.open} onChange={handleChange} className="px-3 py-2 bg-white/10 text-white rounded-lg border border-white/10 focus:border-[#C9A45C] text-sm" />
                  <span className="text-white/50">to</span>
                  <input type="text" name={`openingHours.${day}.close`} value={hours.close} onChange={handleChange} className="px-3 py-2 bg-white/10 text-white rounded-lg border border-white/10 focus:border-[#C9A45C] text-sm" />
                </div>
              ))}
            </div>
          )}

          {activeTab === "social" && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">Facebook URL</label>
                <input name="socialLinks.facebook" value={form.socialLinks.facebook} onChange={handleChange} className="w-full px-4 py-3 bg-white/10 text-white rounded-xl border border-white/10 focus:border-[#C9A45C]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">Instagram URL</label>
                <input name="socialLinks.instagram" value={form.socialLinks.instagram} onChange={handleChange} className="w-full px-4 py-3 bg-white/10 text-white rounded-xl border border-white/10 focus:border-[#C9A45C]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">TikTok URL</label>
                <input name="socialLinks.tiktok" value={form.socialLinks.tiktok} onChange={handleChange} className="w-full px-4 py-3 bg-white/10 text-white rounded-xl border border-white/10 focus:border-[#C9A45C]" />
              </div>
            </div>
          )}

          {activeTab === "seo" && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">Site Title</label>
                <input name="seo.siteTitle" value={form.seo.siteTitle} onChange={handleChange} className="w-full px-4 py-3 bg-white/10 text-white rounded-xl border border-white/10 focus:border-[#C9A45C]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">Meta Description</label>
                <textarea name="seo.metaDescription" value={form.seo.metaDescription} onChange={handleChange} rows="3" className="w-full px-4 py-3 bg-white/10 text-white rounded-xl border border-white/10 focus:border-[#C9A45C]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">OG Image URL</label>
                <input name="seo.ogImage" value={form.seo.ogImage} onChange={handleChange} className="w-full px-4 py-3 bg-white/10 text-white rounded-xl border border-white/10 focus:border-[#C9A45C]" />
              </div>
            </div>
          )}

          {activeTab === "options" && (
            <div className="space-y-6">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input type="checkbox" name="appointmentEnabled" checked={form.appointmentEnabled} onChange={handleChange} className="w-5 h-5 rounded bg-white/10 border-white/20 text-[#C9A45C]" />
                <span className="text-white/80">Enable Appointment Booking</span>
              </label>
              <label className="flex items-center space-x-3 cursor-pointer">
                <input type="checkbox" name="whatsappEnabled" checked={form.whatsappEnabled} onChange={handleChange} className="w-5 h-5 rounded bg-white/10 border-white/20 text-[#C9A45C]" />
                <span className="text-white/80">Enable WhatsApp Button</span>
              </label>
            </div>
          )}

          <div className="flex justify-end pt-8 border-t border-white/10 mt-8">
            <button type="submit" disabled={updateMutation.isLoading} className="bg-gradient-to-r from-[#C9A45C] to-[#d4af37] text-[#0a0a0a] px-8 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-[#C9A45C]/20 transition-all duration-300 disabled:opacity-50">
              {updateMutation.isLoading ? "Saving..." : "Save Settings"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminSettings;
