import Post from "../Models/postSchema.js";
import User from "../Models/userSchema.js";
import path from "path";
import fs from "fs";

// Create a New Post

export const createPost = async (req, res) => {
  try {
    const { title, desc } = req.body;
    const { files } = req;
    const images = files.map((file) => ({
      imageName: file.originalName,
      imagePath: file.path,
    }));
    const post = await Post.create({
      title,
      desc,
      author: req.user._id,
      images,
      creator: req.user.name,
      creatorPic: {
        imageName: req.user.profilePic.picName,
        imagePath: req.user.profilePic.picPath,
      },
    });
    const user = await User.findById(req.user._id);
    user.posts.push(post);
    await user.save({ validateBeforeSave: false });
    res.status(200).json({
      success: true,
      post,
      message: "Post Created",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Posts

export const getAllPosts = async (req, res) => {
  try {
    let posts = await Post.find();
    posts.reverse();
    res.status(200).json({
      success: true,
      posts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Single Post

export const getSinglePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json({
      success: true,
      post,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update A Post

export const updatePost = async (req, res) => {
  try {
    const { title, desc } = req.body;
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      { title, desc },
      { runValidators: false }
    );
    res.status(200).json({
      success: true,
      message: "Post updated successfully",
      updatedPost,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete A Post

export const deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    const user = await User.findById(req.user._id);
    user.posts = user.posts.filter(
      (item) => item.toString() !== post._id.toString()
    );
    const postPicPaths = post.images;
    const __dirname = path.resolve();
    if (postPicPaths.length > 0) {
      postPicPaths.forEach((pic) => {
        fs.unlink(path.join(__dirname, pic.imagePath), (err) => {
          if (err) {
            console.log(err);
          } else {
            console.log("successfully deleted");
          }
        });
      });
    }

    await user.save({ validateBeforeSave: false });
    res.status(200).json({
      success: true,
      message: "Post Deleted",
      post,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get LoggedIn User's Posts

export const loggedInUserPosts = async (req, res) => {
  try {
    let posts = await Post.find({ author: req.user.id });
    posts.reverse();
    res.status(200).json({
      success: true,
      posts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Posts Of a Single User

export const getSingleUserPosts = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const posts = await Post.find({ author: user });
    res.status(200).json({
      success: true,
      posts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Like A Post

export const likePost = async (req, res) => {
  try {
    let post = await Post.findById(req.params.id);
    if (post.likes.includes(req.user._id)) {
      res.status(401).json({
        success: false,
        message: "Already Liked",
      });
    } else {
      post = await Post.findByIdAndUpdate(
        req.params.id,
        {
          $push: {
            likes: {
              user: {
                userPicName: req.user.profilePic.picName,
                userPicPath: req.user.profilePic.picPath,
                userName: req.user.name,
              },
              userId: req.user.id,
            },
          },
        },
        { runValidators: false }
      );
      await post.save();
      res.status(200).json({
        success: true,
        message: "Post Liked",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Unlike A Post

export const unlikePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (
      post.likes.every(
        (like) => like.userId.toString() !== req.user.id.toString()
      )
    ) {
      res.status(402).json({
        success: false,
        message: "Not Liked",
      });
    } else {
      if (post.likes.some((like) => like.userId.toString() === req.user.id)) {
        post.likes = post.likes.filter(
          (item) => item.userId.toString() !== req.user._id.toString()
        );
        await post.save({ validateBeforeSave: false });
        res.status(200).json({
          success: true,
          message: "Post Unliked",
          post,
        });
      }
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Comment On A Post

export const createComment = async (req, res) => {
  const { message, postId } = req.body;
  const user = req.user._id;
  try {
    const post = await Post.findByIdAndUpdate(
      postId,
      {
        $push: {
          comment: {
            message,
            user: {
              userPicName: req.user.profilePic.picName,
              userPicPath: req.user.profilePic.picPath,
              userName: req.user.name,
              userId: req.user.id,
            },
            userId: user,
          },
        },
      },
      {
        runValidators: false,
      }
    );
    res.status(200).json({
      success: true,
      post,
      message: "Comment Added",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete A Comment

export const deleteComment = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (
      post.comment.some(
        (item) => item.userId.toString() === req.user.id.toString()
      )
    ) {
      post.comment = post.comment.filter(
        (item) => item._id.toString() !== req.body.commentId.toString()
      );
      await post.save();
      res.status(200).json({
        success: true,
        message: "Comment Deleted",
      });
    } else {
      res.status(401).json({
        success: false,
        message: "Not Authenticated",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
