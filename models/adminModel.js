const mongoose = require("mongoose");
var jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const adminSchema = new mongoose.Schema({
  email: {
    type: "string",
    required: [true, "email field is Required"],
  },
  password: {
    type: "string",
    required: [true, "Password field is Required"],
  },
  role: { type: "string", default: "admin" },
});

adminSchema.methods.getJwtToken = function () {
  return jwt.sign({ _id: this._id }, process.env.SECRET);
};

const Admin = mongoose.model("admin", adminSchema);

module.exports = Admin;
