const mongoose = require("mongoose");
const Joi = require("joi");

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 255,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Author",
      required: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    cover: {
      type: String,
      required: true,
      enum: ["soft", "hard"],
      default: "soft",
    },
  },
  { timestamps: true }
);


const validatCreateBook = (book) => {
  const schema = Joi.object({
    title: Joi.string().trim().min(3).max(255).required(),
    author: Joi.string().trim().min(3).max(60).required(),
    price: Joi.number().required(),
    category: Joi.string().trim().min(3).max(60).required(), 
    description: Joi.string().min(3).required(), 
    cover: Joi.string().valid("soft", "hard"),
  });
  return schema.validate(book);
};

const validatUpdateBook = (book) => {
  const schema = Joi.object({
    title: Joi.string().trim().min(3).max(255),
    author: Joi.string().trim().min(3).max(60),
    category: Joi.string().trim().min(3).max(60),
    price: Joi.number(),
    description: Joi.string().min(3),
    cover: Joi.string().valid("soft", "hard"),
  });
  return schema.validate(book);
};

module.exports = {
  Book: mongoose.model("Book", bookSchema),
  validatCreateBook,
  validatUpdateBook,
};
