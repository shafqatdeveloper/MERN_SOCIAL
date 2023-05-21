import React, { useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import {
  MdExpandMore,
  MdOutlineCancel,
  MdOutlineMessage,
} from "react-icons/md";
import { MdOutlineThumbUpOffAlt, MdThumbUp } from "react-icons/md";
import { format } from "timeago.js";
import {
  AiFillDelete,
  AiOutlineArrowDown,
  AiOutlineArrowUp,
  AiOutlineCheck,
  AiOutlineUserAdd,
  AiOutlineUserDelete,
} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import profile from "../assets/userAvatar.png";
import {
  follow,
  loadUser,
  unfollow,
} from "../assets/Redux/Actions/UserAction.jsx";
import {
  createComment,
  deleteComment,
  getAllPosts,
  likePost,
  unLikePost,
} from "../assets/Redux/Actions/postAction.jsx";
import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  styled,
} from "@mui/material";
import { Dialog, DialogContent } from "@mui/material";
import Loader from "./Loader.jsx";
import { debounce } from "lodash";
import { Link } from "react-router-dom";

const Post = ({ post }) => {
  const dispatch = useDispatch();
  const { user, loading, followLoading, unfollowLoading } = useSelector(
    (state) => state.user
  );
  const { likeLoading, unlikeLoading } = useSelector((state) => state.post);

  const [isFollowing, setIsFollowing] = useState(
    user.followings && user.followings.includes(post.author)
  );
  const [message, setMessage] = useState("");
  const [isLiked, setIsliked] = useState(
    post.likes &&
      post.likes.some((like) => like.userId.toString() === user._id.toString())
  );
  const [likeTrigger, setLikeTrigger] = useState(false);
  const isAuthor = user._id.toString() === post.author.toString();
  const following = user.followings && user.followings.includes(post.author);
  const [followTrigger, setFollowTrigger] = useState(false);
  const [commentToggle, setCommentToggle] = useState(false);
  const [selectedCommentId, setSelectedCommentId] = useState(null);
  const [commentDeleteOptions, setCommentDeleteOptions] = useState(false);

  const handleCommentOption = (id) => {
    setCommentDeleteOptions(!commentDeleteOptions);
    setSelectedCommentId(id);
  };
  const [likeMenu, setLikeMenu] = useState(false);

  const followHandler = debounce(async (e) => {
    e.preventDefault();
    if (isFollowing) {
      await dispatch(unfollow(post.author));
    } else {
      await dispatch(follow(post.author));
    }
    setFollowTrigger(!followTrigger);
  }, 600);
  const likeHandler = debounce(async (e) => {
    e.preventDefault();
    if (isLiked) {
      await dispatch(unLikePost(post._id));
    } else {
      await dispatch(likePost(post._id));
    }
    setLikeTrigger(!likeTrigger);
  }, 600);
  useEffect(() => {
    if (user.followings && user.followings.includes(post.author)) {
      setIsFollowing(true);
    } else {
      setIsFollowing(false);
    }
  }, [post.author, user.followings, user]);
  useEffect(() => {
    dispatch(loadUser());
  }, [following, followTrigger]);

  useEffect(() => {
    dispatch(getAllPosts());
  }, [isLiked, likeTrigger, followTrigger]);
  useEffect(() => {
    if (
      post &&
      post.likes.some((like) => like.userId.toString() === user._id.toString())
    ) {
      setIsliked(true);
    } else {
      setIsliked(false);
    }
  }, [post.likes]);
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

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleTextChange = (event) => {
    setMessage(event.target.value);
  };

  const commentHandler = (e) => {
    e.preventDefault();
    dispatch(createComment({ message, postId: post._id }));
    setOpen(false);
    setMessage("");
  };

  const deleteCommentHandler = async (e, commentId) => {
    await dispatch(deleteComment({ id: post._id, commentId }));
    setLikeTrigger(!likeTrigger);
    setCommentToggle(!commentToggle);
  };

  return (
    <div className="w-full instagram-new bg-white p-2 rounded-md mt-4 h-full">
      {loading ? (
        <Loader />
      ) : (
        <div className="px-2 sm:px-6 flex flex-col">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link
                to={
                  post.author.toString() === user._id.toString()
                    ? `/account`
                    : `/details/${post.author}`
                }
              >
                <img
                  src={
                    post &&
                    post.creatorPic &&
                    `http://localhost:5000/${post.creatorPic.imagePath}`
                  }
                  alt="User"
                  className="w-12 h-12 rounded-full"
                />
              </Link>
              <Link
                to={
                  post.author.toString() === user._id.toString()
                    ? `/account`
                    : `/details/${post.author}`
                }
              >
                <h1>{post && post.creator ? post.creator : ""}</h1>
              </Link>
            </div>
            <h1 className=" text-gray-600 px-1 py-0.5 rounded-md">
              {String(post.createdAt).substring(0, 10)}
            </h1>
            <button disabled={followLoading || unfollowLoading ? true : false}>
              {!isAuthor &&
                (isFollowing ? (
                  <AiOutlineUserDelete
                    onClick={followHandler}
                    size={25}
                    className="text-blue-500 active:scale-125"
                  />
                ) : (
                  <AiOutlineUserAdd
                    onClick={followHandler}
                    size={25}
                    className="text-blue-500 active:scale-125"
                  />
                ))}
            </button>
          </div>
          <div className="py-5">
            <div>
              <h1 className="text-lg font-semibold">
                {post && post.title ? post.title : ""}
              </h1>
              <h1 className="text-gray-700 font-medium py-3">
                {post && post.desc ? post.desc : ""}
              </h1>
            </div>
            {post.images && (
              <Carousel
                autoPlay={false}
                animation="slide"
                className="h-auto"
                interval={2000}
              >
                {post.images &&
                  post.images[0] &&
                  post.images.map((image, index) =>
                    image.imagePath.endsWith(`.mp4`) ? (
                      <video
                        key={index}
                        controls
                        className="w-full "
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
            )}
          </div>
          <div className="flex pb-4 items-center justify-between">
            <div className="flex flex-col gap-2 items-center">
              <button
                disabled={likeLoading || unlikeLoading ? true : false}
                onClick={likeHandler}
                className="flex items-center gap-2"
              >
                {isLiked ? (
                  <MdThumbUp className="text-blue-600" size={27} />
                ) : (
                  <MdOutlineThumbUpOffAlt className="text-blue-600" size={27} />
                )}
              </button>
              <button onClick={() => setLikeMenu(!likeMenu)}>
                {post && post.likes.length}
                <span className="pl-1">
                  {post.likes.length > 1 ? "Likes" : "Like"}
                </span>
              </button>
            </div>
            <button
              onClick={handleClickOpen}
              className="flex items-center gap-2"
            >
              <MdOutlineMessage className="text-blue-600" size={27} /> Comment
            </button>
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
                            item.userId.toString() === user._id.toString()
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
                            <h1 className="text-sm">{item.user.userName}</h1>
                          </div>
                        </Link>
                      </div>
                    </div>
                  </AccordionDetails>
                ))}
            </StyledAccordion>
          </div>
          <div className="pb-4">
            <div
              onClick={() => setCommentToggle(!commentToggle)}
              className={
                commentToggle
                  ? "bg-gradient-to-r from-[#b4dfff] to-[#d8b4ff] px-3 py-3 rounded-t-md"
                  : "bg-gradient-to-r from-[#b4dfff] to-[#d8b4ff] px-3 py-3 rounded-md "
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
                        <h1 className="text-sm">{item.user.userName}</h1>
                      </div>
                      {item.userId.toString() === user._id.toString() && (
                        <div className="pr-4 relative cursor-pointer">
                          <AiFillDelete
                            onClick={() => handleCommentOption(item._id)}
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
          <Dialog open={open} onClose={handleClose}>
            <DialogContent>
              <h1 className="text-center pb-5 font-bold text-lg">Comment</h1>
              <textarea
                required={true}
                minRows={2}
                maxRows={2}
                placeholder="Enter Comment"
                value={message}
                onChange={handleTextChange}
                style={{
                  width: "100%",
                  paddingLeft: "4px",
                  border: "1px solid 	#d4d4d4",
                  borderRadius: "6px",
                }}
              />
              <button
                disabled={message === "" ? true : false}
                className="bg-gradient-to-l rounded-md mt-2 from-[#6157ff] to-[#ee49fd] w-full text-white px-5 text-center py-1"
                onClick={commentHandler}
              >
                Post
              </button>
            </DialogContent>
          </Dialog>
        </div>
      )}
    </div>
  );
};

export default Post;
