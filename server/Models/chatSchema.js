import mongoose from "mongoose";
import bcrypt from "bcrypt";

const chatSchema = new mongoose.Schema({
  senderId: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "user",
  },
  receiverId: {
    type: mongoose.Types.ObjectId,
    ref: "user",
  },
  message: {
    type: String,
    required: true,
    required: true,
  },
  read: {
    type: Boolean,
    default: false,
  },
  readTime: {
    type: Date,
  },
  timeStamps: {
    required: true,
    type: Date,
    default: Date.now,
  },
});

const Chat = mongoose.model("chat", chatSchema);

export default Chat;
