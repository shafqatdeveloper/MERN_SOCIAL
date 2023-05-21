import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Types.ObjectId,
    ref: "user",
  },
  creator: {
    type: String,
    required: true,
  },
  creatorPic: {
    imageName: String,
    imagePath: String,
  },
  images: [
    {
      imageName: String,
      imagePath: String,
    },
  ],
  comment: [
    {
      user: {
        userPicName: String,
        userPicPath: String,
        userName: String,
      },
      message: {
        type: String,
      },
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    },
  ],
  likes: [
    {
      user: {
        userPicName: String,
        userPicPath: String,
        userName: String,
      },
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Post = mongoose.model("post", postSchema);
export default Post;
