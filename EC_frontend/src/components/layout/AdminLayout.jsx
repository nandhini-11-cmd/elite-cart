import { useState } from "react";
import { Outlet } from "react-router-dom";

import AdminNavbar from "../admin/AdminNavbar";
import AdminSidebar from "../admin/AdminSidebar";

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  return (
    <div className="flex min-h-screen bg-slate-100">

      <AdminSidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <div className="flex-1 flex flex-col">

        <AdminNavbar
          setSidebarOpen={setSidebarOpen}
        />

        <main className="flex-1 p-4 sm:p-6 overflow-x-auto">
          <Outlet />
        </main>

      </div>

    </div>
  );
};

export default AdminLayout;