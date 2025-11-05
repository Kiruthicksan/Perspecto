import { api } from "@/service/api";
import { create } from "zustand";

interface BlogStoreType {
  blogs: any[];
  allBlogs: any[];
  isLoading: boolean;
  fetchBlogs: () => Promise<void>;
  fetchAllBlogs: () => Promise<void>
}

export const useBlogStore = create<BlogStoreType>((set) => ({
  blogs: [],
  allBlogs: [],
  isLoading: false,

  fetchBlogs: async () => {
    set({ isLoading: true });
    try {
      const { data } = await api.get("/blogs");
      set({ blogs: data.post, isLoading: false });
    } catch (error) {
      console.error("Error fetching blogs:", error);
      set({ isLoading: false });
    }
  },

  fetchAllBlogs: async () => {
    set({ isLoading: true });
    try {
      const { data } = await api.get("/blogs/admin");
     
      set({ allBlogs: data.post, isLoading: false });
    } catch (error) {
      console.error("Error fetching blogs:", error);
      set({ isLoading: false });
    }
  },
}));
