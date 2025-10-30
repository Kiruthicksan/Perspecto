import {BrowserRouter, Route, Routes} from "react-router-dom"
import Home from "./pages/Home"
import BlogPage from "./pages/BlogPage"




const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element = {<Home/>}></Route>
          <Route path="/blog/:id" element = {<BlogPage />} />
        </Routes>
    </BrowserRouter>
    </div>
    
  )
}
export default App