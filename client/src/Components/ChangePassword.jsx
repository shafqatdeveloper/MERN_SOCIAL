import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePassword } from "../assets/Redux/Actions/UserAction.jsx";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { passwordUpdated } = useSelector((state) => state.user);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const updatePasswordHandler = (e) => {
    e.preventDefault();
    dispatch(updatePassword({ oldPassword, newPassword, confirmPassword }));
  };
  useEffect(() => {
    if (passwordUpdated) {
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    }
  }, [passwordUpdated]);

  return (
    <div className="mt-20 instagram-new w-full h-[85vh] flex items-center justify-center">
      <div className="w-[80%] sm:w-[30%] ">
        <form
          onSubmit={updatePasswordHandler}
          className="w-full bg-white p-3 rounded-md"
        >
          <h1 className=" text-center text-xl pb-6 pt-7 font-semibold">
            Change Password
          </h1>
          <div className="flex flex-col justify-center items-center gap-4">
            <input
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              placeholder="Enter Old Password"
              className=" custom-input  border-[1px] border-gray-300 w-full  py-1 px-2 rounded-md outline-none focus:outline-none"
            />
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter New Password"
              className=" custom-input  border-[1px] border-gray-300 w-full  py-1 px-2 rounded-md outline-none focus:outline-none"
            />
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm New Password"
              className=" custom-input  border-[1px] border-gray-300 w-full  py-1 px-2 rounded-md outline-none focus:outline-none"
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-[#6157ff] to-[#ee49fd] w-32 my-4 py-2 text-lg rounded-md text-white"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
