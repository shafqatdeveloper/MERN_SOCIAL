import express from "express";
import {
  createComment,
  createPost,
  deleteComment,
  deletePost,
  getAllPosts,
  getSinglePost,
  getSingleUserPosts,
  likePost,
  loggedInUserPosts,
  unlikePost,
  updatePost,
} from "../Controllers/postController.js";
import { isAuthenticatedUser } from "../Utils/Authentication.js";
import upload from "../Config/Multer.js";

const Router = express.Router();

Router.post(
  "/create",
  upload.array("files", 5),
  isAuthenticatedUser,
  createPost
);
Router.get("/all", isAuthenticatedUser, getAllPosts);
Router.get("/me", isAuthenticatedUser, loggedInUserPosts);
Router.get("/user/:id", isAuthenticatedUser, getSingleUserPosts);
Router.delete("/delete/:id", isAuthenticatedUser, deletePost);
Router.put("/like/:id", isAuthenticatedUser, likePost);
Router.put("/unlike/:id", isAuthenticatedUser, unlikePost);
Router.put("/comment", isAuthenticatedUser, createComment);
Router.get("/single/:id", isAuthenticatedUser, getSinglePost);
Router.put("/post/update/:id", isAuthenticatedUser, updatePost);
Router.put("/comment/:id", isAuthenticatedUser, deleteComment);

export default Router;
