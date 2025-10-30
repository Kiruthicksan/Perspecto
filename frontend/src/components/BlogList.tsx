import { useState } from "react";
import BlogCard from "./BlogCard";
import { blog_data, blogCategories } from "@/assets/assets";

const BlogList = () => {
  const [currentTab, setCurrentTab] = useState("All");

  return (
    <div>
      <div className="flex justify-center gap-4 sm:gap-4 my-10 relative">
        {blogCategories.map((category) => (
          <div key={category} className="relative">
            <button
              onClick={() => setCurrentTab(category)}
              className={`px-4 py-1 rounded-lg font-medium transition-colors ${
                currentTab === category
                  ? "bg-primary text-white"
                  : "text-slate-600 hover:bg-blue-100"
              }`}
            >
              {" "}
              {category}
            </button>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 mb-24 mx-8 sm:mx-16 xl:mx-40 ">
        {blog_data
          .filter(
            (item) => item.category === currentTab || currentTab === "All"
          )
          .map((blog) => (
            <BlogCard blog={blog} key={blog._id} />
          ))}
      </div>
    </div>
  );
};
export default BlogList;
