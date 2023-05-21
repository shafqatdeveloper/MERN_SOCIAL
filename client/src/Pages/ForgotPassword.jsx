import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "../assets/Redux/Actions/UserAction.jsx";
import { toast } from "react-toastify";
import { resetState } from "../assets/Redux/Reducers/userReducer.jsx";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const { sent, message } = useSelector((state) => state.user);
  const [email, setEmail] = useState("");
  const handleForgotPasswordSubmit = (e) => {
    e.preventDefault();
    dispatch(forgotPassword(email));
  };
  const navigate = useNavigate();
  useEffect(() => {
    if (sent) {
      toast(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      dispatch(resetState());
      navigate("/loginsignup");
    }
  }, [sent]);
  return (
    <div className="w-full h-[95vh] flex items-center justify-center">
      <form className="flex bg-orange-300 p-2 gap-2 items-center flex-col">
        <input
          type="text"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter Email"
          className="border-2 border-orange-500 px-1 py-2 w-72 outline-none focus:outline-none"
        />
        <button
          onClick={handleForgotPasswordSubmit}
          className="bg-gradient-to-r from-[#6157ff] to-[#ee49fd] font-medium text-lg text-white w-32 px-8 py-2"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
