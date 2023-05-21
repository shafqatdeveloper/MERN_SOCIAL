import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../assets/Redux/Actions/UserAction.jsx";

const Menu = () => {
  const dispatch = useDispatch();
  const logoutHandler = (e) => {
    e.preventDefault();
    dispatch(logout());
  };
  return (
    <div className="mt-40 flex instagram-new items-center justify-center w-full h-full lg:hidden lg:mt-20">
      <div className="w-full flex flex-col items-center gap-4 sm:w-2/4 md:w-1/4">
        <Link
          className="w-[95%] rounded-md py-5 bg-gradient-to-r from-[#6157ff] to-[#ee49fd] text-xl text-[#fff] font-semibold"
          to="/home"
        >
          <button className="w-full">Home</button>
        </Link>
        <Link
          className="w-[95%] rounded-md  py-5 bg-gradient-to-r from-[#6157ff] to-[#ee49fd] text-[#fff] text-xl font-semibold"
          to="/account"
        >
          <button className="w-full">Account</button>
        </Link>
        <Link
          className="w-[95%] rounded-md  py-5 bg-gradient-to-r from-[#6157ff] to-[#ee49fd] text-xl font-semibold text-[#fff]"
          to="/password/change"
        >
          <button className="w-full">Change Password</button>
        </Link>
        <button
          onClick={logoutHandler}
          className="w-[95%] rounded-md py-5 bg-gradient-to-r from-[#6157ff] to-[#ee49fd] text-xl font-semibold text-[#fff]"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Menu;
