import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { HashLoader } from "react-spinners";
import { useState, useEffect } from "react";

const RecentBlogs = () => {
  const [recentBlogs, setRecentBlogs] = useState([]);

  const { isPending, data: allBlogs } = useQuery({
    queryKey: ["allBlogs"],
    queryFn: async () => {
      const response = await axios.get("http://localhost:5000/blogs");
      return response.data;
    },
  });

  useEffect(() => {
    if (allBlogs) {
      // Sort blogs by timestamp in descending order
      const sortedBlogs = allBlogs.sort((a, b) => new Date(b.currentTime) - new Date(a.currentTime));

      // Select recent 6 blogs
      const recentSixBlogs = sortedBlogs.slice(0, 6);

      // Update state with recent 6 blogs
      setRecentBlogs(recentSixBlogs);
    }
  }, [allBlogs]);

  if (isPending) {
    return (
      <div className="flex justify-center">
        <HashLoader />
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      <h2 className="text-3xl font-semibold text-center mb-6">Recent 6 Blogs</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {recentBlogs.map((blog, index) => (
          <div key={index} className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-2">{blog.title}</h3>
            <p className="text-gray-600 mb-4">Posted by {blog.userName}</p>
            <img src={blog.userPhone} alt="Profile" className="h-10 w-10 rounded-full mx-auto mb-4" />
            <p className="text-gray-700">{blog.shortDescription}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentBlogs;
