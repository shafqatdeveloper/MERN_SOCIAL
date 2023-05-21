import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import profile from "../assets/userAvatar.png";
import {
  createComment,
  deleteComment,
  deletePost,
  getLoggedInUserPosts,
  likePost,
  unLikePost,
} from "../assets/Redux/Actions/postAction.jsx";
import Carousel from "react-material-ui-carousel";
import Loader from "../Components/Loader.jsx";
import {
  MdExpandMore,
  MdMessage,
  MdOutlineCancel,
  MdOutlineThumbUp,
  MdThumbUp,
} from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";
import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  styled,
} from "@mui/material";
import {
  AiFillDelete,
  AiOutlineArrowDown,
  AiOutlineArrowUp,
  AiOutlineCheck,
  AiOutlineWarning,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import ReactModal from "react-modal";
import {
  deleteProfile,
  loadUser,
} from "../assets/Redux/Actions/UserAction.jsx";
import { debounce } from "lodash";

const StyledAccordion = styled(Accordion)(({ theme }) => ({
  backgroundImage: "linear-gradient(to right,#b4dfff,#d8b4ff)",
  marginBottom: theme.spacing(2),

  "&::before": {
    display: "none",
  },

  "&.Mui-expanded": {
    margin: "0",

    "&:first-of-type": {
      borderTopLeftRadius: theme.shape.borderRadius,
      borderTopRightRadius: theme.shape.borderRadius,
    },

    "&:last-of-type": {
      borderBottomLeftRadius: theme.shape.borderRadius,
      borderBottomRightRadius: theme.shape.borderRadius,
    },
  },
}));

const StyledAccordionSummary = styled(AccordionSummary)(({ theme }) => ({
  backgroundImage: "linear-gradient(to right,#b4dfff,#d8b4ff)",
  borderRadius: "7px",
  borderBottom: `1px solid ${theme.palette.divider}`,

  "& .MuiAccordionSummary-content": {
    margin: "12px 0",
  },
}));
const AdminProfile = () => {
  const dispatch = useDispatch();
  const { user, profileUpdated, profileDeleted } = useSelector(
    (state) => state.user
  );
  const { userPosts, loading, commented, likeLoading, unlikeLoading } =
    useSelector((state) => state.post);
  const [likeTrigger, setLikeTrigger] = useState(false);
  const [commentInput, setCommentInput] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [postOptions, setPostOptions] = useState(false);
  const [postDeleteOptions, setPostDeleteOptions] = useState(false);
  const [commentDeleteOptions, setCommentDeleteOptions] = useState(false);
  const [selectedCommentId, setSelectedCommentId] = useState(null);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [commentToggle, setCommentToggle] = useState(false);
  const [profileDelete, setProfileDelete] = useState(false);

  useEffect(() => {
    dispatch(getLoggedInUserPosts());
  }, [likeTrigger, commented]);
  useEffect(() => {
    dispatch(loadUser());
  }, [profileUpdated, profileDeleted]);
  const customStylesProfilePic = {
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 9999,
    },
    content: {
      top: "50%",
      left: "50%",
      width: "auto",
      height: "auto",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      borderRadius: "100%",
      transform: "translate(-50%, -50%)",
      zIndex: 9999,
    },
  };
  const customStylesProfileDelete = {
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 9999,
    },
    content: {
      top: "50%",
      left: "50%",
      width: "auto",
      height: "auto",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      zIndex: 9999,
    },
  };
  function closeModal() {
    setIsOpen(false);
  }
  function openModal() {
    setIsOpen(true);
  }
  function closeProfileDeleteModel() {
    setProfileDelete(false);
  }
  function openProfileDeleteModel() {
    setProfileDelete(true);
  }
  const [message, setMessage] = useState("");
  const [likeMenu, setLikeMenu] = useState(false);
  const deleteProfileHandler = (e) => {
    e.preventDefault();
    dispatch(deleteProfile());
  };
  return (
    <div className="w-full instagram-new mt-40 h-full md:mt-20 flex items-center justify-center flex-col">
      <div className=" sm:w-3/4 md:w-[63%] w-full">
        <div className="flex py-4  bg-[#fff]  my-4  justify-between flex-col sm:flex-row items-start rounded-md p-5 sm:items-center gap-7">
          <div className="flex md:flex-col items-center gap-2">
            <img
              onClick={openModal}
              src={
                user && user.profilePic.picPath
                  ? `http://localhost:5000/${user.profilePic.picPath}`
                  : profile
              }
              alt="User"
              className="w-20 h-20 cursor-pointer sm:w-36 sm:h-36 md:w-44 sm:px-0 md:h-44 object-cover rounded-full"
            />
            <div className="flex items-center gap-3">
              <Link to="/update/profile">
                <button className="bg-gradient-to-r from-[#6157ff] to-[#ee49fd] rounded-md sm:p-2 px-1.5 py-2 text-white">
                  Update Profile
                </button>
              </Link>
              <button
                onClick={openProfileDeleteModel}
                className="bg-[#d61313] rounded-md sm:py-2 px-1.5 py-2 sm:px-2.5 text-white"
              >
                Delete Profile
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 ">
              <h1 className="text-lg font-bold">Name : </h1>
              <h1 className="capitalize font-medium text-gray-700 ">
                {user.name}
              </h1>
            </div>
            <div className="flex items-center gap-2 ">
              <h1 className="text-lg font-bold">Email : </h1>
              <h1 className=" font-medium text-gray-700 ">{user.email}</h1>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 ">
              <h1 className="text-lg font-bold">Gender : </h1>
              <h1 className="capitalize font-medium text-gray-700 ">
                {user.gender}
              </h1>
            </div>
            <div className="flex items-center gap-2 ">
              <h1 className="text-lg font-bold">Phone : </h1>
              <h1 className=" font-medium text-gray-700 ">0{user.phone}</h1>
            </div>
          </div>
        </div>
        <div className="bg-[#fff] rounded-md p-4">
          <h1 className="text-center font-medium text-2xl">Profile Info</h1>
          <div className="grid grid-cols-2 sm:grid-cols-4 my-5 gap-3">
            <Link to="/friends">
              <div className="flex bg-gradient-to-r from-[#6157ff] to-[#ee49fd] items-center px-1 py-5 rounded-md flex-col ">
                <h1 className="text-center font-semibold text-[#fff] text-lg">
                  Followers
                </h1>
                <h1 className="text-center font-medium px-3 bg-white rounded-full py-1">
                  {user.followers && user.followers.length}
                </h1>
              </div>
            </Link>
            <Link to="/home">
              <div className="flex bg-gradient-to-r from-[#6157ff] to-[#ee49fd] px-1 items-center py-5 rounded-md flex-col ">
                <h1 className="text-center font-semibold text-[#fff] text-lg">
                  Following
                </h1>
                <h1 className="text-center font-medium px-3 bg-white rounded-full py-1">
                  {user.followings && user.followings.length}
                </h1>
              </div>
            </Link>
            <div className="flex bg-gradient-to-r from-[#6157ff] to-[#ee49fd] items-center px-1 py-5 rounded-md flex-col ">
              <h1 className="text-center font-semibold text-[#fff] text-lg">
                Posts
              </h1>
              <h1 className="text-center font-medium px-3 bg-white rounded-full py-1">
                {user.posts && user.posts.length}
              </h1>
            </div>
            <div className="flex bg-gradient-to-r from-[#6157ff] to-[#ee49fd] items-center  px-1 py-5 rounded-md flex-col ">
              <h1 className="text-center font-semibold text-lg text-gray-200">
                Joined
              </h1>
              <h1 className="text-center font-medium px-3 bg-white rounded-full py-1">
                {String(user.createdAt).substring(0, 10)}
              </h1>
            </div>
          </div>
        </div>
      </div>
      <ReactModal
        isOpen={profileDelete}
        onRequestClose={closeProfileDeleteModel}
        style={customStylesProfileDelete}
        contentLabel="Example Modal"
        ariaHideApp={false}
      >
        <div className="flex w-full items-center flex-col justify-center">
          <h1 className="text-lg font-semibold">
            Are you sure you to Delete your Profile ?
          </h1>
          <div className="flex justify-start items-center gap-2">
            <AiOutlineWarning className="text-red-500" size={20} />
            <h1>Once Deleted Can't be undone</h1>
          </div>
          <div className="flex items-center gap-5 mt-4">
            <button
              onClick={closeProfileDeleteModel}
              className="bg-green-600 px-4 rounded-md text-white py-2"
            >
              Cancel
            </button>
            <button
              onClick={deleteProfileHandler}
              className="bg-red-600 px-4 rounded-md text-white py-2"
            >
              Delete
            </button>
          </div>
        </div>
      </ReactModal>
      <ReactModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStylesProfilePic}
        contentLabel="Example Modal"
        ariaHideApp={false}
      >
        <div className="flex w-full flex-col justify-center">
          <img
            src={
              user && user.profilePic.picPath
                ? `http://localhost:5000/${user.profilePic.picPath}`
                : profile
            }
            alt="User"
            className="w-96 h-96"
          />
        </div>
      </ReactModal>
      {loading ? (
        <Loader />
      ) : (
        <div className="w-full flex flex-col gap-3  mt-5 sm:w-3/4 md:w-[63%]">
          {userPosts && userPosts.length > 0 ? (
            userPosts.map((post, index) => {
              const isLiked = post.likes.some(
                (like) => like.userId.toString() === user._id.toString()
              );
              const likeHandler = debounce(async () => {
                if (isLiked) {
                  await dispatch(unLikePost(post._id));
                } else {
                  await dispatch(likePost(post._id));
                }
                setLikeTrigger(!likeTrigger);
              }, 300);
              const commentHandler = (e) => {
                e.preventDefault();
                dispatch(createComment({ message, postId: post._id }));
                setMessage("");
              };
              const deleteHandler = debounce(async (e) => {
                e.preventDefault();
                const postId = post._id;
                console.log(postId);
                await dispatch(deletePost({ id: postId }));
                setLikeTrigger(!likeTrigger);
                setPostOptions(false);
                setPostDeleteOptions(false);
              }, 300);

              const deleteCommentHandler = async (e, commentId) => {
                e.preventDefault();
                await dispatch(deleteComment({ id: post._id, commentId }));
                setLikeTrigger(!likeTrigger);
                setCommentToggle(!commentToggle);
              };
              const handleCommentOption = (id) => {
                setCommentDeleteOptions(!commentDeleteOptions);
                setSelectedCommentId(id);
              };

              const handlePostOption = (id) => {
                setPostOptions(!postOptions);
                setSelectedPostId(id);
              };

              return (
                <div key={index} className="bg-white rounded-md p-4">
                  <div className="flex items-center justify-between  py-2">
                    <div className="flex items-center gap-3">
                      <img
                        src={
                          post && post.creator
                            ? `http://localhost:5000/${post.creatorPic.imagePath}`
                            : profile
                        }
                        alt="Creator"
                        className="w-12 h-12 rounded-full"
                      />
                      <h1 className="font-medium capitalize text-gray-600 ">
                        {post.creator}
                      </h1>
                    </div>
                    <h1 className=" text-gray-600 px-1 py-0.5 rounded-md">
                      {String(post.createdAt).substring(0, 10)}
                    </h1>
                    <div className="relative">
                      <BsThreeDotsVertical
                        className="cursor-pointer relative"
                        size={25}
                        onClick={() => handlePostOption(post._id)}
                      />
                      {postOptions && selectedPostId === post._id && (
                        <div className="absolute w-24  flex flex-col px-4 right-[-1rem] top-8 items-start rounded-md bg-gray-100">
                          <button
                            onClick={() =>
                              setPostDeleteOptions(!postDeleteOptions)
                            }
                            className="text-lg font-semibold text-red-500"
                          >
                            Delete
                          </button>
                          <Link to={`/post/edit/${post._id}`}>
                            <button className="text-lg font-semibold text-blue-500">
                              Edit
                            </button>
                          </Link>
                        </div>
                      )}
                      {postDeleteOptions && selectedPostId === post._id && (
                        <div className="absolute w-24 h-16  flex flex-col px-4 right-[-1rem] top-8 items-center gap-2 py-1 rounded-md bg-gray-100">
                          <button
                            onClick={deleteHandler}
                            className="text-lg text-red-500"
                          >
                            <AiOutlineCheck size={27} />
                          </button>
                          <button
                            onClick={() => setPostDeleteOptions(false)}
                            className="text-lg text-green-500"
                          >
                            <MdOutlineCancel size={24} />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="my-4 flex flex-col gap-2">
                    <h1 className="text-lg font-semibold text-gray-600">
                      {post.title}
                    </h1>
                    <h1 className="font-medium text-gray-500">{post.desc}</h1>
                  </div>
                  <Carousel
                    autoPlay={false}
                    className="w-full h-auto"
                    animation="slide"
                    interval={2000}
                  >
                    {post.images &&
                      post.images[0] &&
                      post.images.map((image, index) =>
                        image.imagePath.endsWith(`.mp4`) ? (
                          <video
                            key={index}
                            className="w-full object-cover"
                            controlsstyle={{
                              maxWidth: "100%",
                              height: "auto",
                              maxHeight: "100%",
                            }}
                            src={`http://localhost:5000/${image.imagePath}`}
                          >
                            Not Supported
                          </video>
                        ) : (
                          <img
                            key={index}
                            src={`http://localhost:5000/${image.imagePath}`}
                            alt="Pics"
                            className="w-full rounded-md "
                            style={{
                              maxWidth: "100%",
                              height: "auto",
                              maxHeight: "100%",
                            }}
                          />
                        )
                      )}
                  </Carousel>
                  <div className="flex mt-4 items-center justify-between">
                    <div className="flex flex-col gap-2">
                      <button
                        disabled={likeLoading || unlikeLoading ? true : false}
                        onClick={likeHandler}
                      >
                        {isLiked ? (
                          <MdThumbUp className="text-blue-500" size={30} />
                        ) : (
                          <MdOutlineThumbUp
                            className="text-blue-500"
                            size={30}
                          />
                        )}
                      </button>
                      <h1
                        onClick={() => setLikeMenu(!likeMenu)}
                        className="text-lg cursor-pointer font-semibold text-slate-500"
                      >
                        {post.likes && post.likes.length}{" "}
                        <span>
                          {post.likes && post.likes.length > 1
                            ? "Likes"
                            : "Like"}
                        </span>{" "}
                      </h1>
                    </div>
                    <div>
                      <button
                        onClick={() => setCommentInput(!commentInput)}
                        className="flex items-center gap-2"
                      >
                        <MdMessage size={25} className="text-blue-500" />
                        <h1 className="text-lg">Comment</h1>
                      </button>
                    </div>
                  </div>
                  <div className={likeMenu ? "block" : "hidden"}>
                    <StyledAccordion>
                      <StyledAccordionSummary
                        expandIcon={<MdExpandMore />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        {post && post.likes.length > 0 ? (
                          <h1>
                            Likes{" "}
                            <span className="font-semibold">
                              {post && post.likes.length}
                            </span>
                          </h1>
                        ) : (
                          <h1>No Likes</h1>
                        )}
                      </StyledAccordionSummary>
                      {post &&
                        post.likes.length > 0 &&
                        post.likes.map((item, index) => (
                          <AccordionDetails key={index}>
                            <div
                              key={index}
                              className="flex bg-white flex-col py-1.5 rounded-md gap-2"
                            >
                              <div className=" flex items-center justify-between">
                                <Link
                                  to={
                                    item.userId.toString() ===
                                    user._id.toString()
                                      ? "/account"
                                      : `/details/${item.userId}`
                                  }
                                >
                                  <div className="flex ml-2 mt-2 items-center gap-2">
                                    <img
                                      src={
                                        item.user && item.user.userPicPath
                                          ? `http://localhost:5000/${item.user.userPicPath}`
                                          : profile
                                      }
                                      alt="Comment User"
                                      className="w-10 h-10 rounded-full"
                                    />
                                    <h1 className="text-sm">
                                      {item.user.userName}
                                    </h1>
                                  </div>
                                </Link>
                              </div>
                            </div>
                          </AccordionDetails>
                        ))}
                    </StyledAccordion>
                  </div>
                  <div
                    className={
                      commentInput ? "p-1 flex flex-col items-center" : "hidden"
                    }
                  >
                    <input
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      type="text"
                      placeholder="Enter Your Comment Message"
                      className="border-2 w-full py-2 outline-none px-2 focus:outline-none rounded-lg border-black/50 "
                    />
                    <button
                      disabled={message === "" ? true : false}
                      className="bg-gradient-to-r from-[#6157ff] to-[#ee49fd] my-2 px-12 py-2 text-gray-100 rounded-md"
                      onClick={commentHandler}
                    >
                      Post
                    </button>
                  </div>
                  <div className="pb-4">
                    <div
                      onClick={() => setCommentToggle(!commentToggle)}
                      className={
                        commentToggle
                          ? "bg-gradient-to-r from-[#b4dfff] to-[#d8b4ff] px-3 py-3 rounded-t-md "
                          : "bg-gradient-to-r from-[#b4dfff] to-[#d8b4ff] px-3 py-3  rounded-md"
                      }
                    >
                      {post && post.comment.length > 0 ? (
                        <div className="w-full flex items-center justify-between">
                          <h1>
                            Comments{" "}
                            <span className="font-semibold">
                              {post && post.comment.length}
                            </span>
                          </h1>
                          {commentToggle ? (
                            <AiOutlineArrowUp />
                          ) : (
                            <AiOutlineArrowDown />
                          )}
                        </div>
                      ) : (
                        <h1>No Comments</h1>
                      )}
                    </div>
                    <div
                      className={
                        commentToggle && post.comment.length > 0
                          ? "block bg-gradient-to-r from-[#b4dfff] to-[#d8b4ff] min-h-28 max-h-56 overflow-y-auto p-3 transition-all duration-300 rounded-b-md"
                          : "hidden transition-all duration-300"
                      }
                    >
                      {post &&
                        post.comment.length > 0 &&
                        post.comment.map((item, index) => (
                          <div
                            key={index}
                            className="flex bg-[#ffffff] rounded-md text-gray-800 my-0.5 flex-col gap-2 "
                          >
                            <div className=" flex items-center justify-between">
                              <div className="flex ml-2 mt-2 items-center gap-2">
                                <img
                                  src={
                                    item.user && item.user.userPicPath
                                      ? `http://localhost:5000/${item.user.userPicPath}`
                                      : profile
                                  }
                                  alt="Comment User"
                                  className="w-10 h-10 rounded-full"
                                />
                                <h1 className="text-sm">
                                  {item.user.userName}
                                </h1>
                              </div>
                              {item.userId.toString() ===
                                user._id.toString() && (
                                <div className="pr-4 relative cursor-pointer">
                                  <AiFillDelete
                                    onClick={() =>
                                      handleCommentOption(item._id)
                                    }
                                    size={24}
                                    className="text-red-500 inline-block cursor-pointer"
                                  />
                                  {commentDeleteOptions &&
                                    selectedCommentId === item._id && (
                                      <div className="absolute w-24  flex  px-4 right-0 top-8 justify-center gap-2 rounded-md bg-gradient-to-r from-[#b4dfff] to-[#d8b4ff]">
                                        <button
                                          onClick={(e) =>
                                            deleteCommentHandler(e, item._id)
                                          }
                                          className="text-lg font-semibold  text-red-500"
                                        >
                                          <AiOutlineCheck size={27} />
                                        </button>
                                        <button
                                          onClick={() =>
                                            setCommentDeleteOptions(
                                              !commentDeleteOptions
                                            )
                                          }
                                          className="text-lg font-semibold  text-green-500"
                                        >
                                          <MdOutlineCancel size={25} />
                                        </button>
                                      </div>
                                    )}
                                </div>
                              )}
                            </div>
                            <div className="text-start pl-5 py-2">
                              <Typography>{item.message}</Typography>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div>
              <h1 className="text-xl font-semibold text-gray-200 text-center ">
                No Posts
              </h1>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminProfile;
