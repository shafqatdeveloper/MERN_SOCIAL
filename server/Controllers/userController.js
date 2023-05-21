import User from "../Models/userSchema.js";
import crypto from "crypto";
import sendEmail from "../Utils/sendEmail.js";
import fs from "fs";
import path from "path";
import Post from "../Models/postSchema.js";

// Register User
export const registerUser = async (req, res) => {
  const { name, email, password, gender, phone } = req.body;
  try {
    const userExist = await User.findOne({ email });
    if (userExist) {
      res.status(401).json({
        success: false,
        message: "User Already Exists",
      });
    } else {
      const user = await User.create({
        name,
        email,
        password,
        phone,
        gender,
        profilePic: {
          picName: req.file ? req.file.originalname : "",
          picPath: req.file ? req.file.path : "",
        },
      });
      const token = user.JWTTOKEN();
      res
        .status(200)
        .cookie("token", token, {
          expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
          httpOnly: true,
        })
        .json({
          success: true,
          message: "User Registered",
          user,
        });
    }
  } catch (error) {
    res.status(501).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Profile

export const updateProfile = async (req, res) => {
  try {
    const userPosts = await Post.find({ author: req.user.id });
    const { name, email, gender, phone } = req.body;
    const updateObj = { name, email, gender, phone };
    const __dirname = path.resolve();
    const picPath = path.join(__dirname, req.user.profilePic.picPath);
    if (req.file) {
      updateObj.profilePic = {
        picName: req.file && req.file.originalname,
        picPath: req.file && req.file.path,
      };
      fs.unlink(picPath, (err) => {
        if (err) {
          console.log("Error Occured ");
        } else {
          console.log("File deleted Successfully");
        }
      });
      if (userPosts && userPosts.length > 0) {
        userPosts.map(
          async (post) =>
            await Post.findByIdAndUpdate(post._id, {
              creatorPic: {
                imagePath: updateObj.profilePic.picPath,
                imageName: updateObj.profilePic.picName,
              },
            })
        );
      }
    }
    const updatedUser = await User.findByIdAndUpdate(req.user.id, updateObj, {
      runValidators: false,
    });
    if (userPosts && userPosts.length > 0) {
      userPosts.map(
        async (post) =>
          await Post.findByIdAndUpdate(post._id, {
            creator: name,
          })
      );
    }
    res.status(200).json({
      success: true,
      updatedUser,
      message: "Profile Updated",
    });
  } catch (error) {
    res.status(501).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Profile

export const deleteProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const userPosts = await Post.find({ author: req.user.id });
    const profilePicPath = user.profilePic.picPath;
    const __dirname = path.resolve();
    if (userPosts && userPosts.length > 0) {
      userPosts.map(async (post) => {
        const postPicPath = post.images;
        if (postPicPath && postPicPath.length > 0) {
          postPicPath.forEach((pic) => {
            fs.unlink(path.join(__dirname, pic.imagePath), (err) => {
              if (err) {
                console.log(err);
              } else {
                console.log("File deleted Successfully");
              }
            });
          });
        }
        await Post.findByIdAndDelete(post._id);
      });
    }
    await User.updateMany(
      { followings: req.user.id },
      { $pull: { followings: req.user.id } }
    );
    await User.updateMany(
      { followers: req.user.id },
      { $pull: { followers: req.user.id } }
    );
    const deleted = await User.findByIdAndDelete(req.user.id);
    if (
      profilePicPath !== "" ||
      profilePicPath !== undefined ||
      profilePicPath !== null
    ) {
      fs.unlink(path.join(__dirname, profilePicPath), (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log("File deleted Successfully");
        }
      });
    }
    res.status(200).json({
      success: true,
      deleted,
      message: "Profile Deleted",
    });
  } catch (error) {
    res.status(501).json({
      success: false,
      message: error.message,
    });
  }
};

// Login User

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      res.status(401).json({
        success: false,
        message: "Both Email and Password are compulsory",
      });
    } else {
      const user = await User.findOne({ email });
      if (!user) {
        res.status(403).json({
          success: false,
          message: "Invalid Email or Password",
        });
      } else {
        const isPasswordMatched = await user.comparePassword(password);
        console.log(isPasswordMatched);
        if (!isPasswordMatched) {
          res.status(404).json({
            success: false,
            message: "Invalid Email or Password",
          });
        } else {
          const token = user.JWTTOKEN();
          res
            .status(200)
            .cookie("token", token, {
              expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
              httpOnly: true,
            })
            .json({
              success: true,
              message: "Logged In Successfully",
              user,
            });
        }
      }
    }
  } catch (error) {
    res.status(503).json({
      success: false,
      message: error.message,
    });
  }
};

// Logout User

export const logout = async (req, res) => {
  try {
    res
      .status(200)
      .cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
      })
      .json({
        success: true,
        message: "Logged Out",
      });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

// Change Password

