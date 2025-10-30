import { Button } from "./ui/button";
import { Input } from "./ui/input";

const NewsLetter = () => {
  return (
    <div className="flex flex-col justify-center items-center text-center space-y-2 my-32">
      <h1 className="font-semibold text-2xl md:text-4xl">Never Miss a blog!</h1>
      <p className="text-gray-500/70 md:text-lg pb-8 ">
        Subscribe to get the latest blog, and exclusive news
      </p>
      <form className="flex gap-2 max-w-2xl w-full md:h-13 h-12">
        <Input
          type="text"
          placeholder="Enter your Email"
          required
          aria-required="true"
          aria-label="Enter Your Email"
          className="border border-gray-300"
        />
        <Button className="bg-primary/80" type="submit">
          Subscribe
        </Button>
      </form>
    </div>
  );
};
export default NewsLetter;
