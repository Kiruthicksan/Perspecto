import Sidebar from "@/components/Admin/Sidebar";
import { Button } from "@/components/ui/button";
import { api } from "@/service/api";

import { Outlet, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Layout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await api.post("/admin/logout");
      localStorage.removeItem("auth-storage")
      toast.success("Logged Out Successfully");
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="flex  justify-between items-center py-2 h-[70px] px-4 sm:px-12 border-b border-gray-200">
        <h1 className="font-bold text-3xl text-red-500 cursor-pointer" onClick={() => navigate("/")}>
          Perspecto
        </h1>
        <Button onClick={handleLogout}>Logout</Button>
      </div>
      <div className="flex h-[calc(100vh-70px)]">
        <Sidebar />
        <Outlet />
      </div>
    </div>
  );
};
export default Layout;
