import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import {
  forgotPassword,
  loginUser,
} from "../assets/Redux/Actions/UserAction.jsx";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent } from "@mui/material";
import { resetState } from "../assets/Redux/Reducers/userReducer.jsx";
import toast from "react-hot-toast";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { useFormik } from "formik";
import { loginSchema } from "../Schemas/index.jsx";
import "../App.css";
const Login = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, sent, message } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [forgotEmail, setForgotEmail] = useState("");

  const { values, handleSubmit, handleChange, errors, handleBlur, touched } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: loginSchema,
      onSubmit: (values) => {
        dispatch(loginUser(values));
      },
    });

  useEffect(() => {
    if (sent) {
      toast(message, {
        duration: 4000,
        position: "top-center",
        icon: <BsFillCheckCircleFill color="green" />,
        iconTheme: {
          primary: "#555700",
        },
        style: {
          background: "white",
          color: "green",
        },
      });
      dispatch(resetState());
    }
  }, [sent]);

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleTextChange = (event) => {
    setForgotEmail(event.target.value);
  };

  const handleForgotPasswordSubmit = () => {
    dispatch(forgotPassword(forgotEmail));
    handleClose();
  };
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, dispatch]);

  return (
    <div className="w-full instagram-new h-[60vh] ">
      <h1 className="text-center font-medium text-3xl mt-16 text-gray-700 ">
        Login
      </h1>
      <div className="w-full flex h-full flex-col items-center mt-10">
        <form
          onSubmit={handleSubmit}
          className=" flex w-full flex-col gap-4 p-4 "
        >
          <div className="border-[1px] bg-white border-gray-300 rounded-md">
            <div className="flex items-center">
              <input
                type="text"
                value={values.email}
                name="email"
                onBlur={handleBlur}
                placeholder="Enter Your Email"
                onChange={handleChange}
                className=" w-full rounded-md py-1.5 px-1 outline-none focus:outline-none "
              />
              {touched.email && errors.email && (
                <div className="pr-4 text-red-500">
                  <ErrorOutlineIcon />
                </div>
              )}
            </div>
            {touched.email && errors.email && (
              <p className="text-red-500 capitalize text-xs text-center pb-1">
                {errors.email}
              </p>
            )}
          </div>
          <div className="border-[1px] bg-white border-gray-300 rounded-md">
            <div className="flex items-center">
              <input
                type="password"
                name="password"
                value={values.password}
                placeholder="Enter Your Password"
                onChange={handleChange}
                onBlur={handleBlur}
                className=" w-full rounded-md py-1.5 px-1 outline-none focus:outline-none "
              />
              {touched.password && errors.password && (
                <div className="pr-4 text-red-500">
                  <ErrorOutlineIcon />
                </div>
              )}
            </div>
            {touched.password && errors.password && (
              <p className="text-red-500 capitalize text-xs text-center pb-1">
                {errors.password}
              </p>
            )}
          </div>

          <button
            disabled={Object.keys(errors).length > 0 ? true : false}
            className="px-10 py-2 bg-gradient-to-r from-[#6157ff] to-[#ee49fd] text-white rounded-md"
            type="submit"
          >
            Login
          </button>
        </form>
        <div>
          <button onClick={handleClickOpen}>Forgot Password</button>
        </div>
        <Dialog open={open} onClose={handleClose}>
          <DialogContent>
            <h1 className="text-center text-blue-600 pb-5 font-bold text-lg">
              Forgot Password
            </h1>
            <input
              placeholder="Enter your Email"
              value={forgotEmail}
              onChange={handleTextChange}
              className="bg-gradient-to-r custom-input from-[#b4dfff] to-[#d8b4ff] w-full mb-3 px-2 py-3 outline-none focus:outline-none border-[1px] border-gray-300 rounded-md "
            />
            <button
              className="bg-gradient-to-r from-[#6157ff] to-[#ee49fd] w-full text-white px-5 text-center py-1"
              onClick={handleForgotPasswordSubmit}
            >
              Submit
            </button>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Login;
