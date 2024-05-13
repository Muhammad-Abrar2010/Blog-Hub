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
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'


const queryClient = new QueryClient()

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
        element: <AddBlog></AddBlog>,
      },
      {
        path: "/updateblog",
        element: <UpdateBlog></UpdateBlog>,
      },
      {
        path:"/Allblogs",
        element: <Allblogs></Allblogs>,
        
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
