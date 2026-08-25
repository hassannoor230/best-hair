import React from "react";

const AdminContacts = () => {
  return (
    <div>
      <div className="mb-10">
        <h1 className="text-3xl font-['Manrope'] font-bold text-white mb-2">Contacts</h1>
        <p className="text-white/50">View and manage customer enquiries</p>
      </div>
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-12 text-center">
        <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
        </div>
        <p className="text-white/70 text-lg mb-2">No contact enquiries yet</p>
        <p className="text-white/50 text-sm">Customer enquiries will appear here when they submit the contact form.</p>
      </div>
    </div>
  );
};

export default AdminContacts;
