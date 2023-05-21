import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import profile from "../assets/userAvatar.png";
import ReactModal from "react-modal";
import {
  SingleUser,
  follow,
  unfollow,
} from "../assets/Redux/Actions/UserAction.jsx";
import {
  MdExpandMore,
  MdOutlineCancel,
  MdOutlineMessage,
  MdOutlineThumbUp,
  MdThumbUp,
} from "react-icons/md";
import Carousel from "react-material-ui-carousel";
import {
  createComment,
  deleteComment,
  likePost,
  singleUserPosts,
  unLikePost,
} from "../assets/Redux/Actions/postAction.jsx";
import {
  AiFillDelete,
  AiOutlineArrowDown,
  AiOutlineArrowUp,
  AiOutlineCheck,
  AiOutlineUserAdd,
  AiOutlineUserDelete,
} from "react-icons/ai";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  styled,
} from "@mui/material";
import { debounce } from "lodash";

const UserDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [followTrigger, setFollowTrigger] = useState(false);
  const [likeTrigger, setLikeTrigger] = useState(false);
  const [message, setMessage] = useState("");
  const [commentInput, setCommentInput] = useState(false);
  const [likeMenu, setLikeMenu] = useState(false);
  const { singleUser, user, followLoading, unfollowLoading } = useSelector(
    (state) => state.user
  );
  const { singleUserPost, likeLoading, unlikeLoading } = useSelector(
    (state) => state.post
  );
  const [modalIsOpen, setIsOpen] = useState(false);
  const [commentDeleteOptions, setCommentDeleteOptions] = useState(false);
  const [selectedCommentId, setSelectedCommentId] = useState(null);
  const [commentToggle, setCommentToggle] = useState(false);
  const posts = singleUserPost;
  let isFollowing;
  if (singleUser && Array.isArray(singleUser.followers)) {
    isFollowing = singleUser.followers.some(
      (follower) => follower.toString() === user._id.toString()
    );
  }
  useEffect(() => {
    dispatch(SingleUser(id));
    dispatch(singleUserPosts(id));
  }, [followTrigger, dispatch, id, likeTrigger]);
  const followHandler = debounce(async (e) => {
    e.preventDefault();
    if (isFollowing) {
      await dispatch(unfollow(id));
    } else {
      await dispatch(follow(id));
    }
    setFollowTrigger(!followTrigger);
  }, 300);
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
  function openModal() {
    setIsOpen(true);
  }

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
      transform: "translate(-50%, -50%)",
      borderRadius: "100%",
      zIndex: 9999,
    },
  };
  function closeModal() {
    setIsOpen(false);
  }
  return (
    <div className="mt-36 instagram-new lg:mt-20">
      <div className="flex flex-col items-center justify-center">
        <div className="w-full grid h-full grid-cols-1 gap-4 sm:gap-5 md:gap-7 text-gray-200 sm:grid-cols-2 md:grid-cols-4 bg-[#fff]  sm:w-3/4 md:w-[63%] rounded-md p-3 py-8 my-5">
          <img
            onClick={openModal}
            src={
              singleUser && singleUser.profilePic?.picPath
                ? `http://localhost:5000/${singleUser.profilePic?.picPath}`
                : ""
            }
            alt=""
            className="w-24 h-24 col-span-1 object-center rounded-full sm:w-32 sm:h-32"
          />
          <div className="h-full flex flex-col col-span-2 justify-center">
            <div className="flex items-center gap-2">
              <h1 className="text-lg text-gray-600 font-bold">Name : </h1>
              <h1 className="font-medium text-gray-800 capitalize">
                {singleUser && singleUser.name}
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg text-gray-600 font-bold">Email : </h1>
              <h1 className="font-medium text-gray-800 ">
                {singleUser && singleUser.email}
              </h1>
            </div>
          </div>
          <div className="h-full flex flex-col justify-center">
            <div className="flex items-center gap-2">
              <h1 className="text-lg text-gray-600 font-bold">Phone : </h1>
              <h1 className="font-medium text-gray-800 capitalize">
                0{singleUser && singleUser.phone}
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg text-gray-600 font-bold">Gender : </h1>
              <h1 className="font-medium text-gray-800 capitalize">
                {singleUser && singleUser.gender}
              </h1>
            </div>
          </div>
        </div>
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
                singleUser && singleUser.profilePic?.picPath
                  ? `http://localhost:5000/${singleUser.profilePic?.picPath}`
                  : ""
              }
              alt="User"
              className="sm:w-96 sm:h-96 w-72 h-72 "
            />
          </div>
        </ReactModal>
        <div className="bg-[#fff] w-full sm:w-3/4 md:w-[63%] py-4 px-2 rounded-md">
          <div className="grid grid-cols-2 sm:grid-cols-4 my-5 gap-3">
            <div className="flex bg-gradient-to-r from-[#6157ff] to-[#ee49fd] items-center px-1 py-5 rounded-md flex-col ">
              <h1 className="text-center text-[#fff] font-semibold text-lg">
                Followers
              </h1>
              <h1 className="text-center font-medium px-3 bg-white rounded-full py-1">
                {singleUser.followers && singleUser.followers.length}
              </h1>
            </div>
            <div className="flex bg-gradient-to-r from-[#6157ff] to-[#ee49fd] px-1 items-center py-5 rounded-md flex-col ">
              <h1 className="text-center text-[#fff] font-semibold text-lg">
                Following
              </h1>
              <h1 className="text-center font-medium px-3 bg-white rounded-full py-1">
                {singleUser.followings && singleUser.followings.length}
              </h1>
            </div>
            <div className="flex bg-gradient-to-r from-[#6157ff] to-[#ee49fd] items-center px-1 py-5 rounded-md flex-col ">
              <h1 className="text-center text-[#fff] font-semibold text-lg">
                Posts
              </h1>
              <h1 className="text-center font-medium px-3 bg-white rounded-full py-1">
                {singleUser.posts && singleUser.posts.length}
              </h1>
            </div>
            <div className="flex bg-gradient-to-r from-[#6157ff] to-[#ee49fd] items-center  px-1 py-5 rounded-md flex-col ">
              <h1 className="text-center font-semibold text-lg text-[#fff]">
                Joined
              </h1>
              <h1 className="text-center font-medium px-3 bg-white rounded-full py-1">
                {String(singleUser.createdAt).substring(0, 10)}
              </h1>
            </div>
          </div>
        </div>
        {posts && posts.length > 0 ? (
          <div className="w-full flex flex-col gap-2 sm:3/4 md:w-[63%] mt-5">
            {posts.map((post, index) => {
              const isLiked = post.likes.some(
                (like) => like.userId.toString() === user._id.toString()
              );
              const likeHandler = debounce(async (e) => {
                e.preventDefault();
                if (isLiked) {
                  await dispatch(unLikePost(post._id));
                } else {
                  await dispatch(likePost(post._id));
                }
                setLikeTrigger(!likeTrigger);
              }, 300);

              const commentHandler = (e) => {
                e.preventDefault();
                dispatch(createComment({ postId: post._id, message }));
                setFollowTrigger(!followTrigger);
                setMessage("");
              };

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
              return (
                <div key={index} className="bg-white  rounded-md p-4">
                  <div className="flex items-center justify-between  py-2">
                    <div className="flex  items-center gap-3">
                      <img
                        src={
                          post && post.creator
                            ? `http://localhost:5000/${post.creatorPic.imagePath}`
                            : profile
                        }
                        alt="Creator"
                        className="w-12 h-12 object-cover  rounded-full"
                      />
                      <h1 className="font-medium capitalize text-gray-600 ">
                        {post.creator}
                      </h1>
                    </div>
                    <h1 className=" text-gray-600 px-1 py-0.5 rounded-md">
                      {String(post.createdAt).substring(0, 10)}
                    </h1>

                    <button
                      disabled={followLoading || unfollowLoading ? true : false}
                      onClick={followHandler}
                    >
                      {isFollowing ? (
                        <AiOutlineUserDelete
                          size={28}
                          className=" mr-1 text-blue-500 sm:mr-5"
                        />
                      ) : (
                        <AiOutlineUserAdd
                          size={28}
                          className=" mr-1 text-blue-500 sm:mr-5"
                        />
                      )}
                    </button>
                  </div>
                  <div className="my-4 flex flex-col gap-2">
                    <h1 className="text-lg font-semibold text-gray-600">
                      {post.title}
                    </h1>
                    <h1 className="font-medium text-gray-500">{post.desc}</h1>
                  </div>
                  <Carousel
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
                            style={{
                              maxWidth: "100%",
                              height: "auto",
                              maxHeight: "100%",
                            }}
                            controls
                            src={`http://localhost:5000/${image.imagePath}`}
                            className="w-full"
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
                  <div className="flex my-3 items-center justify-between">
                    <div className="flex flex-col gap-2">
                      <button
                        disabled={likeLoading || unlikeLoading ? true : false}
                        onClick={likeHandler}
                      >
                        {isLiked ? (
                          <MdThumbUp className="text-blue-500" size={23} />
                        ) : (
                          <MdOutlineThumbUp
                            className="text-blue-500"
                            size={23}
                          />
                        )}
                      </button>
                      <button
                        onClick={() => setLikeMenu(!likeMenu)}
                        className="text-lg font-semibold text-slate-500"
                      >
                        {post.likes && post.likes.length}{" "}
                        <span>
                          {post.likes && post.likes.length > 1
                            ? "Likes"
                            : "Like"}
                        </span>{" "}
                      </button>
                    </div>
                    <div
                      onClick={() => setCommentInput(!commentInput)}
                      className="flex cursor-pointer items-center gap-2"
                    >
                      <MdOutlineMessage size={27} className="text-blue-500" />
                      <h1 className="text-lg font-medium">Comment</h1>
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
                            <div className="text-start pl-4 py-1">
                              <Typography>{item.message}</Typography>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div>
            <h1>No Posts</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDetails;
