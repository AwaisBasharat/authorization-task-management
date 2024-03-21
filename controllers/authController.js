const bcrypt = require("bcrypt");
const Admin = require("../models/adminModel");
require("dotenv").config();
var jwt = require("jsonwebtoken");
const User = require("../models/userModel");

//////////Admin Login///////////////
const AdminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!(email && password)) {
      return res.status(500).json({ message: "All fields Are Required" });
    }
    if (email !== "ali@gmail.com") {
      return res.status(400).json({ message: "Wrong Creds!" });
    }
    const adminExists = await Admin.findOne({ email: "ali@gmail.com" });
    console.log(adminExists, "admin");
    if (!adminExists) {
      const encryptedPass = await bcrypt.hash(
        process.env.ADMINPASS,
        Number(process.env.SALT)
      );

      const adminInfo = {
        email: "ali@gmail.com",
        password: encryptedPass,
      };
      const adminCreated = await Admin.create(adminInfo);
      console.log(adminCreated);
      if (!adminCreated) {
        return res.status(400).json({ message: "something went wrong!" });
      }
      const token = adminCreated.getJwtToken();
      res.cookie("token", token, {
        maxAge: 24 * 60 * 60 * 2000,
        domain: "localhost",
      });
      res
        .status(200)
        .json({ message: "Admin Logged In Successfully", adminCreated });
    } else {
      const correctPass = bcrypt.compareSync(password, adminExists.password);
      console.log(password, adminExists.password, correctPass);
      if (!correctPass) {
        return res.status(500).json({ message: "In Correct Password" });
      }
      adminExists.password = undefined;
      res.cookie("token", adminExists.getJwtToken(), {
        maxAge: 24 * 60 * 60 * 2000,
        domain: "localhost",
      });
      res
        .status(200)
        .json({ message: "Admin Logged In Successfully", adminExists });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

//////////////register user////////////////////////
const registerUser = async (req, res) => {
  try {
    const { email, name, password } = req.body;
    if (!(email && name && password)) {
      return res.status(500).json({ message: "All fields Are Required" });
    }
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res
        .status(500)
        .json({ message: "User Already Exists! Please Login" });
    }

    const encryptedPass = await bcrypt.hash(password, Number(process.env.SALT));

    const userCreated = await User.create({
      email,
      password: encryptedPass,
      name,
    });

    res.cookie("token", userCreated.getJwtToken(), {
      maxAge: 24 * 60 * 60 * 2000,
      domain: "localhost",
    });

    res.status(200).json({
      message: "User Created Successfully!",
      user: userCreated,
      token: userCreated.getJwtToken(),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

////////////Login User////////////////////////
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  if (!(email && password)) {
    return res.status(500).json({ message: "All fields Are Required" });
  }
  const userExists = await User.findOne({ email });
  console.log(userExists);
  if (!userExists) {
    return res
      .status(400)
      .json({ message: "User does not Exists! Please Register" });
  }
  const correctPass = userExists.comparePassword(password);

  if (!correctPass) {
    return res.status(500).json({ message: "Invalid Password" });
  }
  const token = userExists.getJwtToken();
  res.cookie("token", token, {
    maxAge: 24 * 60 * 60 * 1000,
  });

  res.status(200).json({
    message: "User Logged In Successfully!",
    user: userExists,
    token: token,
  });
};

const Me = (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    res.status(400).json({ message: "User Not Found!" });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    if (!users) {
      return res.status(400).json({ message: "No Users found!" });
    }
    res.status(200).json({ message: "Users found successfully!", users });
  } catch (error) {
    res.status(400).json({ message: "User Not Found!" });
  }
};

module.exports = {
  loginUser,
  registerUser,
  AdminLogin,
  Me,
  getAllUsers,
};
