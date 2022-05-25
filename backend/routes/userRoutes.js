const express = require("express");
const {
  registerUser,
  userLogin,
  getUsers,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/register").post(registerUser);
router.post("/login", userLogin);
router.get("/search", protect, getUsers);

module.exports = router;
