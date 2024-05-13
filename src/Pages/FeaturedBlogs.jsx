import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { HashLoader } from "react-spinners";
import { useState, useEffect } from "react";

const FeaturedBlogs = () => {
  const [topPosts, setTopPosts] = useState([]);

  const { isPending, data: AllBlogData } = useQuery({
    queryKey: ["AllBlogData"],
    queryFn: async () => {
      const response = await axios.get("http://localhost:5000/blogs");
      return response.data;
    },
  });

  useEffect(() => {
    if (AllBlogData) {
      AllBlogData.forEach((post) => {
        post.wordCount = post.longDescription.split(/\s+/).length;
      });
      const sortedPosts = AllBlogData.sort((a, b) => b.wordCount - a.wordCount);
      const top10 = sortedPosts.slice(0, 10);
      setTopPosts(top10);
    }
  }, [AllBlogData]);

  if (isPending) {
    return (
      <div className="flex justify-center">
        <HashLoader />
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      <h2 className="text-3xl font-semibold text-center mb-6">Top 5 Posts</h2>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Serial Number
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Blog Title
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Blog Owner
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Blog Owner Profile Picture
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {topPosts.map((post, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
              <td className="px-6 py-4 whitespace-nowrap">{post.title}</td>
              <td className="px-6 py-4 whitespace-nowrap">{post.userName}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <img
                  src={post.userPhone}
                  alt="Profile"
                  className="h-8 w-8 rounded-full"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FeaturedBlogs;
