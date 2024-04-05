const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");
const { User, validateUpdateUser } = require("../models/user");
const multer = require("multer");
const path = require("path");

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password");
  res.status(200).json(users);
});

const getUserbyId = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).json({ message: "user not found" });
  }
});

const updateUser = asyncHandler(async (req, res) => {
  if (req.user._id !== req.params.id && !req.user.isAdmin) {
    return res.status(403).json({ message: "Access denied" });
  }
  const { error } = validateUpdateUser(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const imagespath = path.join(__dirname, "../images/userImages");
      cb(null, imagespath);
    },
    filename: (req, file, cb) => {
      cb(
        null,
        new Date().toISOString().replace(/:/g, "-") +
          path.extname(file.originalname)
      );
    },
  });
  const upload = multer({ storage: storage }).single("image");

  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: "Error uploading file" });
    }
    
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }

    let updateUserFields = {
      name: req.body.name,
      email: req.body.email,
    };

    if (req.file) {
      updateUserFields.image = req.file.path;
    }
    
    const updateUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: updateUserFields },
      { new: true }
    ).select("-password");
    
    res.status(200).json(updateUser);
  });
});

const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (user) {
    await User.findOneAndDelete(req.params.id);
    res.status(200).json({ message: "user has been deleted successfully" });
  } else {
    res.status(404).json({ message: "user not found" });
  }
});

module.exports = {
  getAllUsers,
  getUserbyId,
  updateUser,
  deleteUser,
};