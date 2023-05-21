import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Carousel from "react-material-ui-carousel";
import {
  getSinglePost,
  updatePost,
} from "../assets/Redux/Actions/postAction.jsx";

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { post, postUpdated } = useSelector((state) => state.post);
  const [title, setTitle] = useState(post.title);
  const [desc, setDesc] = useState(post.desc);
  useEffect(() => {
    dispatch(getSinglePost({ id }));
    if (postUpdated) {
      navigate("/account");
    }
  }, [id, postUpdated]);

  const handleUpdatePostSubmit = (e) => {
    e.preventDefault();
    dispatch(updatePost({ id, title, desc }));
  };

  return (
    <div className="mt-40 instagram-new w-full h-full md:mt-20">
      <div className="flex flex-col items-center px-2 justify-center w-full">
        <h1 className="text-center text-3xl font-semibold text-gray-700 py-4">
          Edit Post
        </h1>
        <div className="w-full sm:w-2/4 p-1 sm:p-3 my-5 h-full rounded-md bg-white flex flex-col items-center  justify-between gap-3">
          <form className="w-full flex flex-col gap-4">
            <input
              type="text"
              placeholder="Enter Title"
              value={title}
              required
              onChange={(e) => setTitle(e.target.value)}
              className="bg-gradient-to-r custom-input from-[#b4dfff] to-[#d8b4ff] border-[1px] border-gray-300 outline-none focus:outline-none rounded-md px-2 py-2 w-full"
            />
            <textarea
              type="text"
              rows={5}
              placeholder="Enter Description"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              required
              className="bg-gradient-to-r custom-input from-[#b4dfff] to-[#d8b4ff] border-[1px] border-gray-300 outline-none focus:outline-none rounded-md px-2 py-2 w-full"
            />
          </form>
          <div className="py-2">
            <button
              onClick={handleUpdatePostSubmit}
              className="bg-gradient-to-r from-[#6157ff] to-[#ee49fd] text-white px-7 py-2 rounded-md "
            >
              Update
            </button>
          </div>
          {post.images && (
            <div className="w-full">
              <Carousel animation="slide" className="h-auto" interval={2000}>
                {post.images &&
                  post.images[0] &&
                  post.images.map((image, index) =>
                    image.imagePath.endsWith(`.mp4`) ? (
                      <video
                        key={index}
                        className="w-full  "
                        controls
                        src={`http://localhost:5000/${image.imagePath}`}
                        controlsstyle={{
                          maxWidth: "100%",
                          height: "auto",
                          maxHeight: "100%",
                        }}
                      >
                        Not Supported
                      </video>
                    ) : (
                      <img
                        key={index}
                        src={`http://localhost:5000/${image.imagePath}`}
                        alt="Pics"
                        className="w-full rounded-md"
                        controlsstyle={{
                          maxWidth: "100%",
                          height: "auto",
                          maxHeight: "100%",
                        }}
                      />
                    )
                  )}
              </Carousel>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditPost;
