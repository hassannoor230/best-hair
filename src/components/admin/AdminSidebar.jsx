import React from "react";
import { Link } from "react-router-dom";

const AdminSidebar = () => {
  const navItems = [
    { name: "Dashboard", href: "/admin" },
    { name: "Appointments", href: "/admin/appointments" },
    { name: "Services", href: "/admin/services" },
    { name: "Reviews", href: "/admin/reviews" },
    { name: "Gallery", href: "/admin/gallery" },
    { name: "FAQs", href: "/admin/faqs" },
    { name: "Contacts", href: "/admin/contacts" },
    { name: "Settings", href: "/admin/settings" },
  ];

  return (
    <aside className="w-64 bg-primary text-white fixed h-full">
      <div className="p-6">
        <Link to="/admin" className="flex items-center space-x-3 mb-10">
          <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
            <span className="text-primary font-bold text-sm">B</span>
          </div>
          <span className="font-heading font-bold text-lg">Admin Panel</span>
        </Link>
        <nav className="space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className="flex items-center px-4 py-3 rounded-sm text-white/70 hover:bg-white/10 hover:text-white transition-colors text-sm font-medium"
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default AdminSidebar;
