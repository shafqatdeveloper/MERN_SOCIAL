import React, { useEffect, useState } from "react";
import { MdOutlineInsertPhoto } from "react-icons/md";
import { AiOutlineVideoCamera } from "react-icons/ai";
import "../App.css";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../assets/Redux/Actions/postAction.jsx";
import { resetState } from "../assets/Redux/Reducers/postReducer.jsx";
import toast from "react-hot-toast";
import { BsFillCheckCircleFill } from "react-icons/bs";

const CreatePost = () => {
  const dispatch = useDispatch();
  const { posted } = useSelector((state) => state.post);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [files, setFiles] = useState([]);
  const toastContainerStyle = {
    fontSize: "14px",
    borderRadius: "80px",
    padding: "12px",
    background: "white",
    color: "green",
  };

  // Custom styles for the icons
  const iconStyle = {
    width: "24px",
    height: "24px",
    color: "green",
  };
  useEffect(() => {
    if (posted) {
      toast("Post Created", {
        duration: 4000,
        position: "top-center",
        icon: <BsFillCheckCircleFill style={iconStyle} />,
        iconTheme: {
          primary: "#555700",
        },
        style: toastContainerStyle,
      });
      setTitle("");
      setDesc("");
      setFiles([]);
      dispatch(resetState());
    }
  }, [posted]);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
  };

  const handlePostSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set("title", title);
    formData.set("desc", desc);
    files.forEach((file) => {
      formData.append("files", file);
    });
    dispatch(createPost(formData));
  };

  return (
    <div className="w-full h-full font-alvetica p-0.5 mt-1 flex flex-col items-center  justify-center ">
      <div className="p-1 w-full sm:p-3 rounded-md bg-white">
        <h1 className="text-center text-gray-600 font-semibold py-2 text-xl">
          Create A New Post
        </h1>
        <form className="w-full flex flex-col items-center  justify-between gap-3">
          <input
            type="text"
            placeholder="Enter title"
            value={title}
            required
            onChange={(e) => setTitle(e.target.value)}
            className="bg-gradient-to-r custom-input from-[#b4dfff] to-[#d8b4ff] outline-none focus:outline-none rounded-md px-2 py-2 w-full"
          />
          <textarea
            type="text"
            rows={5}
            placeholder="Enter description"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            required
            className="bg-gradient-to-r custom-input from-[#b4dfff] to-[#d8b4ff] outline-none focus:outline-none rounded-md px-2 py-2 w-full"
          />
          <div className="flex items-center gap-2  ">
            <div>
              <label htmlFor="photo">
                <MdOutlineInsertPhoto className="text-green-800" size={25} />
              </label>
              <input
                type="file"
                onChange={handleFileChange}
                multiple
                accept=".jpg, .jpeg, .png"
                id="photo"
              />
            </div>
            <div>
              <label htmlFor="video">
                <AiOutlineVideoCamera size={25} className="text-pink-800" />
              </label>
              <input
                type="file"
                onChange={handleFileChange}
                multiple
                accept=".mkv , .mp4"
                id="video"
              />
            </div>
            <div>
              <button
                disabled={title === "" || desc === "" ? true : false}
                onClick={handlePostSubmit}
                className="bg-gradient-to-r text-lg font-semibold from-[#6157ff] to-[#ee49fd] text-white px-8 sm:px-[40px] py-[11px] rounded-md mb-1"
              >
                Post
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
