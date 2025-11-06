import { assets } from "@/assets/assets";
import type { CommentsData } from "@/pages/BlogPage";
import { api } from "@/service/api";
import { toast } from "sonner";

interface CommentProps {
  comment: CommentsData;
  fetchComments: () => void;
}

const CommentTable = ({ comment, fetchComments }: CommentProps) => {
  const { blog, createdAt, name, content } = comment;
  const BlogDate = new Date(createdAt);

  const handleApprove = async () => {
    try {
     await api.patch("/blogs/admin/comment", {id : comment._id})
     toast.success("Comment Approved")
     fetchComments()
    } catch (error) {
      console.log(error)
      toast.error("Error")
    }
  }

  const handleDelete = async () => {
    const confirm = window.confirm("Are you sure you want to delete this blog?")
      if(!confirm){
        return
      }
    try {
      await api.post("/blogs/admin/comment", {id : comment._id})
      toast.success("Comment Deleted")
      fetchComments()
    } catch (error) {
      console.log(error)
      toast.error("Error")
    }
  }

  return (
    <tr className="order-y border-gray-300">
      <td className="px-6 py-4">
        <b className="font-medium text-gray-600">Blog</b>: {blog.title}
        <br />
        <br />
        <b className="font-medium text-gray-600">Name</b>: {name}
        <br />
        <b className="font-medium text-gray-600">Comment</b>: {content}
      </td>
      <td className="px-6 py-4 max-sm:hidden">
        {BlogDate.toLocaleDateString()}
      </td>
      <td className="px-6 py-4">
        <div className="inline-flex gap-4 items-center">
          {!comment.isApproved ? (
            <img
              src={assets.tick_icon}
              className="w-5 hover:scale-110 transition-all cursor-pointer"
              onClick={handleApprove}
              
            />
          ) : (
            <p className="text-xs border border-green-600 bg-green-100 text-green-600 rounded-full px-3 py-1">Approved</p>
          )}
          <img src= {assets.bin_icon} alt="" className="w-5 hover:scale-110 transition-all cursor-pointer" onClick={handleDelete}/>
        </div>
      </td>
    </tr>
  );
};
export default CommentTable;
