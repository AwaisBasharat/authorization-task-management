const express = require("express");
const {
  AdminLogin,
  loginUser,
  registerUser,
  Me,
  getAllUsers,
} = require("../controllers/authController");
const authenticate = require("../middleware/authenticate");
const router = express.Router();

router.post("/adminLogin", AdminLogin);
router.post("/login", loginUser);
router.post("/register", registerUser);
router.get("/me", authenticate, Me);
router.get("/getAllUsers", authenticate, getAllUsers);

module.exports = router;
