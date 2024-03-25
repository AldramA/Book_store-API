mongoose = require("mongoose");
const joi = require("joi");

const authorSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50,
      trim: true,
    },
    nationality: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 50,
    },
    image: {
      type: String,
      default: `default-avatar.jpg`,
    },
  },
  {
    timestamps: true,
  }
);

const Author = mongoose.model("Author", authorSchema);

function validatCreateAuthor(author) {
  const schema = joi.object({
    firstName: joi.string().trim().min(3).max(50).required(),
    lastName: joi.string().trim().min(3).max(50).required(),
    nationality: joi.string().max(50).required(),
    image: joi.string().min(3),
  });
  return schema.validate(author);
}

function validatUpdateAuthor(author) {
  const schema = joi.object({
    firstName: joi.string().trim().min(3).max(50),
    lastName: joi.string().trim().min(3).max(50),
    nationality: joi.string().max(50),
    image: joi.string().min(3),
  });
  return schema.validate(author);
}

module.exports = { Author, validatCreateAuthor, validatUpdateAuthor };
