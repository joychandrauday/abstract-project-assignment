import { useContext } from "react";
import logo from "../../../../public/favicon.png";
import { AuthContext } from "../../../providers/AuthProvider";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  console.log(user);
  return (
    <div className=" bg-black text-white py-2">
      <div className="navbar container mx-auto">
        <div className="flex-1">
          <a className=" text-xl">
            <div className="flex items-center justify-center">
              <div className="flex gap-3 items-center font-bold">
                <img src={logo} alt="" className="w-[45px] rounded-md h-full" />
                Abstract
              </div>
              <div className=" mx-3 w-[2px] bg-white mb-0 mt-0  h-7"></div>
              <div className="">Help center</div>
            </div>
          </a>
        </div>
        <div className="flex-none">
          {user ? (
            <div className="dropdown dropdown-end flex items-center">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src={user.photoURL}
                  />
                </div>
              </div>
              <ul
                tabIndex={999}
                className="menu menu-sm dropdown-content lg:mt-32 z-[999] p-2 shadow bg-black rounded-box w-44"
              >
                <li>
                  <h1 className="text-basic block  font-extrabold">
                    welcome{" "}
                    <div className="text-second">{user?.displayName}</div>
                  </h1>
                </li>
                <li>
                  <a onClick={() => logOut()}>Logout</a>
                </li>
              </ul>
            </div>
          ) : (
            <Link to={'/private'} className="bg-white bg-opacity-20 backdrop-blur-sm text-white capitalize py-2 px-4 rounded-lg border">
              submit request
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
