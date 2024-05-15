import { useContext, useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { HashLoader } from "react-spinners";
import { AuthContext } from "../Firebase/Firebaseprovider";
import toast from "react-hot-toast";
import useWishlist from "./Components/useWishlist";

const BlogDetails = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const { isInWishlist, toggleWishlist } = useWishlist(user, id);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");

  const { isLoading, data: posts } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const response = await axios.get("https://blog-hub-backend-zeta.vercel.app/blogs");
      return response.data;
    },
  });

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/comments`, {
          params: { blogId: id },
        });
        setComments(response.data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };
    fetchComments();
  }, [id]);

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

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!commentText) return;

    try {
      const newComment = {
        blogId: id,
        userName,
        userEmail,
        userProfilePicture: user.photoURL || "",
        commentText,
      };

      await axios.post("https://blog-hub-backend-mrp1nmlqo-muhammad-abrar2010s-projects.vercel.app/comments", newComment);
      setComments((prevComments) => [...prevComments, newComment]);
      setCommentText("");
      toast.success("Comment added");
    } catch (error) {
      toast.error("Failed to add comment");
    }
  };

  const handleUpdateClick = () => {
    navigate(`/updateblog/${id}`);
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
              src={post.userPhotoUrl}
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
          <p className="text-sm text-gray-500 mt-4">
            Category: {post.category}
          </p>
          <button
            className={`mt-4 bg-blue-500 text-white font-bold py-2 px-4 rounded ${
              isInWishlist ? "bg-red-500" : ""
            }`}
            onClick={toggleWishlist}
          >
            {isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
          </button>

          {userName !== post.userName ? (
            <form onSubmit={handleCommentSubmit} className="mt-4">
              <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Write a comment..."
                className="w-full p-2 border rounded"
                rows="4"
              />
              <button
                type="submit"
                className="mt-2 bg-green-500 text-white py-2 px-4 rounded"
              >
                Submit Comment
              </button>
            </form>
          ) : (
            <p className="mt-4 text-red-500">Cannot comment on own blog</p>
          )}

          {userName === post.userName && (
            <button
              onClick={handleUpdateClick}
              className="mt-4 bg-yellow-500 text-white py-2 px-4 rounded"
            >
              Update Blog
            </button>
          )}

          <div className="mt-6">
            <h2 className="text-2xl font-bold mb-4">Comments</h2>
            {comments.map((comment, index) => (
              <div key={index} className="mb-4">
                <div className="flex items-center mb-2">
                  <img
                    src={comment.userProfilePicture}
                    alt="Profile"
                    className="h-10 w-10 rounded-full mr-2"
                  />
                  <div>
                    <p className="font-bold">{comment.userName}</p>
                    <p className="text-gray-600">{comment.commentText}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
