
const UpdateBlog=()=> {
  return (
    <form className="max-w-md mx-auto">
      <label htmlFor="title" className="block mb-2">Title:</label>
      <input type="text" id="title" name="title" defaultValue="" className="w-full border rounded py-2 px-3 mb-3" />
      
      <label htmlFor="imageURL" className="block mb-2">Image URL:</label>
      <input type="text" id="imageURL" name="imageURL" defaultValue="" className="w-full border rounded py-2 px-3 mb-3" />
      
      <label htmlFor="category" className="block mb-2">Category:</label>
      <select id="category" name="category" defaultValue="" className="w-full border rounded py-2 px-3 mb-3">
        <option value="technology">Technology</option>
        <option value="fashion">Fashion</option>
        <option value="travel">Travel</option>
        {/* Add more options as needed */}
      </select>
      
      <label htmlFor="shortDescription" className="block mb-2">Short Description:</label>
      <textarea id="shortDescription" name="shortDescription" defaultValue="" className="w-full border rounded py-2 px-3 mb-3" rows="4"></textarea>
      
      <label htmlFor="longDescription" className="block mb-2">Long Description:</label>
      <textarea id="longDescription" name="longDescription" defaultValue="" className="w-full border rounded py-2 px-3 mb-3" rows="8"></textarea>
      
      <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Update</button>
    </form>
  );
}

export default UpdateBlog;
