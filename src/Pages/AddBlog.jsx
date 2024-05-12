// import { useState } from "react";

// const AddBlog = () => {
//   const [formData, setFormData] = useState({
//     title: "",
//     imageURL: "",
//     category: "technology",
//     shortDescription: "",
//     longDescription: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // You can perform further processing here, like sending the data to a server
//     console.log(formData);
//     // Reset form after submission
//     setFormData({
//       title: "",
//       imageURL: "",
//       category: "technology",
//       shortDescription: "",
//       longDescription: "",
//     });
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <label htmlFor="title">Title:</label>
//       <br />
//       <input type="text" id="title" name="title" required />
//       <br />
//       <br />

//       <label htmlFor="imageURL">Image URL:</label>
//       <br />
//       <input type="text" id="imageURL" name="imageURL" className="input input-bordered w-full max-w-xs" />
//       <br />
//       <br />

//       <label htmlFor="category">Category:</label>
//       <br />
//       <select id="category" name="category" required>
//         <option value="technology">Technology</option>
//         <option value="fashion">Fashion</option>
//         <option value="travel">Travel</option>
//         {/* Add more options as needed */}
//       </select>
//       <br />
//       <br />

//       <label htmlFor="shortDescription">Short Description:</label>
//       <br />
//       <textarea
//         id="shortDescription"
//         name="shortDescription"
//         rows="4"
//         cols="50"
//         required
//       ></textarea>
//       <br />
//       <br />

//       <label htmlFor="longDescription">Long Description:</label>
//       <br />
//       <textarea
//         id="longDescription"
//         name="longDescription"
//         rows="8"
//         cols="50"
//         className=""
//         required
//       ></textarea>
//       <br />
//       <br />

//       <button type="submit">Submit</button>
//     </form>
//   );
// };

// export default AddBlog;

import React from 'react';

const AddBlog=()=> {
  return (
    <form className="max-w-md mx-auto">
      <label htmlFor="title" className="block mb-2">Title:</label>
      <input type="text" id="title" name="title" className="w-full border rounded py-2 px-3 mb-3" required />
      
      <label htmlFor="imageURL" className="block mb-2">Image URL:</label>
      <input type="text" id="imageURL" name="imageURL" className="w-full border rounded py-2 px-3 mb-3" />
      
      <label htmlFor="category" className="block mb-2">Category:</label>
      <select id="category" name="category" className="w-full border rounded py-2 px-3 mb-3" required>
        <option value="technology">Technology</option>
        <option value="fashion">Fashion</option>
        <option value="travel">Travel</option>
        {/* Add more options as needed */}
      </select>
      
      <label htmlFor="shortDescription" className="block mb-2">Short Description:</label>
      <textarea id="shortDescription" name="shortDescription" className="w-full border rounded py-2 px-3 mb-3" rows="4" required></textarea>
      
      <label htmlFor="longDescription" className="block mb-2">Long Description:</label>
      <textarea id="longDescription" name="longDescription" className="w-full border rounded py-2 px-3 mb-3" rows="8" required></textarea>
      
      <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Submit</button>
    </form>
  );
}

export default AddBlog;
