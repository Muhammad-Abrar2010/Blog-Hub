import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";
import { HashLoader } from "react-spinners";
import useWishlist from "./Components/useWishlist";
import { AuthContext } from "../Firebase/Firebaseprovider";
import { useContext, useState } from "react";

const Allblogs = () => {
  const { user } = useContext(AuthContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  

  const { isPending, data: AllBlogData } = useQuery({
    queryKey: ["AllBlogData"],
    queryFn: async () => {
      const blogs = axios
        .get("https://blog-hub-backend-zeta.vercel.app/blogs")
        .then((data) => data.data);

      return blogs;
    },
  });

  if (isPending) {
    return (
      <div className="flex justify-center">
        <HashLoader />
      </div>
    );
  }

  let filteredBlogs = AllBlogData;
  if (categoryFilter) {
    filteredBlogs = filteredBlogs.filter(
      (blog) => blog.category === categoryFilter
    );
  }

  if (searchTerm) {
    filteredBlogs = filteredBlogs.filter((blog) =>
      blog.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  return (
    <>
      <div className="m-4">
        <div className="flex justify-center mb-4">
          <input
            type="text"
            placeholder="Search by title..."
            className="px-4 py-2 border border-gray-300 rounded-md mr-4"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md"
          >
            <option value="">All Categories</option>
            <option value="technology">Technology</option>
            <option value="fashion">Fashion</option>
            <option value="gaming">Gaming</option>
            <option value="sports">Sports</option>
            <option value="health">Health</option>
          </select>
        </div>
        {filteredBlogs.length === 0 ? (
          <div className="text-center text-gray-600">No blogs found.</div>
        ) : (
          <div className="grid gap-4 lg:grid-cols-3 md:grid-cols-2">
            {filteredBlogs.map((blog) => (
              <div key={blog._id}>
                <div className="max-w-lg mx-auto">
                  <div className="bg-white shadow-md border border-gray-200 rounded-lg max-w-sm mb-5">
                    <div className="flex justify-center">
                      <img
                        className="rounded-t-lg p-4 w-full"
                        src={blog.imageURL}
                        alt=""
                      />
                    </div>
                    <div className="p-5">
                      <h5 className="text-gray-900 font-bold text-2xl tracking-tight mb-2">
                        {blog.title}
                      </h5>
                      <p className="font-normal text-gray-700 mb-3">
                        {blog.shortDescription}
                      </p>
                      <div className="flex gap-2">
                        <div>
                          <Link
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center"
                            to={`/blog/${blog._id}`}
                          >
                            Read more
                          </Link>
                        </div>
                        <div>
                          {user && (
                            <WishlistButton user={user} blogId={blog._id} />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>{" "}
    </>
  );
};

const WishlistButton = ({ user, blogId }) => {
  const { isInWishlist, toggleWishlist } = useWishlist(user, blogId);

  return (
    <button
      className={`text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center ${
        isInWishlist ? "bg-red-500" : "hover:bg-gray-400"
      }`}
      onClick={toggleWishlist}
    >
      {isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
    </button>
  );
};

export default Allblogs;
