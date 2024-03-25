require("dotenv").config();
const asyncHandler = require("express-async-handler");
const { User, validateResetPassword } = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

const sendResetLink = asyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).json({ message: "email not valid" });
  }
  const secret = process.env.JWT_SECRET + user.password;
  const token = jwt.sign({ id: user._id, email: user.email }, secret, {
    expiresIn: "15m",
  });
  const link = `http://localhost:5555/api/v1/password/reset/${user._id}/${token}`;
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });
  const mailOptions = {
    from: process.env.EMAIL,
    to: user.email,
    subject: "Password Reset",
    html: `<h1>Click <a href="${link}">here</a> to reset your password</h1>`,
  };
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error("Error sending email:", err);
      return res.status(400).json({ message: "Error sending email." });
    } else {
      res.json({ message: "chek your email." });
    }
  });
});




















const updatePassword = asyncHandler(async (req, res) => {
  const { error } = validateResetPassword(req.body);
  console.log(error);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  const { id, token } = req.params;
  const user = await User.findById(id);
  if (!user) {
    return res
      .status(400)
      .json({ message: "User not found or invalid reset link." });
  }
  const secret = process.env.JWT_SECRET + user.password;
  try {
    jwt.verify(token, secret);
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    user.password = hashedPassword;
    await user.save();
    res.json({ message: "Password updated successfully." });
  } catch (err) {
    console.error("Error updating password:", err);
    return res
      .status(400)
      .json({ message: "Error updating password. Please try again." });
  }
});

module.exports = {
  sendResetLink,
  updatePassword,
};
