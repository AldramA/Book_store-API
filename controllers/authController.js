const {
  User,
  validateLoginUser,
  validateRegisterUser,
} = require("../models/user");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const registerUser = asyncHandler(async (req, res) => {
  const { error } = validateRegisterUser(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  let user = await User.findOne({
    email: req.body.email,
  });

  if (user) {
    return res.status(400).json({ message: "User already registered" });
  }

  const salt = await bcrypt.genSalt(10);
  req.body.password = await bcrypt.hash(req.body.password, salt);

  user = new User({
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });
  const result = await user.save();
  const token = jwt.sign(
    { _id: user._id, username: user.username, isAdmin: user.isAdmin },
    process.env.JWT_SECRET
  );
  const { password, ...userWithoutPassword } = result._doc;
  res.status(201).json({
    message: "User registered successfully",
    user: userWithoutPassword,
    token: token,
  });
});

const loginUser = asyncHandler(async (req, res) => {
  const { error } = validateLoginUser(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  let user = await User.findOne({
    $or: [{ email: req.body.email }, { username: req.body.username }],
  });
  if (!user) {
    return res.status(400).json({ message: "Invalid username or email" });
  }
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) {
    return res.status(400).json({ message: "invalid email or passwoed" });
  }
  const token = jwt.sign(
    { _id: user._id, username: user.username, isAdmin: user.isAdmin },
    process.env.JWT_SECRET
  );
  const { password, ...userWithoutPassword } = user._doc;
  res.status(200).json({
    message: "User logged in successfully",
    token: token,
    user: userWithoutPassword,
  });
})

module.exports = { registerUser, loginUser };