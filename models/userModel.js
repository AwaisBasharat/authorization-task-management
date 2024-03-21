const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const userSchema = new mongoose.Schema({
  email: {
    type: "string",
    required: [true, "email field is Required"],
  },
  name: {
    type: "string",
    required: [true, "name field is Required"],
  },
  password: {
    type: "string",
    required: [true, "Password field is Required"],
  },
  role: { type: "string", default: "user", enum: ["user"] },
  // tasks: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "task",
  //   },
  // ],
});

userSchema.methods.getJwtToken = function () {
  return jwt.sign({ _id: this._id }, process.env.SECRET);
};

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

const User = mongoose.model("user", userSchema);

module.exports = User;
