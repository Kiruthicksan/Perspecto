import { assets, blogCategories } from "@/assets/assets";
import { Input } from "@/components/ui/input";
import React, { useEffect, useRef, useState } from "react";
import Quill from "quill";
import { Button } from "@/components/ui/button";
import { api } from "@/service/api";
import { toast } from "sonner";
import { parse } from "marked";


export interface FormData {
  title: string;
  subTitle: string;
  category: string;
}

const AddBlog = () => {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const quillRef = useRef<Quill | null>(null);



  const [formData, setFormData] = useState({
    title: "",
    subTitle: "",
    category: "Startup",
  });

  const [image, setImage] = useState<File | null>(null);
  const [isPublished, setIsPublished] = useState(false);
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const genrateContent = async () => {
    if (!formData.title) return toast.info("Title is Required");

    try {
      setIsLoading(true);
      const { data } = await api.post("/generate", {
        prompt: formData.title,
      });
      if (data && quillRef.current) {
        quillRef.current.root.innerHTML = await parse(data.content);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsAdding(true);
      const blog = {
        title: formData.title,
        subTitle: formData.subTitle,
        description: quillRef.current?.root.innerHTML,
        category: formData.category,
        isPublished,
      };

      const form = new FormData();
      form.append("blog", JSON.stringify(blog));
      if (image) {
        form.append("image", image);
      }

      const { data } = await api.post("/blogs", form);
      if (data) {
        toast.success("Blog Added to Draft");
        setImage(null);
        setFormData({ title: "", subTitle: "", category: "Startup" });
        if (quillRef.current) {
          quillRef.current.root.innerHTML = "";
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsAdding(false);
    }
  };

  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, { theme: "snow" });
    }
  }, []);

  return (
    <form
      className=" bg-blue-50/50 text-gray-600 h-full overflow-scroll w-full"
      onSubmit={handleSubmit}
    >
      <div className="bg-white w-full max-w-3xl md:p-10 p-4 sm:m-10 shadow rounded">
        <p>Upload thumbnail</p>
        <label htmlFor="image">
          <img
            src={!image ? assets.upload_area : URL.createObjectURL(image)}
            alt="blogImage"
            className="mt-2 h-16 rounded cursor-pointer"
          />
          <input
            type="file"
            id="image"
            hidden
            required
            name="image"
            onChange={(e) => e.target.files && setImage(e.target.files[0])}
          />
        </label>
        <p className="mt-4">Blog Title</p>
        <Input
          type="text"
          name="title"
          placeholder="Type Here"
          className="max-w-lg border-gray-300 mt-2"
          value={formData.title}
          onChange={handleChange}
        />

        <p className="mt-4">Sub title</p>
        <Input
          type="text"
          name="subTitle"
          placeholder="Type Here"
          className="max-w-lg border-gray-300 mt-2"
          value={formData.subTitle}
          onChange={handleChange}
        />

        <p className="mt-4">Blog Description</p>
        <div className="max-w-lg h-72 pb-16 sm:pb-10 pt-2 relative">
          <div ref={editorRef}></div>
          <button
            type="button"
            className="absolute right-2 bottom-1 ml-2 text-xs text-white bg-black/70 px-4 py-1.5 rounded-2xl hover:underline cursor-pointer"
            onClick={genrateContent}
            disabled = {isLoading}
          >
            {isLoading ? "Generating" : "Generate with AI" }
          </button>
        </div>

        <p className="mt-4">Blog Category</p>
        <select
          name="category"
          className="mt-2 px-3 py-2 border text-gray-500 border-gray-300 outline-none rounded"
          onChange={handleChange}
          value={formData.category}
        >
          <option value="">Select Category</option>
          {blogCategories.map((item, index) => (
            <option value={item} key={index}>
              {item}
            </option>
          ))}
        </select>

        <div className="flex gap-2 mt-4">
          <p>Publish Now</p>
          <input
            type="checkbox"
            name="isPublished"
            checked={isPublished}
            className="scale-125 cursor-pointer"
            onChange={(e) => setIsPublished(e.target.checked)}
          />
        </div>

        <Button
          type="submit"
          className="mt-8 w-40 h-10 text-sm"
          disabled={isAdding}
        >
          {isAdding ? "Adding" : "Add Blog"}
        </Button>
      </div>
    </form>
  );
};
export default AddBlog;
