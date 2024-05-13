import toast from "react-hot-toast";
import { AuthContext } from "../Firebase/Firebaseprovider";
import { useContext } from "react";
import axios from "axios";

const AddBlog = () => {
  const { user } = useContext(AuthContext);
  const handleAddBlog = (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    console.log(title);
    const imageURL = e.target.imageURL.value;
    const category = e.target.category.value;
    const shortDescription = e.target.shortDescription.value;
    const longDescription = e.target.longDescription.value;
    const currentDay = new Date().getDate();
    console.log(currentDay);
    const currentMonth = new Date().getMonth()+1;
    const currentYear = new Date().getFullYear();
    const currentTime = `${currentDay}/${currentMonth}/${currentYear}`;
    const userName = user.displayName;
    const userPhone = user.photoURL;

    const newBlog = {
      title,
      imageURL,
      category,
      shortDescription,
      longDescription,
      currentTime,
      userName,
      userPhone,
    };
    console.log(newBlog);

    axios.post("http://localhost:5000/blogs", newBlog).then((data) => {
      console.log(data.data);
      toast.success("succesfully added new blog");
    });
  };

  return (
    <form className="max-w-md mx-auto" onSubmit={handleAddBlog}>
      <label className="block mb-2">Title:</label>
      <input
        type="text"
        id="title"
        name="title"
        className="w-full border rounded py-2 px-3 mb-3"
        required
      />

      <label htmlFor="imageURL" className="block mb-2">
        Image URL:
      </label>
      <input
        type="text"
        id="imageURL"
        name="imageURL"
        className="w-full border rounded py-2 px-3 mb-3"
      />

      <label htmlFor="category" className="block mb-2">
        Category:
      </label>
      <select
        id="category"
        name="category"
        className="w-full border rounded py-2 px-3 mb-3"
        defaultValue={"select"}
        required
      >
        <option value="select">Select</option>

        <option value="technology">Technology</option>
        <option value="fashion">Fashion</option>
        <option value="travel">Travel</option>
      </select>

      <label htmlFor="shortDescription" className="block mb-2">
        Short Description:
      </label>
      <textarea
        id="shortDescription"
        name="shortDescription"
        className="w-full border rounded py-2 px-3 mb-3"
        rows="4"
        required
      ></textarea>

      <label htmlFor="longDescription" className="block mb-2">
        Long Description:
      </label>
      <textarea
        id="longDescription"
        name="longDescription"
        className="w-full border rounded py-2 px-3 mb-3"
        rows="8"
        required
      ></textarea>

      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        Submit
      </button>
    </form>
  );
};

export default AddBlog;
