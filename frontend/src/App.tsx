import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import BlogPage from "./pages/BlogPage";
import Dashbord from "./pages/Admin/Dashbord";
import Layout from "./pages/Admin/Layout";
import AddBlog from "./pages/Admin/AddBlog";
import Comments from "./pages/Admin/Comments";
import ListBlog from "./pages/Admin/ListBlog";
import Login from "./components/Admin/Login";
import "quill/dist/quill.snow.css"
import { Toaster } from "./components/ui/sonner";
import { useAuthStore } from "./store/useAuthStore";
import { useBlogStore } from "./store/useBlogStore";
import { useEffect } from "react";




const App = () => {

  const {isAuthenticated} = useAuthStore()
  const {fetchBlogs, fetchAllBlogs} = useBlogStore()

  useEffect(() => {
    fetchBlogs()
    fetchAllBlogs()
  }, [fetchAllBlogs])
 
 
  return (
    <div>
        <Toaster position="top-center" />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/blogs/:slug" element={<BlogPage />} />
          
          <Route path="/admin" element={isAuthenticated ?  <Layout /> : <Login />}>
            <Route index element={<Dashbord />} />
            <Route path="addBlog" element={<AddBlog />} />
            <Route path="listBlog" element={<ListBlog />} />
            <Route path="comments" element={<Comments />} />
          </Route>
        
        </Routes>
     
    </div>
  );
};
export default App;
