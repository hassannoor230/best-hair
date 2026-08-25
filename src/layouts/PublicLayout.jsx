import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import MobileActionBar from "../components/MobileActionBar";
import AnnouncementBar from "../components/AnnouncementBar";

const PublicLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <AnnouncementBar />
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <MobileActionBar />
    </div>
  );
};

export default PublicLayout;
