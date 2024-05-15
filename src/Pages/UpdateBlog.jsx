import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../Firebase/Firebaseprovider";
import toast from "react-hot-toast";

const UpdateBlog = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [blogData, setBlogData] = useState({
    title: "",
    imageURL: "",
    shortDescription: "",
    longDescription: "",
    category: "",
  });

  

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`https://blog-hub-backend-zeta.vercel.app/blogs/${id}`);
        const data = response.data;
        if (data.userEmail !== user.email) {
          toast.error("Unauthorized access");
          navigate("/");
          return;
        }
        console.log(data);

        setBlogData({
          title: data.title,
          imageURL: data.imageURL,
          shortDescription: data.shortDescription,
          longDescription: data.longDescription,
          category: data.category,
        });
      } catch (error) {
        console.error("Error fetching blog:", error);
        toast.error("Failed to fetch blog");
      }
    };
    fetchBlog();
  }, [id, user.email, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlogData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://blog-hub-backend-mrp1nmlqo-muhammad-abrar2010s-projects.vercel.app/blog/${id}`, blogData);
      toast.success("Blog updated successfully");
      navigate(`/blog/${id}`);
    } catch (error) {
      console.error("Error updating blog:", error);
      toast.error("Failed to update blog");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <label htmlFor="title" className="block mb-2">
        Title:
      </label>
      <input
        type="text"
        id="title"
        name="title"
        value={blogData.title}
        onChange={handleChange}
        className="w-full border rounded py-2 px-3 mb-3"
      />

      <label htmlFor="imageURL" className="block mb-2">
        Image URL:
      </label>
      <input
        type="text"
        id="imageURL"
        name="imageURL"
        value={blogData.imageURL}
        onChange={handleChange}
        className="w-full border rounded py-2 px-3 mb-3"
      />

      <label htmlFor="category" className="block mb-2">
        Category:
      </label>
      <select
        id="category"
        name="category"
        value={blogData.category}
        onChange={handleChange}
        className="w-full border rounded py-2 px-3 mb-3"
      >
        <option value="technology">Technology</option>
        <option value="fashion">Fashion</option>
        <option value="gaming">Gaming</option>
        <option value="Sports">Sports</option>
        <option value="health">Health</option>
      </select>

      <label htmlFor="shortDescription" className="block mb-2">
        Short Description:
      </label>
      <textarea
        id="shortDescription"
        name="shortDescription"
        value={blogData.shortDescription}
        onChange={handleChange}
        className="w-full border rounded py-2 px-3 mb-3"
        rows="4"
      ></textarea>

      <label htmlFor="longDescription" className="block mb-2">
        Long Description:
      </label>
      <textarea
        id="longDescription"
        name="longDescription"
        value={blogData.longDescription}
        onChange={handleChange}
        className="w-full border rounded py-2 px-3 mb-3"
        rows="8"
      ></textarea>

      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        Update
      </button>
    </form>
  );
};

export default UpdateBlog;
