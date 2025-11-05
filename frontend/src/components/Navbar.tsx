import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { ChevronRight } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";


const Navbar = () => {
  const navigate = useNavigate();

  const {isAuthenticated} = useAuthStore()
  
  return (
    <nav className="flex justify-between items-center py-5 mx-8 sm:mx-20 xl:mx-32 ">
      <h1
        className="font-bold text-3xl text-red-500 cursor-pointer"
        onClick={() => navigate("/")}
      >
        Perspecto
      </h1>

      <Button onClick={() => navigate("/admin")} className="cursor-pointer">
        {isAuthenticated ? "Dashboard" : "Admin Login"} 
        <ChevronRight />
      </Button>
    </nav>
  );
};
export default Navbar;
