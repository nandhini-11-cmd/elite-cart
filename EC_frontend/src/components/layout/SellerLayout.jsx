import { useState } from "react";

import { Outlet } from "react-router-dom";

import SellerNavbar from "../seller/SellerNavbar";
import SellerSidebar from "../seller/SellerSidebar";

const SellerLayout = () => {
  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  return (
    <div className="flex min-h-screen bg-slate-100">

      <SellerSidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <div className="flex-1 flex flex-col">

        <SellerNavbar
          setSidebarOpen={setSidebarOpen}
        />

        <main className="flex-1 p-4 sm:p-6">
          <Outlet />
        </main>

      </div>

    </div>
  );
};

export default SellerLayout;