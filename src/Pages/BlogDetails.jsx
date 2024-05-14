import { useContext, useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";
import { HashLoader } from "react-spinners";
import { AuthContext } from "../Firebase/Firebaseprovider";
import toast from "react-hot-toast";

const BlogDetails = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const [isInWishlist, setIsInWishlist] = useState(false);

  const { isLoading, data: posts } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const response = await axios.get("http://localhost:5000/blogs");
      return response.data;
    },
  });

  useEffect(() => {
    const checkWishlistStatus = async () => {
      if (user) {
        try {
          const response = await axios.get("http://localhost:5000/wishlist", {
            params: { userEmail: user.email },
          });
          const userWishlist = response.data;
          const isAlreadyInWishlist = userWishlist.some(
            (item) => item.blogId === id
          );
          setIsInWishlist(isAlreadyInWishlist);
        } catch (error) {
          console.error("Error checking wishlist status:", error);
        }
      }
    };
    checkWishlistStatus();
  }, [user, id]);

  if (isLoading) {
    return (
      <div className="flex justify-center">
        <HashLoader />
      </div>
    );
  }

  const post = posts.find((post) => post._id === id);

  if (!post) {
    return <p>Post not found</p>;
  }

  const userName = user ? user.displayName || "" : "";
  const userEmail = user ? user.email || "" : "";

  const addToWishlist = async () => {
    try {
      const response = await axios.get("http://localhost:5000/wishlist", {
        params: { userEmail },
      });
      const userWishlist = response.data;
      const isAlreadyInWishlist = userWishlist.some(
        (item) => item.blogId === id
      );

      if (isAlreadyInWishlist) {
        const wishlistItem = userWishlist.find(item => item.blogId === id);
        await axios.delete(`http://localhost:5000/wishlist/${wishlistItem._id}`, {
          data: { userEmail },
        });
        setIsInWishlist(false);
        toast.success("Removed from wishlist");
      } else {
        await axios.post("http://localhost:5000/wishlist", {
          userName,
          userEmail,
          blogId: id,
        });
        setIsInWishlist(true);
        toast.success("Added to wishlist");
      }
    } catch (error) {
      console.error("Error toggling wishlist status:", error);
      toast.error("Failed to toggle wishlist status");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <img
          src={post.imageURL}
          alt={post.title}
          className="w-full h-64 object-cover"
        />
        <div className="p-6">
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          <p className="text-gray-600 mb-4">By {post.userName}</p>
          <div className="flex items-center mb-4">
            <img
              src={post.userPhone}
              alt="Profile"
              className="h-16 w-16 rounded-full mr-4"
            />
            <div>
              <p className="text-gray-600">{post.userName}</p>
              <p className="text-gray-500 text-sm">{post.currentTime}</p>
            </div>
          </div>
          <p className="text-xl mb-4">{post.shortDescription}</p>
          <p className="text-gray-700">{post.longDescription}</p>
          <p className="text-sm text-gray-500 mt-4">Category: {post.category}</p>
          <button
            className={`mt-4 bg-blue-500 text-white font-bold py-2 px-4 rounded ${
              isInWishlist ? "bg-red-500" : ""
            }`}
            onClick={addToWishlist}
          >
            {isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
