import { assets } from "@/assets/assets";
import { NavLink } from "react-router-dom";

const navLinkClasses = ({ isActive }: { isActive: boolean }) => {
  return `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${
    isActive && "bg-primary/10 border-r-4 border-primary"
  }`;
};

const Sidebar = () => {
  return (
    <div className="flex flex-col border-r border-gray-200 min-h-full pt-6">
      <NavLink end={true} to="/admin" className={navLinkClasses}>
        <img src={assets.home_icon} alt="home" className="min-w-4 w-5" />
        <p className="hidden md:inline-block">Dashboard</p>
      </NavLink>
      <NavLink to="/admin/addBlog" className={navLinkClasses}>
        <img src={assets.add_icon} alt="addblogs" className="min-w-4 w-5" />
        <p className="hidden md:inline-block">Add Blogs</p>
      </NavLink>
      <NavLink to="/admin/listBlog" className={navLinkClasses}>
        <img src={assets.list_icon} alt="manageblog" className="min-w-4 w-5" />
        <p className="hidden md:inline-block">Manage Blog</p>
      </NavLink>
      <NavLink to="/admin/comments" className={navLinkClasses}>
        <img src={assets.comment_icon} alt="comment" className="min-w-4 w-5" />
        <p className="hidden md:inline-block">Comments</p>
      </NavLink>
    </div>
  );
};
export default Sidebar;
