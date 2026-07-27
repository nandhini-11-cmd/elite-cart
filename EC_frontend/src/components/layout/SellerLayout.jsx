import { Outlet } from "react-router-dom";

import SellerNavbar from "../seller/SellerNavbar";
import SellerSidebar from "../seller/SellerSidebar";

const SellerLayout = () => {
  return (
    <div className="flex min-h-screen bg-slate-100">

      <SellerSidebar />

      <div className="flex-1 flex flex-col">

        <SellerNavbar />

        <main className="p-6 flex-1">
          <Outlet />
        </main>

      </div>

    </div>
  );
};

export default SellerLayout;