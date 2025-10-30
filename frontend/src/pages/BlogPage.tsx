import Navbar from "@/components/Navbar";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
import { assets, blog_data, comments_data } from "@/assets/assets";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";
import Loader from "@/components/Loader";


export interface BlogData {
  title: string;
  description: string;
  category: string;
  image: string;
  _id: string;
  createdAt: string;
  subTitle: string;
}

export interface CommentsData {
  name: string;
  content: string;
  isApproved: boolean;
  createdAt: string;
}

interface CommentFormData {
  name: string;
  content: string;
}

const BlogPage = () => {
  const { id } = useParams<{ id: string }>();
  const [blog, setBlog] = useState<BlogData | null>(null);
  const [comments, setComments] = useState<CommentsData[]>([]);
  const [formData, setformData] = useState<CommentFormData>({
    name: "",
    content: "",
  });

  const fetchBlogData = async () => {
    const data = blog_data.find((item) => item._id === id);
    setBlog(data || null);
  };

  const fetchComments = async () => {
    setComments(comments_data);
  };

  const handleAddComments = async (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setformData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    fetchBlogData();
    fetchComments();
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
        <p className="text-primary bg-primary/10 px-4 py-1 mx-auto rounded-2xl inline-block mb-6 border border-primary/35 font-medium">
          Kiruthicksan
        </p>
      </div>
      <div className="mx-5 max-w-5xl md:mx-auto my-10 mt-6">
        <img src={blog.image} alt="blog-image" className="rounded-lg mb-6" />
        <div
          dangerouslySetInnerHTML={{ __html: blog.description }}
          className="rich-text  max-w-3xl mx-auto"
        ></div>
        <div className="mt-14 mb-10 max-w-3xl mx-auto">
          <p className="mb-4">Comments ({comments.length})</p>
          <div className="flex flex-col gap-4">
            {comments.map((comment, index) => (
              <div
                key={index}
                className="relative bg-primary/2 border border-primary/5 max-w-xl p-4 rounded text-gray-600"
              >
                <div className="flex gap-3 items-center mb-2">
                  <img src={assets.user_icon} alt="user-icon" className="w-6" />
                  <p className="font-medium">{comment.name}</p>
                </div>
                <p className="text-sm max-w-md ml-8">{comment.content}</p>
                <div className="absolute right-4 bottom-3 text-xs">
                  {moment(comment.createdAt).fromNow()}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="max-w-3xl mx-auto">
          <p className="font-semibold mb-4">Add Your Comments</p>
          <form
            className="flex flex-col items-start gap-4 max-w-lg"
            onSubmit={handleAddComments}
          >
            <Input
              type="text"
              name="name"
              placeholder="Name"
              required
              className="w-full border border-gray-300"
              onChange={handleChange}
              value={formData.name}
            />
            <Textarea
              placeholder="Add Your Comment"
              name="content"
              className="w-full border border-gray-300 resize-none"
              onChange={handleChange}
              value={formData.content}
            ></Textarea>
            <Button type="submit">Submit</Button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  ) : (
    <Loader />
  );
};
export default BlogPage;
