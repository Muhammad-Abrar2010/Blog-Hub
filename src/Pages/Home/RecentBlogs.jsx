import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { HashLoader } from "react-spinners";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useWishlist from "../Components/useWishlist";

const RecentBlogs = () => {
  const [recentBlogs, setRecentBlogs] = useState([]);


  const { isPending, data: allBlogs } = useQuery({
    queryKey: ["allBlogs"],
    queryFn: async () => {
      const response = await axios.get(
        "https://blog-hub-backend-zeta.vercel.app/blogs",
      );
      return response.data;
    },
  });

  useEffect(() => {
    if (allBlogs) {
      const sortedBlogs = allBlogs.sort((a, b) => {
        const [dayA, monthA, yearA] = a.currentTime.split("/").map(Number);
        const [dayB, monthB, yearB] = b.currentTime.split("/").map(Number);

        const dateA = new Date(yearA, monthA - 1, dayA);
        const dateB = new Date(yearB, monthB - 1, dayB);

        return dateB - dateA;
      });

      const recentSixBlogs = sortedBlogs.slice(0, 6);

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
      <h2 className="text-3xl font-semibold text-center mb-6">
        Recent 6 Blogs
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {recentBlogs.map((blog, index) => (
          <div key={index} className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-2">{blog.title}</h3>
            <img
              src={blog.imageURL}
              alt="Blog"
              className="h-40 w-full object-cover mb-4"
            />
            <p className="text-gray-600 mb-2">Category: {blog.category}</p>
            <p className="text-gray-600 mb-4">Posted by {blog.userName}</p>
            <p className="text-gray-700 mb-4">{blog.shortDescription}</p>
            <div className="flex justify-between">
              <Link
                to={`/blog/${blog._id}`}
                className="text-blue-500 hover:text-blue-700"
              >
                Details
              </Link>
              <WishlistButton user={blog.userEmail} blogId={blog._id} />
              {console.log(blog)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const WishlistButton = ({ user, blogId }) => {
  const { isInWishlist, toggleWishlist } = useWishlist(user, blogId);

  return (
    <button
      onClick={toggleWishlist}
      className={`text-white bg-blue-500 hover:bg-blue-700 px-3 py-1 rounded-md ${
        isInWishlist ? "bg-red-500" : ""
      }`}
    >
      {isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
    </button>
  );
};

export default RecentBlogs;
