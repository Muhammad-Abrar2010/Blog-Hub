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
    ],
  },
  { path: "*", element: <Error404></Error404> },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Firebaseprovider>
      <Toaster position="top-right" reverseOrder={false}></Toaster>
      <RouterProvider router={router} />
    </Firebaseprovider>
  </React.StrictMode>
);
