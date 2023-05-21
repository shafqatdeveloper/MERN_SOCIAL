import express from "express";
import { isAuthenticatedUser } from "../Utils/Authentication.js";
import {
  chatableUsers,
  checkUnreadMessage,
  createChat,
  getChat,
  readChat,
} from "../Controllers/chatController.js";
const Router = express.Router();

Router.post("/create/:id", isAuthenticatedUser, createChat);
Router.get("/chatableUsers", isAuthenticatedUser, chatableUsers);
Router.get("/getChat/:id", isAuthenticatedUser, getChat);
Router.put("/read/:id", isAuthenticatedUser, readChat);
Router.get("/unread", isAuthenticatedUser, checkUnreadMessage);

export default Router;
