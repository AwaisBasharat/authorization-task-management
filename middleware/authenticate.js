const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/userModel");
const Admin = require("../models/adminModel");

const authenticate = async (req, res, next) => {
  try {
    const token =
      req.headers["x-access-token"] ||
      req?.headers?.authorization?.split(" ")[1];
    console.log(token);
    if (!token || token === "null") {
      return res
        .status(401)
        .json({ message: "Login first to access the resource." });
    }

    const decoded = jwt?.verify(token, process.env.SECRET);
    const user = await User.findOne({ _id: decoded._id });
    const admin = await Admin.findOne({ _id: decoded._id });
    console.log(admin);
    if (!user && !admin) {
      return res
        .status(401)
        .json({ message: "Token expired, please generate new one" });
    }
    req.access_token = token;
    if (user) {
      req.user = await User.findById(decoded._id);
    } else if (admin) {
      req.user = await Admin.findById(decoded._id);
    }
  } catch (error) {
    return res.status(401).json({
      message: "There is a problem with your token, please login again",
      error,
    });
  }

  next();
};

module.exports = authenticate;
