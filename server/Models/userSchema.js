import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
    default: "Male",
  },
  profilePic: {
    picName: { type: String },
    picPath: { type: String },
  },
  posts: [
    {
      type: mongoose.Types.ObjectId,
      ref: "post",
    },
  ],
  followers: [
    {
      type: mongoose.Types.ObjectId,
    },
  ],
  followings: [
    {
      type: mongoose.Types.ObjectId,
    },
  ],

  createdAt: {
    type: Date,
    default: Date.now,
  },
  resetPasswordToken: String,
  resetPasswordExpires: String,
});

// Hashing Password

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  } else {
    this.password = await bcrypt.hash(this.password, 10);
  }
});

// Generating JSON Web Token
userSchema.methods.JWTTOKEN = function () {
  return jwt.sign(
    { id: this._id },
    "IOWEWERJWRISDFBWEIRUHEBRWEUR39RRENRII04RI34NFIU3"
  );
};

// Comparing Password

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Generating resetPassword Token

userSchema.methods.generateResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(10).toString("hex");
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.resetPasswordExpires = new Date(Date.now() + 24 * 60 * 60 * 1000);
  return resetToken;
};

const User = mongoose.model("user", userSchema);
export default User;
