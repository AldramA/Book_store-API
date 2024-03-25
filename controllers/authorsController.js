const asyncHandler = require("express-async-handler");
const {
  Author,
  validatCreateAuthor,
  validatUpdateAuthor,
} = require("../models/author");

const getAllAuthors = asyncHandler(async (req, res) => {
  const { page } = req.query;
  const authors = await Author.find()
    .skip((page - 1) * 5)
    .limit(5)
    .sort("firstName");
  res.status(200).send(authors);
});

const getAuthorById = asyncHandler(async (req, res) => {
  const author = await Author.findById(req.params.id);
  if (!author) {
    return res.status(404).send("The author with the given ID was not found");
  } else {
    res.status(200).json(author);
  }
});

const createAuthor = asyncHandler(async (req, res) => {
  const { error } = validatCreateAuthor(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  const author = new Author({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    nationality: req.body.nationality,
    image: req.body.image,
  });
  const result = await author.save();
  res.status(201).send(result);
});

const updateAuthor = asyncHandler(async (req, res) => {
  const { error } = validatUpdateAuthor(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const author = await Author.findByIdAndUpdate(
    req.params.id,
    {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      nationality: req.body.nationality,
      image: req.body.image,
    },
    { new: true }
  );
  if (!author) {
    return res
      .status(404)
      .json({ message: "The author with the given ID was not found" });
  }
  res.status(200).send(author);
});

const deleteAuthor = asyncHandler(async (req, res) => {
  const author = await Author.findById(req.params.id);
  if (!author) {
    return res.status(404).send("The Author with the given ID was not found");
  } else {
    await Author.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Author deleted successfully" });
  }
});

module.exports = {
  getAllAuthors,
  getAuthorById,
  createAuthor,
  updateAuthor,
  deleteAuthor,
  
};
