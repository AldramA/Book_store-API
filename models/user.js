require("dotenv").config();
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 100,
    },
    username: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 100,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

function validateRegisterUser(user) {
  const schema = joi.object({
    name: joi.string().trim().min(3).max(100).required(),
    username: joi.string().trim().min(3).max(50).required(),
    email: joi.string().trim().min(6).max(100).required().email(),
    password: passwordComplexity().required(),
  });

  return schema.validate(user);
}
function validateLoginUser(user) {
  const schema = joi.object({
    email: joi.string().trim().min(6).max(100).required().email(),
    password: passwordComplexity().required(),
  });

  return schema.validate(user);
}
function validateUpdateUser(user) {
  const schema = joi.object({
    name: joi.string().trim().min(3).max(100),
    email: joi.string().trim().min(6).max(100).email(),
    password: passwordComplexity().required(),
  });

  return schema.validate(user);
}
function validateResetPassword(user) {
  const schema = joi.object({
    password: passwordComplexity().required(),
  });

  return schema.validate(user);
}

module.exports = {
  User,
  validateLoginUser,
  validateRegisterUser,
  validateUpdateUser,
  validateResetPassword,
};
