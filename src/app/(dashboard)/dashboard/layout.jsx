import Navbar from "@/components/Navbar";
import React from "react";

const DashboardLayout = ({ children }) => {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
};

export default DashboardLayout;
