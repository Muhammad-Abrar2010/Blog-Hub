import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const useWishlist = (user, blogId) => {
  const [wishlistData, setWishlistData] = useState({
    isInWishlist: false,
    blogTitle: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        try {
          const wishlistResponse = await axios.get(
            "http://localhost:5000/wishlist",
            {
              params: { userEmail: user.email },
            }
          );
          const userWishlist = wishlistResponse.data;
          const isAlreadyInWishlist = userWishlist.some(
            (item) => item.blogId === blogId
          );

          const blogResponse = await axios.get(
            `http://localhost:5000/blog/${blogId}`
          );
          const blogTitle = blogResponse.data.title;

          setWishlistData({
            isInWishlist: isAlreadyInWishlist,
            blogTitle: blogTitle,
          });
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };
    fetchData();
  }, [user, blogId]);

  const toggleWishlist = async () => {
    if (!user) {
      toast.error("You need to be logged in to modify your wishlist");
      return;
    }
    try {
      const response = await axios.get("http://localhost:5000/wishlist", {
        params: { userEmail: user.email },
      });
      const userWishlist = response.data;
      const isAlreadyInWishlist = userWishlist.some(
        (item) => item.blogId === blogId
      );

      if (isAlreadyInWishlist) {
        const wishlistItem = userWishlist.find(
          (item) => item.blogId === blogId
        );
        await axios.delete(
          `http://localhost:5000/wishlist/${wishlistItem._id}`,
          {
            data: { userEmail: user.email },
          }
        );
        setWishlistData((prevState) => ({
          ...prevState,
          isInWishlist: false,
        }));
        toast.success("Removed from wishlist");
      } else {
        const blogResponse = await axios.get(
          `http://localhost:5000/blog/${blogId}`
        );
        const blogTitle = blogResponse.data.title;

        await axios.post("http://localhost:5000/wishlist", {
          userName: user.displayName,
          userEmail: user.email,
          blogId,
          blogTitle,
        });
        setWishlistData((prevState) => ({
          ...prevState,
          isInWishlist: true,
        }));
        toast.success("Added to wishlist");
      }
    } catch (error) {
      toast.error("Failed to toggle wishlist status");
    }
  };

  return { ...wishlistData, toggleWishlist };
};

export default useWishlist;
