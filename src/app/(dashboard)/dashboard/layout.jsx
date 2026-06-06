import Sidebar from "@/components/dashboard/Sidebar";
import Navbar from "@/components/Navbar";
import React from "react";

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex bg-black h-screen text-white">
      {/* <aside className="px-10 py-10 h-screen w-50 border border-r-gray-500/30">
        this is sidebar
      </aside> */}
      <Sidebar />
      <main className="flex-1">{children}</main>
    </div>
  );
};

export default DashboardLayout;