export const updatePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword, confirmPassword } = req.body;
    const user = await User.findById(req.user.id);
    const isPasswordMatched = await user.comparePassword(oldPassword);
    if (!newPassword || !confirmPassword) {
      res.status(401).json({
        success: false,
        message: "Please Enter New Password and Confirm Password",
      });
    } else {
      if (!isPasswordMatched) {
        res.status(402).json({
          success: false,
          message: "Old Password Not Matched",
        });
      } else {
        if (newPassword !== confirmPassword) {
          res.status(403).json({
            success: false,
            message: "New Password and Confirm Password Not Matched",
          });
        } else {
          user.password = newPassword;
          await user.save();
          res.status(200).json({
            success: true,
            message: "Password updated",
          });
        }
      }
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Forgot Password

export const forgotPassword = async (req, res) => {
  const { forgotEmail } = req.body;
  const user = await User.findOne({ email: forgotEmail });
  try {
    if (!forgotEmail) {
      res.status(400).json({
        success: false,
        message: "Please Enter Email",
      });
    } else {
      if (!user) {
        res.status(403).json({
          success: false,
          message: "User Not Exists",
        });
      } else {
        const resetToken = user.generateResetPasswordToken();
        await user.save({ complete: true });
        const resetUrl = `${req.protocol}://${req.get(
          "host"
        )}/user/password/reset/${resetToken}`;
        const message = `Your Reset Password Url is \n\n\n ${resetUrl}. \n\n\n If You have not requested please Ignore it`;
        await sendEmail({
          email: user.email,
          subject: "Dev Media",
          message,
        });
        res.status(200).json({
          success: true,
          message: `Email sent to ${user.email}`,
        });
      }
    }
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    res.status(502).json({
      success: false,
      message: error.message,
    });
  }
};

// Reset Password

export const resetPassword = async (req, res) => {
  const token = req.params.token;
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");
  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpires: { $gte: Date.now() },
  });
  if (!user) {
    res.status(404).json({
      success: false,
      message: "Token is either Expired or Invalid",
    });
  } else {
    const { password, confirmPassword } = req.body;
    if (!password || !confirmPassword) {
      res.status(405).json({
        success: false,
        message: "Please Enter Password And Confirm Password",
      });
    } else {
      if (password !== confirmPassword) {
        res.status(403).json({
          success: false,
          message: "Password and Confirm Password are not Matched",
        });
      } else {
        user.password = password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save({ validateBeforeSave: false });
        res.status(200).json({
          success: true,
          message: "Password Reset Successfully",
        });
      }
    }
  }
  try {
  } catch (error) {
    res.status(501).json({
      success: false,
      message: error.message,
    });
  }
};

// Logged In User's Info

export const loggedInUserDetails = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      res.status(402).json({
        success: false,
        message: "User not found",
      });
    } else {
      res.status(200).json({
        success: true,
        user,
      });
    }
  } catch (error) {
    res.status(501).json({
      success: false,
      message: error.message,
    });
  }
};
// Single User's Info

export const singleUserDetails = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(402).json({
        success: false,
        message: "User not found",
      });
    } else {
      res.status(200).json({
        success: true,
        user,
      });
    }
  } catch (error) {
    res.status(501).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Registered Users

export const allUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    res.status(501).json({
      success: false,
      message: error.message,
    });
  }
};

// Add Freinds

export const addFriends = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const allUsers = await User.find({ email: { $ne: user.email } });
    const notFriends = allUsers.filter(
      (item) => !user.followings.includes(item._id)
    );
    res.status(200).json({
      success: true,
      notFriends,
    });
  } catch (error) {
    res.status(501).json({
      success: false,
      message: error.message,
    });
  }
};

// Follow A User

export const followUser = async (req, res) => {
  try {
    const followingUser = await User.findById(req.user.id);
    const userToFollow = await User.findById(req.params.id);
    if (
      userToFollow.followers.includes(followingUser._id) &&
      followingUser.followings.includes(userToFollow._id)
    ) {
      return;
    } else {
      userToFollow.followers.push(followingUser._id);
      followingUser.followings.push(req.params.id);
      await followingUser.save();
      await userToFollow.save();
      res.status(200).json({
        success: true,
        message: "User Followed successfully",
      });
    }
  } catch (error) {
    res.status(501).json({
      success: false,
      message: error.message,
    });
  }
};

// Unfollow A User

export const unfollowUser = async (req, res) => {
  try {
    const userToFollow = await User.findById(req.params.id);
    const followingUser = await User.findById(req.user.id);
    if (
      !userToFollow.followers.includes(followingUser._id) &&
      !followingUser.followings.includes(userToFollow._id)
    ) {
      return;
    } else {
      followingUser.followings.some((following, index) => {
        if (following.toString() === userToFollow._id.toString()) {
          followingUser.followings.splice(index, 1);
        }
      });
      userToFollow.followers.some((follower, index) => {
        if (follower.toString() === followingUser._id.toString()) {
          userToFollow.followers.splice(index, 1);
        }
      });
      await userToFollow.save();
      await followingUser.save();
      res.status(200).json({
        success: true,
        message: "User unfollowed",
      });
    }
  } catch (error) {
    res.status(501).json({
      success: false,
      message: error.message,
    });
  }
};

// Followings Of A User

export const Following = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const followingIds = user.followings;
    const followingUsers = await User.find({ _id: { $in: followingIds } });
    res.status(200).json({
      success: true,
      followingUsers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Followers of LoggedIn User

export const Followers = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const followerIds = user.followers;
    const followers = await User.find({ _id: { $in: followerIds } });
    res.status(200).json({
      success: true,
      followers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
