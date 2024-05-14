import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";
import { HashLoader } from "react-spinners";

const BlogDetails = () => {
  const { id } = useParams();

  const { isLoading, data: AllBlogData } = useQuery({
    queryKey: ["AllBlogData"],
    queryFn: async () => {
      const response = await axios.get("http://localhost:5000/blogs");
      return response.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center">
        <HashLoader />
      </div>
    );
  }

  const post = AllBlogData.find((post) => post._id === id);

  if (!post) {
    return <p>Post not found</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <img src={post.imageURL} alt={post.title} className="w-full h-64 object-cover" />
        <div className="p-6">
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          <p className="text-gray-600 mb-4">By {post.userName}</p>
          <div className="flex items-center mb-4">
            <img src={post.userPhone} alt="Profile" className="h-16 w-16 rounded-full mr-4" />
            <div>
              <p className="text-gray-600">{post.userName}</p>
              <p className="text-gray-500 text-sm">{post.currentTime}</p>
            </div>
          </div>
          <p className="text-xl mb-4">{post.shortDescription}</p>
          <p className="text-gray-700">{post.longDescription}</p>
          <p className="text-sm text-gray-500 mt-4">Category: {post.category}</p>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
