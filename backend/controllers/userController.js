const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateJWTtoken = require("../config/generateJWTtoken");

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, picture } = req.body;
  if (!name || !email || !password) {
    res.status(400).json({
      error: "Please enter all the fields",
    });
    throw new Error("Please enter all the fields");
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400).json({
      error: "User already exists",
    });
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
    picture,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      picture: user.picture,
      token: generateJWTtoken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Something went wrong while creating new account");
  }
});

const userLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      picture: user.picture,
      token: generateJWTtoken(user._id),
    });
  } else {
    res.status(401).json({
      error: "Invalid email and password",
    });
    throw new Error("Invalid email and password");
  }
});

const getUsers = async (req, res) => {
  try {
    const keyword = req.query.keyword
      ? {
          $or: [
            { name: { $regex: req.query.keyword, $options: "i" } },
            { email: { $regex: req.query.keyword, $options: "i" } },
          ],
        }
      : {};
    // console.log(keyword);
    const users = await User.find(keyword).find({
      _id: { $ne: req.user._id },
    });
    res.status(200).send(users);
  } catch (error) {
    res.status(400);
  }
};

module.exports = { registerUser, userLogin, getUsers };
