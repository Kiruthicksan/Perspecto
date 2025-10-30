import { Search, Stars } from "lucide-react";
import gradientBackground from "../assets/gradientBackground.png";
import { Input } from "./ui/input";


const HeroSection = () => {
  return (
    <div className="mx-8 sm:mx-16 xl:mx-24 relative">
      <div className="text-center mt-20 mb-8">
        <div className="inline-flex items-center justify-center gap-3 px-6 py-1.5 bg-primary/10 rounded-full mb-4 border border-primary/40 text-sm text-primary">
          <p>New: Ai feature integrated</p>
          <span>
            <Stars className="w-3.5" />
          </span>
        </div>
        <h1 className="text-3xl sm:text-6xl font-semibold sm:leading-16 text-gray-700">
          Your own <span className="text-primary">blogging</span> <br />{" "}
          Platform{" "}
        </h1>
        <p className="my-6 sm:my-8 max-w-2xl m-auto max-sm:text-xs text-gray-500">Your voice. Your space. Write what you feel, share what you love, and let your story unfold — one post at a time.</p>
        <form className="max-w-lg mx-auto relative ">
            <Input type="text" placeholder="Search for blogs" required  className="border border-gray-300 bg-white"/>
            <Search className="absolute top-1/2 -translate-1/2 right-4 w-4 cursor-pointer " />
        </form>
      </div>
      <img
        src={gradientBackground}
        alt="background"
        className="absolute -top-50 -z-1 opacity-50"
      />
    </div>
  );
};
export default HeroSection;
