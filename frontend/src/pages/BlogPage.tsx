import { assets, blog_data } from "@/assets/assets";
import Navbar from "@/components/Navbar";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";

export interface BlogData {
  title: string;
  description: string;
  category: string;
  image: string;
  _id: string;
  createdAt: string;
  subTitle: string;
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
      <div className="text-center mt-20 text-gray-600">
        <p className="text-primary py-4 font-medium">
          Published on {moment(blog.createdAt).format("Do MMMM YYYY")}
        </p>
        <h1 className="text-2xl sm:text-5xl font-semibold max-w-2xl mx-auto text-gray-800">
          {blog.title}
        </h1>
        <h2 className="py-4 text-gray-500 mx-auto max-w-lg truncate">
          {blog.subTitle}
        </h2>
        <p className="text-primary bg-primary/10 px-4 py-1 mx-auto rounded-2xl inline-block mb-6 border border-primary/35 font-medium">Kiruthicksan</p>
      </div>
      <div className="mx-5 max-w-5xl md:mx-auto my-10 mt-6">
        <img src= {blog.image} alt="blog-image" className="rounded-lg mb-6" />
        <div dangerouslySetInnerHTML={{__html: blog.description}} className="rich-text"></div>
      </div>
    </div>
  ) : (
    <p>No blog found on this id</p>
  );
};
export default BlogPage;
