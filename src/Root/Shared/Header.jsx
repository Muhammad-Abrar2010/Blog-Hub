import { NavLink, Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { IoIosLogIn } from "react-icons/io";
import { CiCirclePlus } from "react-icons/ci";
import { useContext } from "react";
import { AuthContext } from "../../Firebase/Firebaseprovider";
import toast from "react-hot-toast";

const Header = () => {
  const { user, logout } = useContext(AuthContext);

  const handleSignOut = () => {
    logout()
      .then(() => toast.success("logout successfull"))
      .catch((error) => toast.error(error.message));
  };
  return (
    <>
      <div className="lg:flex justify-between navbar bg-base-100 hidden">
        <div className="">
          <Link className="btn btn-ghost text-xl">Blog Hub</Link>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1 flex gap-2">
            <li>
              <NavLink to={"/"}>
                {" "}
                <FaHome /> Home
              </NavLink>{" "}
            </li>
            <li>
              <NavLink to={"/addblog"}>Add Blog</NavLink>
            </li>

            <li>
              <NavLink to={"/allblogs"}>All Blogs</NavLink>
            </li>
            <li>
              <NavLink to={"/featuredblogs"}>Featured Blogs</NavLink>
            </li>
            <li>
              <NavLink to={"/wishlist"}>Wish List</NavLink>
            </li>
          </ul>
        </div>
        <div>
          {user ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt={user.displayName}
                    src={user.photoURL && user.photoURL}
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
              >
                <li>
                  <a className="justify-between">Profile</a>
                </li>
                <li>
                  <a>Settings</a>
                </li>
                <li>
                  <button onClick={handleSignOut}>Logout</button>
                </li>
              </ul>
            </div>
          ) : (
            <ul className="menu menu-horizontal px-1 flex gap-2">
              {" "}
              <li>
                {" "}
                <NavLink to={"/Login"}>
                  {" "}
                  <IoIosLogIn /> Login
                </NavLink>
              </li>
              <li>
                {" "}
                <NavLink to={"/Register"}>
                  {" "}
                  <CiCirclePlus /> Register
                </NavLink>
              </li>
            </ul>
          )}
        </div>
        {/*div 3*/}
      </div>

      <div className="lg:hidden">
        <div className="navbar bg-base-100">
          <div className="navbar-start">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
              >
                      <li>
              <NavLink to={"/"}>
                {" "}
                <FaHome /> Home
              </NavLink>{" "}
            </li>
            <li>
              <NavLink to={"/addblog"}>Add Blog</NavLink>
            </li>

            <li>
              <NavLink to={"/allblogs"}>All Blogs</NavLink>
            </li>
            <li>
              <NavLink to={"/featuredblogs"}>Featured Blogs</NavLink>
            </li>
            <li>
              <NavLink to={"/wishlist"}>Wish List</NavLink>
            </li>
              </ul>
            </div>
            <a className="btn btn-ghos">helo</a>
          </div>
          <div className="flex gap-2">
            <div className="navbar-end">
              <NavLink to={"/register"} className="btn btn-xs">
                {" "}
                Register
              </NavLink>
            </div>
            <div>
              <NavLink to={"/login"} className="btn btn-xs">
                {" "}
                Login
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
