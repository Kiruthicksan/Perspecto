import { assets, blog_data } from "@/assets/assets";
import Navbar from "@/components/Navbar";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import  moment from "moment"

export interface BlogData {
  title: string;
  description: string;
  category: string;
  image: string;
  _id: string;
  createdAt : string
 
}


const BlogPage = () => {
  const { id } = useParams<{ id: string }>();
  const [blog, setBlog] = useState<BlogData | null>(null);

  const fetchBlogData = async () => {
    const data = blog_data.find((item) => item._id === id);
    setBlog(data || null);
  };

  useEffect(() => {
    fetchBlogData();
  }, []);

  return blog ? (
    <div className="relative">
      <img
        src={assets.gradientBackground}
        alt="background"
        className="absolute -top-50 -z-1 opacity-50"
      />
      <Navbar />
      <div>
        <p>Published on {moment(blog.createdAt).format("Do MMMM YYYY")}</p>
      </div>
      <div></div>
    </div>
  ) : (
    <p>No blog found on this id</p>
  );
};
export default BlogPage;
