import { assets } from "@/assets/assets";
import type { BlogData } from "@/pages/BlogPage";



const TableData = ({ blog, fetchBlogs, index } : {index : number, blog : BlogData, fetchBlogs : () => void}) => {
  const { title, createdAt, isPublished } = blog;
  const blogDate = new Date(createdAt);
  return (
    <tr className="border-y border-gray-300">
      <th className="px-2 py-4">{index}</th>
      <td className="p-2 py-4">{title}</td>
      <td className="p-2 py-4 max-sm:hidden">{blogDate.toDateString()}</td>
      <td className="p-2 py-4 max-sm:hidden">
        <p
          className={`${
            isPublished ? "text-green-600" : "text-orange-700"
          }`}
        >
          {isPublished ? "Published" : "UnPublished"}
        </p>
      </td>
      <td className="px-2 py-4 flex text-xs gap-3">
        <button className="border px-2 py-0.5 mt-1 rounded cursor-pointer" > {isPublished ? "UnPublish" : "Publish"}</button>
        <img src= {assets.cross_icon} alt="" className="w-8 hover:scale-110 transition-all cursor-pointer" />
      </td>
    </tr>
  );
};
export default TableData;
