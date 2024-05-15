import { useContext, useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { AuthContext } from "../Firebase/Firebaseprovider";
import { HashLoader } from "react-spinners";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";



const Wishlist = () => {
  const { user } = useContext(AuthContext);
  const [wishlist, setWishlist] = useState([]);
  const navigate = useNavigate();

  

  const { isLoading, data: wishlistData, refetch } = useQuery({
    queryKey: ["wishlist", user?.email],
    queryFn: async () => {
      if (user?.email) {
        const response = await axios.get("https://blog-hub-backend-zeta.vercel.app/wishlist",{
          params: { userEmail: user.email },
        });
        return response.data;
      }
      return [];
    },
  });

  useEffect(() => {
    if (wishlistData) {
      setWishlist(wishlistData);
    }
  }, [wishlistData]);

  const handleRemoveFromWishlist = async (id) => {
    try {
      await axios.delete(`https://blog-hub-backend-zeta.vercel.app/wishlist/${id}`, {
        data: { userEmail: user.email },
      });
      refetch();
      toast.success("Removed from wishlist");
    } catch (error) {
      toast.error("Failed to remove from wishlist");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center">
        <HashLoader />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">My Wishlist</h1>
      {wishlist.length === 0 ? (
        <p>No items in wishlist</p>
      ) : (
        wishlist.map((item) => (
          <div key={item._id} className="mb-4 p-4 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-bold mb-2">{item.blogTitle}</h2>
            <p className="text-gray-600 mb-2">By {item.userName}</p>
            <button
              className="bg-red-500 text-white py-2 px-4 rounded mr-2"
              onClick={() => handleRemoveFromWishlist(item._id)}
            >
              Remove from Wishlist
            </button>
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded"
              onClick={() => navigate(`/blog/${item.blogId}`)}
            >
              View Blog
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default Wishlist;

