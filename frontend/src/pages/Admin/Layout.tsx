import Sidebar from "@/components/Admin/Sidebar";
import { Button } from "@/components/ui/button";

import { Outlet, useNavigate } from "react-router-dom";

const Layout = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="flex  justify-between items-center py-2 h-[70px] px-4 sm:px-12 border-b border-gray-200">
        <h1
          className="font-bold text-3xl text-red-500 cursor-pointer"
          onClick={() => navigate("/")}
        >
          Perspecto
        </h1>
        <Button>Logout</Button>
      </div>
      <div className="flex h-[calc(100vh-70px)]">
          <Sidebar />
          <Outlet />
      </div>
    </div>
  );
};
export default Layout;
