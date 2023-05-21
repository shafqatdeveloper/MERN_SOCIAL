import Chat from "../Models/chatSchema.js";
import User from "../Models/userSchema.js";

// Chatable Users

export const chatableUsers = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const followIndIds = user.followings;
    const followerIds = user.followers;
    const userSet = new Set(followerIds.concat(followIndIds));
    const allUsersIds = Array.from(userSet);
    const allUsers = await User.find({ _id: { $in: allUsersIds } });
    res.status(200).json({
      success: true,
      allUsers,
    });
  } catch (error) {
    res.status(501).json({
      success: false,
      message: error.message,
    });
  }
};

// Create a new Chat

export const createChat = async (req, res) => {
  try {
    const receiverId = req.params.id;
    const senderId = req.user.id;
    const message = req.body.message;
    const newChat = await Chat.create({
      senderId,
      receiverId,
      message,
    });
    res.status(201).json({
      success: true,
      newChat,
    });
  } catch (error) {
    res.status(501).json({
      success: false,
      message: error.message,
    });
  }
};

// Getting Chat With a Single User

export const getChat = async (req, res) => {
  try {
    const receiverId = req.params.id;
    const senderId = req.user.id;
    const allChats = await Chat.find();
    const chat = allChats.filter(
      (messageObj) =>
        (messageObj.senderId.toString() === senderId.toString() &&
          messageObj.receiverId.toString() === receiverId.toString()) ||
        (messageObj.senderId.toString() === receiverId.toString() &&
          messageObj.receiverId.toString() === senderId.toString())
    );
    res.status(200).json({
      success: true,
      chat,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Read Chat

export const readChat = async (req, res) => {
  try {
    const chat = await Chat.updateMany(
      { $and: [{ receiverId: req.user.id, senderId: req.params.id }] },
      { read: true, readTime: Date.now() },
      { new: true }
    );
    res.status(200).json({
      success: true,
      chat,
    });
  } catch (error) {
    res.status(404).send({
      success: false,
      message: error.message,
    });
  }
};

// Check for Unread Message

export const checkUnreadMessage = async (req, res) => {
  try {
    const chat = await Chat.find();
    const userChat = chat.filter(
      (item) => item.receiverId.toString() === req.user.id.toString()
    );
    const unread = userChat.filter((item) => item.read === false);
    res.status(200).json({
      success: true,
      unread,
    });
  } catch (error) {
    res.status(404).send({
      success: false,
      message: error.message,
    });
  }
};
