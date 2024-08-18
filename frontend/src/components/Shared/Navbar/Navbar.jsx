import { useContext } from "react";
import logo from "../../../../public/favicon.png";
import { AuthContext } from "../../../providers/AuthProvider";
import { Link } from "react-router-dom";
import { IoIosInformationCircleOutline } from "react-icons/io";
const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  return (
    <div className=" bg-black text-white py-2">
      <div className="navbar container mx-auto">
        <div className="flex-1">
          <a className=" text-xl">
            <div className="flex items-center justify-center">
              <Link to={"/"} className="flex gap-3 items-center font-bold">
                <img src={logo} alt="" className="w-[45px] rounded-md h-full" />
                Abstract
              </Link>
              <div className=" mx-3 w-[2px] bg-white mb-0 mt-0  h-7"></div>
              <div className="">
                Help center{" "}
                <button className="" onClick={() => document.getElementById("my_modal_5").showModal()}>
                <IoIosInformationCircleOutline />
                </button>
              </div>
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
                className="menu menu-sm dropdown-content mt-72 z-[999] p-2 shadow bg-black rounded-box w-44"
              >
                <li>
                  <h1 className="text-basic block  font-extrabold">
                    welcome{" "}
                    <div className="text-second">{user?.displayName}</div>
                  </h1>
                </li>
                <li>
                  <a href="/private">Submit Request</a>
                </li>
                <li>
                  <a href="/requests">My requests.</a>
                </li>
                <li>
                  <a href="/addcard">Add New Card</a>
                </li>
                <li>
                  <a href="/all-requests">All requests</a>
                </li>
                <li>
                  <a href="/all-cards">All Cards</a>
                </li>
                <li>
                  <a onClick={() => logOut()}>Logout</a>
                </li>
              </ul>
            </div>
          ) : (
            <Link
              to={"/private"}
              className="bg-white bg-opacity-20 backdrop-blur-sm text-white capitalize py-2 px-4 rounded-lg border"
            >
              submit request
            </Link>
          )}
        </div>
      </div>
     
      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box text-black capitalize">
          {/* functionalities */}
          <h1 className="card-title">Functionalities</h1>
          <ol type="a">
            <li>Add Cards / Delete Cards / Search Cards</li>
            <li>Post Requests / Update Requests</li>
            <li>Firebase Authentication</li>
            <li>Private route</li>
          </ol>
          <div className="divider divider-vertical"></div>
          <h1 className="text-sm text-warning bg-black p-1">PS: JWT is not functionable. and I did not implement secure api routing due short time span. Yet i implement all the routes and functionalities an agent would need to manage this help center website like, adding cards,updating requests,deleting cards etc.You will find all these routes by clicking on you profile image on right top corner.<br/> feel free to inquire anything,anytime. <a className="link" href="mailto:joychandraud@gmail.com">mail me.</a> </h1>
          
          <button
            className="px-3 border  rounded"
            onClick={() => document.getElementById("my_modal_5").close()}
          >Close</button>
        </div>
      </dialog>
    </div>
  );
};

export default Navbar;
