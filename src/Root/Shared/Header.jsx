import { NavLink, Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { IoIosLogIn } from "react-icons/io";
import { CiCirclePlus } from "react-icons/ci";
import { useContext } from "react";
import { AuthContext } from "../../Firebase/Firebaseprovider";
import toast from "react-hot-toast";


const Header = () => {
  const { user , logout } = useContext(AuthContext);
  const handleSignOut = () => {
    logout()
      .then(() => toast.success("logout successfull"))
      .catch((error) => toast.error(error.message));
  };
  return (
    <>
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <Link className="btn btn-ghost text-xl">Blog Hub</Link>
        </div>
        <div>
          {" "}
          <div className="flex-none">
            <ul className="menu menu-horizontal px-1 flex gap-2">
              <li>
                <NavLink to={"/"}>
                  {" "}
                  <FaHome /> Home
                </NavLink>{" "}
              </li>
            </ul>
          </div>
          {user ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
              >
                <li>
                  <a className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </a>
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
      </div>
    </>
  );
};

export default Header;
