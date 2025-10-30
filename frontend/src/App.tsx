import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import BlogPage from "./pages/BlogPage";
import Dashbord from "./pages/Admin/Dashbord";
import Layout from "./pages/Admin/Layout";
import AddBlog from "./pages/Admin/AddBlog";
import Comments from "./pages/Admin/Comments";
import ListBlog from "./pages/Admin/ListBlog";
import Login from "./components/Admin/Login";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/blog/:id" element={<BlogPage />} />
          <Route path="/admin" element={false ?  <Layout /> : <Login />}>
            <Route index element={<Dashbord />} />
            <Route path="addBlog" element={<AddBlog />} />
            <Route path="listBlog" element={<ListBlog />} />
            <Route path="comments" element={<Comments />} />
          </Route>
        
        </Routes>
      </BrowserRouter>
    </div>
  );
};
export default App;
