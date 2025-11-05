import BlogList from "@/components/BlogList"
import Footer from "@/components/Footer"
import HeroSection from "@/components/HeroSection"
import Navbar from "@/components/Navbar"
import NewsLetter from "@/components/NewsLetter"
import { useState } from "react"

const Home = () => {
  const [input ,setInput] = useState<string>("")
  return (
    <div>
        <Navbar/>
        <HeroSection   />
        <BlogList />
        <NewsLetter />
        <Footer />
    </div>
  )
}
export default Home