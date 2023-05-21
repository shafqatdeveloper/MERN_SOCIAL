import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../assets/Redux/Actions/UserAction.jsx";
import "../App.css";
import { useNavigate } from "react-router-dom";
import Cropper from "react-cropper";
import ReactModal from "react-modal";
import "cropperjs/dist/cropper.css";
import { useFormik } from "formik";
import { updateProfileSchema } from "../Schemas/index.jsx";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, profileUpdated } = useSelector((state) => state.user);
  const [gender, setGender] = useState(user.gender);
  const [profilePic, setProfilePic] = useState("");
  const [profilePicPath, setProfilePicPath] = useState(
    `http://localhost:5000/${user.profilePic.picPath}`
  );

  const oldPicPath = `http://localhost:5000/${user.profilePic.picPath}`;

  const { values, handleSubmit, handleChange, errors, handleBlur, touched } =
    useFormik({
      initialValues: {
        name: "",
        email: "",
        phone: "",
      },
      validationSchema: updateProfileSchema,
      onSubmit: (values) => {
        const myForm = new FormData();
        myForm.set("name", values.name);
        myForm.set("email", values.email);
        myForm.set("gender", gender);
        myForm.set("profilePic", profilePic);
        myForm.set("phone", values.phone);
        myForm.set("oldPicPath", oldPicPath);
        dispatch(updateProfile(myForm));
      },
    });
  const handleFileChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files.length > 0) {
      setProfilePic(e.target.files[0]);
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onloadend = () => {
        setProfilePicPath(reader.result);
      };
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
  const [cropper, setCropper] = useState();

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

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    if (profileUpdated) {
      navigate("/account");
    }
  }, [profileUpdated]);

  return (
    <div className="w-full mt-40 md:mt-20 h-[85vh] flex flex-col items-center justify-center">
      <div className="bg-white rounded-md">
        <h1 className="text-center pt-5 font-medium text-xl text-gray-700">
          Update Profile
        </h1>
        <div className="w-full flex flex-col gap-4 p-5">
          <form className=" flex  flex-col gap-4 ">
            <div className="border-[1px] border-gray-300 bg-white  rounded-md">
              <div className="flex items-center">
                <input
                  type="text"
                  onBlur={handleBlur}
                  value={values.name}
                  placeholder="Enter Your Name"
                  name="name"
                  onChange={handleChange}
                  className=" w-full  py-1 px-1 outline-none rounded-md focus:outline-none"
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
            <div className=" bg-white border-[1px] border-gray-300  rounded-md">
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
            <div className=" bg-white border-[1px] border-gray-300  rounded-md">
              <div className="flex items-center">
                <input
                  type="email"
                  onBlur={handleBlur}
                  value={values.email}
                  name="email"
                  placeholder="Enter Your Email"
                  onChange={handleChange}
                  className=" w-full  py-1 px-1 outline-none bg-transparent rounded-md focus:outline-none"
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
            <select
              onChange={(e) => setGender(e.target.value)}
              name="gender"
              className="border-[1px] border-gray-300 capitalize w-full  rounded-md py-1 px-1 outline-none focus:outline-none"
            >
              <option value={gender}>{user.gender}</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Rather not to Say</option>
            </select>
            <input
              className="w-full rounded-md px-2 outline-none focus:outline-none  border-[1px] border-gray-300 py-1 "
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
                    crop={(e) => console.log(e.detail)}
                    onInitialized={(instance) => {
                      setCropper(instance);
                    }}
                  />
                  <button
                    className="text-center bg-gradient-to-r from-[#6157ff] to-[#ee49fd] mt-4"
                    onClick={handleCropSubmit}
                  >
                    Crop
                  </button>
                </div>
              </ReactModal>
            )}
          </form>
          <div className={profilePic ? "flex items-center gap-3" : "hidden"}>
            <img
              src={profilePicPath}
              alt=""
              className="w-12 h-12 border-[1px] border-red-500 rounded-full"
            />
            <button
              className="px-5 py-1 bg-[#055943] rounded-md text-white text-lg"
              onClick={openModal}
            >
              Edit
            </button>
          </div>
          <button
            className="px-10 py-2 bg-gradient-to-r from-[#6157ff] to-[#ee49fd] text-white rounded-md"
            onClick={handleSubmit}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
