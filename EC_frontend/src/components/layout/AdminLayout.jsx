import { useState } from "react";
import { Outlet } from "react-router-dom";

import AdminNavbar from "../admin/AdminNavbar";
import AdminSidebar from "../admin/AdminSidebar";

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  return (
    <div className="min-h-screen bg-slate-100 flex">

      <AdminSidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <div className="flex-1 flex flex-col">

        <AdminNavbar
          setSidebarOpen={setSidebarOpen}
        />

        <main className="flex-1 p-4 sm:p-6">
          <Outlet />
        </main>

      </div>

    </div>
  );
};

export default AdminLayout;