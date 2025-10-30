import { assets } from "@/assets/assets";
import type { BlogData, CommentsData } from "@/pages/BlogPage";

interface CommentProps {
  comment: CommentsData;
  fetchComments: () => void;
}

const CommentTable = ({ comment, fetchComments }: CommentProps) => {
  const { blog, createdAt, _id, name, content } = comment;
  const BlogDate = new Date(createdAt);

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
            />
          ) : (
            <p className="text-xs border border-green-600 bg-green-100 text-green-600 rounded-full px-3 py-1">Approved</p>
          )}
          <img src= {assets.bin_icon} alt="" className="w-5 hover:scale-110 transition-all cursor-pointer"/>
        </div>
      </td>
    </tr>
  );
};
export default CommentTable;
