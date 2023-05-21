import express from "express";
import {
  Followers,
  Following,
  addFriends,
  allUsers,
  deleteProfile,
  followUser,
  forgotPassword,
  loggedInUserDetails,
  loginUser,
  logout,
  registerUser,
  resetPassword,
  singleUserDetails,
  unfollowUser,
  updatePassword,
  updateProfile,
} from "../Controllers/userController.js";
import { isAuthenticatedUser } from "../Utils/Authentication.js";
import upload from "../Config/Multer.js";
const Router = express.Router();

Router.post("/register", upload.single("profilePic"), registerUser);
Router.post("/login", loginUser);
Router.post("/password/forgot", forgotPassword);
Router.put("/password/reset/:token", resetPassword);
Router.get("/all", allUsers);

// Authenticated User
Router.get("/details/:id", isAuthenticatedUser, singleUserDetails);
Router.get("/addFriends", isAuthenticatedUser, addFriends);
Router.get("/following", isAuthenticatedUser, Following);
Router.get("/followers", isAuthenticatedUser, Followers);
Router.get("/logout", isAuthenticatedUser, logout);
Router.put("/password/update", isAuthenticatedUser, updatePassword);
Router.get("/me", isAuthenticatedUser, loggedInUserDetails);
Router.put("/follow/:id", isAuthenticatedUser, followUser);
Router.put("/unfollow/:id", isAuthenticatedUser, unfollowUser);
Router.put(
  "/update/profile",
  upload.single("profilePic"),
  isAuthenticatedUser,
  updateProfile
);

Router.delete("/deleteProfile", isAuthenticatedUser, deleteProfile);

export default Router;
