import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./Root/Root.jsx";
import Login from "./Firebase/Auth/Login.jsx";
import Register from "./Firebase/Auth/Register.jsx";
import Firebaseprovider from "./Firebase/Firebaseprovider.jsx";
import { Toaster } from "react-hot-toast";
import Home from "./Pages/Home/Home.jsx";
import Error404 from "./Pages/Error404.jsx";
import AddBlog from "./Pages/AddBlog.jsx";
import UpdateBlog from "./Pages/UpdateBlog.jsx";
import Allblogs from "./Pages/Allblogs.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import FeaturedBlogs from "./Pages/FeaturedBlogs.jsx";
import BlogDetails from "./Pages/BlogDetails.jsx";
import PrivatePage from "./Pages/Private/PrivatePage.jsx";
import Wishlist from "./Pages/Wishlist.jsx";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/addblog",
        element: <PrivatePage><AddBlog></AddBlog></PrivatePage>,
      },
      {
        path: "/updateblog/:id",
        element: <PrivatePage><UpdateBlog></UpdateBlog></PrivatePage>,
      },
      {
        path: "/allblogs",
        element: <Allblogs></Allblogs>,
      },
      {
        path: "/featuredblogs",
        element: <FeaturedBlogs></FeaturedBlogs>,
      },
      {
        path: "/blog/:id",
        element: <BlogDetails></BlogDetails>,
      },
      {
        path:"/wishlist",
        element:<PrivatePage><Wishlist></Wishlist></PrivatePage>
      }
    ],
  },
  { path: "*", element: <Error404></Error404> },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Firebaseprovider>
        <Toaster position="top-right" reverseOrder={false}></Toaster>
        <RouterProvider router={router} />
      </Firebaseprovider>
    </QueryClientProvider>
  </React.StrictMode>
);
