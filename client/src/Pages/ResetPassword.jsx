import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { resetPassword } from "../assets/Redux/Actions/UserAction.jsx";
import { resetState } from "../assets/Redux/Reducers/userReducer.jsx";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { reset, resetMessage } = useSelector((state) => state.user);
  const [password, setPassword] = useState("");
  const { token } = useParams();
  const [confirmPassword, setconfirmPassword] = useState("");

  useEffect(() => {
    if (reset) {
      toast(resetMessage, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      navigate("/loginsignup");
      dispatch(resetState());
    }
  }, [reset, resetMessage, dispatch]);
  const hanldeResetPasswordSubmit = (e) => {
    e.preventDefault();
    dispatch(resetPassword({ token, password, confirmPassword }));
  };
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-full flex items-center justify-center fixed h-16 bg-slate-100 top-0 z-50">
        <div className="flex sm:pl-10 pl-4 items-center gap-4">
          <Link className="text-4xl font-semibold text-gradient" to="/">
            DevMedia
          </Link>
        </div>
      </div>
      <form className="flex flex-col bg-white px-5 py-10 rounded-md gap-4 w-full sm:w-[33%] md:w-[25%]">
        <h1 className="text-2xl text-gray-600 pb-5 font-semibold text-center">
          Reset Password
        </h1>
        <input
          type="password"
          className="border-[1px] border-gray-300  custom-input   p-2 outline-none focus:outline-none rounded-md"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          className="border-[1px] border-gray-300 custom-input p-2 outline-none focus:outline-none rounded-md"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setconfirmPassword(e.target.value)}
        />
        <button
          onClick={hanldeResetPasswordSubmit}
          className="px-8 py-1.5 mt-3 bg-gradient-to-r from-[#6157ff] to-[#ee49fd] text-white rounded-md"
        >
          Reset
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
