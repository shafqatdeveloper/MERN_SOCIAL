import jwt from "jsonwebtoken";
import User from "../Models/userSchema.js";

export const isAuthenticatedUser = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    res.status(401).json({
      success: false,
      message: "Please Login First",
    });
  } else {
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decodedData.id);
    const decoded = jwt.decode(token, { complete: true });
    next();
  }
};
