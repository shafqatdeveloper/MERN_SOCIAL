import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineHome, AiOutlineMenu } from "react-icons/ai";
import { MdOutlineMessage, MdPerson } from "react-icons/md";
import "../App.css";
import { FaUserFriends } from "react-icons/fa";
import profile from "../assets/userAvatar.png";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./Loader.jsx";
const Navbar = ({ handleLogoutSubmit }) => {
  const location = useLocation();
  const { user, isAuthenticated, loading } = useSelector((state) => state.user);

  const [accountMenu, setAccountMenu] = useState(false);

  const navLinks = [
    { to: "/home", icon: AiOutlineHome },
    { to: "/friends", icon: FaUserFriends },
    { to: "/messages", icon: MdOutlineMessage },
    { to: "/account", icon: MdPerson },
  ];
  const mobileNavLinks = [
    { to: "/home", icon: AiOutlineHome },
    { to: "/friends", icon: FaUserFriends },
    { to: "/messages", icon: MdOutlineMessage },
    { to: "/account", icon: MdPerson },
    { to: "/menu", icon: AiOutlineMenu },
  ];

  return (
    <div className="w-full font-alvetica fixed bg-slate-100 top-0 z-50">
      {loading ? (
        <Loader />
      ) : (
        isAuthenticated && (
          <div className="w-full h-[4.5rem] hidden  text-black lg:flex items-center justify-between ">
            {isAuthenticated && (
              <>
                <div className="flex sm:pl-10 pl-4 items-center gap-4">
                  <Link
                    className="text-4xl font-insta font-semibold text-gradient"
                    to="/"
                  >
                    DevMedia
                  </Link>
                </div>
                <div className="flex items-center gap-4 md:gap-20">
                  {navLinks.map((link) => {
                    const Icon = link.icon;
                    return (
                      <Link to={link.to} key={link.to}>
                        <Icon
                          size={30}
                          className={
                            location.pathname === link.to ? "active" : ""
                          }
                        />
                      </Link>
                    );
                  })}
                </div>
              </>
            )}
            {isAuthenticated && (
              <div className="md:pr-10 pr-6">
                <div className="border-[1px] border-[#7e7a7a] rounded-full p-0.5">
                  <img
                    onClick={() => setAccountMenu(!accountMenu)}
                    src={
                      user && user.profilePic.picPath
                        ? `http://localhost:5000/${user.profilePic.picPath}`
                        : profile
                    }
                    alt=""
                    className="w-12 h-12 relative rounded-full"
                  />
                </div>
                {accountMenu && (
                  <div className="flex flex-col text-white bg-black/20 backdrop-filter backdrop-blur-xl absolute w-48 h-56 top-16 z-20 right-7 items-center justify-center  rounded-md p-2  gap-2">
                    <Link
                      onClick={() => setAccountMenu(!accountMenu)}
                      className=" p-0.5 w-full text-xl  font-bold"
                      to="/"
                    >
                      Home
                    </Link>
                    <Link
                      onClick={() => setAccountMenu(!accountMenu)}
                      className=" p-0.5 text-xl  w-full"
                      to="/account"
                    >
                      Account
                    </Link>
                    <Link
                      onClick={() => setAccountMenu(!accountMenu)}
                      to="password/change"
                      className=" p-0.5 text-xl  w-full"
                    >
                      Change Password
                    </Link>
                    <button
                      onClick={handleLogoutSubmit}
                      className="text-start text-xl  p-0.5  w-full"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        )
      )}
      <div className="w-full h-[4.5rem] lg:hidden flex items-center px-3 justify-center text-gradient font-insta text-white">
        <Link className="font-semibold text-3xl" to="/">
          DevMedia
        </Link>
      </div>
      {isAuthenticated && (
        <div className="w-full h-[4.5rem] mt-[2px] lg:hidden flex items-center px-3 justify-between bg-white/70 text-gray-600">
          {mobileNavLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link to={link.to} key={link.to}>
                <Icon
                  size={30}
                  className={location.pathname === link.to ? "active" : ""}
                />
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Navbar;
