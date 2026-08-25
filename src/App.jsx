import React from "react";
import { Routes, Route } from "react-router-dom";

import PublicLayout from "./layouts/PublicLayout";
import AdminLayout from "./layouts/AdminLayout";

import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import ServiceDetail from "./pages/ServiceDetail";
import Gallery from "./pages/Gallery";
import Reviews from "./pages/Reviews";
import FAQ from "./pages/FAQ";
import Contact from "./pages/Contact";
import Appointment from "./pages/Appointment";

import AdminLogin from "./pages/admin/Login";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminServices from "./pages/admin/Services";
import AdminAppointments from "./pages/admin/Appointments";
import AdminContacts from "./pages/admin/Contacts";
import AdminReviews from "./pages/admin/Reviews";
import AdminGallery from "./pages/admin/Gallery";
import AdminFaqs from "./pages/admin/Faqs";
import AdminSettings from "./pages/admin/Settings";

import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <ScrollToTop>
      <Routes>
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="services" element={<Services />} />
          <Route path="services/:slug" element={<ServiceDetail />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="reviews" element={<Reviews />} />
          <Route path="faq" element={<FAQ />} />
          <Route path="contact" element={<Contact />} />
          <Route path="appointment" element={<Appointment />} />
        </Route>

        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="services" element={<AdminServices />} />
          <Route path="appointments" element={<AdminAppointments />} />
          <Route path="contacts" element={<AdminContacts />} />
          <Route path="reviews" element={<AdminReviews />} />
          <Route path="gallery" element={<AdminGallery />} />
          <Route path="faqs" element={<AdminFaqs />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>
      </Routes>
    </ScrollToTop>
  );
}

export default App;
