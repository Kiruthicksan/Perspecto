import { useEffect, useState } from "react";
import type { CommentsData } from "../BlogPage";
import { comments_data } from "@/assets/assets";

const Comments = () => {
  const [comments, setComments] = useState<CommentsData[]>([]);
  const [fitler, setFilter] = useState("Not Approved");

  const fetchComments = () => {
    setComments(comments_data);
  };

  useEffect(() => {
    fetchComments();
  }, []);
  return (
    <div className="flex-1 pt-5 px-5 sm:pt-12 sm:pl-16 bg-blue-50/50">
      <div className="flex justify-between items-center max-w-3xl mb-4">
        <h1>Comments</h1>
        <div className="flex gap-4">
          <button
            className={`py-1 shadow-custom-sm border rounded-full px-4  text-xs cursor-pointer ${
              fitler === "Approved"
                ? "text-primary  border-primary "
                : "text-gray-700"
            }`}
            onClick={() => setFilter("Approved")}
          >
            Approved
          </button>
          <button
            className={`py-1 shadow-custom-sm border rounded-full px-4  text-xs cursor-pointer ${
              fitler === "Not Approved"
                ? "text-primary  border-primary"
                : "text-gray-700"
            }`}
            onClick={() => setFilter("Not Approved")}
          >
            Not Approved
          </button>
        </div>
      </div>

      <div className="relative h-4/5 max-w-4xl overflow-x-auto  shadow rounded-lg scrollbar-hide bg-white">
        <table className="w-full text-sm text-gray-500">
          <thead className="text-xs text-gray-700 text-left uppercase">
            <tr>
              <th scope="col" className="px-6 py-3">
                Blog Title & Comment
              </th>
              <th scope="col" className="px-6 py-3 max-sm:hidden">
                Date
              </th>

              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>

          <tbody>

          </tbody>
        </table>
      </div>
    </div>
  );
};
export default Comments;
