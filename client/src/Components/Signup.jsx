import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../assets/Redux/Actions/UserAction.jsx";
import "../App.css";
import Cropper from "react-cropper";
import ReactModal from "react-modal";
import "cropperjs/dist/cropper.css";
import { useFormik } from "formik";
import { signupSchema } from "../Schemas/index.jsx";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const Signup = () => {
  const dispatch = useDispatch();
  const [gender, setGender] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [profilePicPath, setProfilePicPath] = useState("");
  const [cropper, setCropper] = useState(null);

  const { values, handleSubmit, handleChange, errors, handleBlur, touched } =
    useFormik({
      initialValues: {
        name: "",
        email: "",
        password: "",
        phone: "",
      },
      validationSchema: signupSchema,
      onSubmit: (values) => {
        const myForm = new FormData();
        myForm.set("name", values.name);
        myForm.set("email", values.email);
        myForm.set("password", values.password);
        myForm.set("gender", gender);
        myForm.set("profilePic", profilePic);
        myForm.set("phone", values.phone);
        dispatch(registerUser(myForm));
      },
    });

  const handleFileChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files.length > 0) {
      setProfilePic(e.target.files[0]);
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = () => {
        setProfilePicPath(reader.result);
      };
    }
  };
  const handleCropSubmit = (e) => {
    e.preventDefault();
    if (typeof cropper !== "undefined") {
      cropper.getCroppedCanvas().toBlob((blob) => {
        setProfilePic(blob);
        setProfilePicPath(URL.createObjectURL(blob));
      });
      setIsOpen(false);
    }
  };
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      width: "auto",
      height: "auto",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div className="w-full instagram-new h-[80vh] flex flex-col items-center justify-center">
      <h1 className="text-center font-medium text-3xl text-gray-700">Signup</h1>
      <div className="w-full flex flex-col gap-4 p-5">
        <form className=" flex flex-col gap-4  ">
          <div className="border-[1px] bg-white border-gray-300 rounded-md">
            <div className="flex items-center">
              <input
                type="text"
                onBlur={handleBlur}
                value={values.name}
                placeholder="Enter Your Name"
                name="name"
                onChange={handleChange}
                className=" w-full   py-1 px-1 outline-none rounded-md focus:outline-none"
              />
              {touched.name && errors.name && (
                <div className="pr-4 text-red-500">
                  <ErrorOutlineIcon />
                </div>
              )}
            </div>
            {touched.name && errors.name && (
              <p className="text-red-500 px-1 text-xs text-center pb-1">
                {errors.name}
              </p>
            )}
          </div>
          <div className="border-[1px] bg-white border-gray-300 rounded-md">
            <div className="flex items-center">
              <input
                type="number"
                name="phone"
                onBlur={handleBlur}
                value={values.phone}
                placeholder="Enter Your Phone Number"
                onChange={handleChange}
                className=" w-full   py-1 px-1 outline-none rounded-md focus:outline-none"
              />
              {touched.phone && errors.phone && (
                <div className="pr-4 text-red-500">
                  <ErrorOutlineIcon />
                </div>
              )}
            </div>
            {touched.phone && errors.phone && (
              <p className="text-red-500 px-1 text-xs text-center pb-1">
                {errors.phone}
              </p>
            )}
          </div>
          <div className="border-[1px] bg-white border-gray-300 rounded-md">
            <div className="flex items-center">
              <input
                type="email"
                onBlur={handleBlur}
                value={values.email}
                name="email"
                placeholder="Enter Your Email"
                onChange={handleChange}
                className=" w-full  py-1 px-1 outline-none rounded-md focus:outline-none"
              />
              {touched.email && errors.email && (
                <div className="pr-4 text-red-500">
                  <ErrorOutlineIcon />
                </div>
              )}
            </div>
            {touched.email && errors.email && (
              <p className="text-red-500 px-1 text-xs text-center pb-1">
                {errors.email}
              </p>
            )}
          </div>
          <div className="border-[1px] bg-white border-gray-300 rounded-md">
            <div className="flex items-center">
              <input
                type="password"
                value={values.password}
                onBlur={handleBlur}
                name="password"
                placeholder="Enter Your Password"
                onChange={handleChange}
                className=" w-full  py-1 px-1 outline-none rounded-md focus:outline-none"
              />
              {touched.password && errors.password && (
                <div className="pr-4 text-red-500">
                  <ErrorOutlineIcon />
                </div>
              )}
            </div>
            {touched.password && errors.password && (
              <p className="text-red-500 px-1 text-xs text-center pb-1">
                {errors.password}
              </p>
            )}
          </div>
          <select
            onChange={(e) => setGender(e.target.value)}
            name="gender"
            className="border-[1px] w-full border-gray-300 rounded-md py-1 px-1 outline-none focus:outline-none"
          >
            <option value={gender}>Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Rather not to Say</option>
          </select>
          <input
            className="w-full rounded-md px-2 outline-none focus:outline-none border-[1px] border-gray-300 py-1 "
            type="file"
            id="profilePic"
            name="profilePic"
            onChange={handleFileChange}
          />
          {profilePic && (
            <ReactModal
              isOpen={modalIsOpen}
              onRequestClose={closeModal}
              style={customStyles}
              contentLabel="Example Modal"
              ariaHideApp={false}
            >
              <div className="flex flex-col justify-center">
                <Cropper
                  src={profilePicPath}
                  style={{ height: 200, width: "50%" }}
                  initialAspectRatio={1}
                  aspectRatio={1}
                  guides={false}
                  onInitialized={(instance) => {
                    setCropper(instance);
                  }}
                />
                <button
                  className="text-center bg-gradient-to-l text-[#fff] text-lg font-semibold from-[#6157ff] to-[#ee49fd] mt-4"
                  onClick={handleCropSubmit}
                >
                  Crop
                </button>
              </div>
            </ReactModal>
          )}
        </form>
        <div className={profilePic ? "flex items-center gap-3" : "hidden"}>
          <img src={profilePicPath} alt="" className="w-12 h-12 rounded-full" />
          <button
            className="px-5 py-1 bg-[#055943] rounded-md text-white text-lg"
            onClick={openModal}
          >
            Edit
          </button>
        </div>
        <button
          onClick={handleSubmit}
          disabled={Object.keys(errors).length > 0 ? true : false}
          className="px-10 py-2 bg-gradient-to-r from-[#6157ff] to-[#ee49fd] text-white rounded-md"
          type="submit"
        >
          Signup
        </button>
      </div>
    </div>
  );
};

export default Signup;
