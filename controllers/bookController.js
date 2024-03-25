const asyncHandler = require("express-async-handler");
const {
  Book,
  validatCreateBook,
  validatUpdateBook,
} = require("../models/book");

const getAllBooks = asyncHandler(async (req, res) => {
  const { minPrice, maxPrice, sortBy, category } = req.query;
  const query = {};
  if (minPrice && maxPrice) {
    query.price = { $gte: minPrice, $lte: maxPrice };
  }
  if (category) {
    query.category = category; 
  }
  let books;
  if (sortBy) {
    books = await Book.find(query).sort(sortBy).populate("author");
  } else {
    books = await Book.find(query).populate("author");
  }
  res.status(200).json(books);
});

const getBookById = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id).populate("author");
  if (!book) {
    return res.status(404).send("The book with the given ID was not found");
  }
  res.status(200).json(book);
});

const createBook = asyncHandler(async (req, res) => {
  const { error } = validatCreateBook(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  const book = new Book({
    title: req.body.title,
    author: req.body.author,
    price: req.body.price,
    description: req.body.description,
    cover: req.body.cover,
    category: req.body.category,
  });
  const result = await book.save();
  res.status(201).json(result);
});


const updateBook = asyncHandler(async (req, res) => {
  const { error } = validatUpdateBook(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  const bookUpdated = await Book.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        title: req.body.title,
        author: req.body.author,
        price: req.body.price,
        description: req.body.description,
        cover: req.body.cover,
      },
    },
    { new: true }
  );
  if (!bookUpdated) {
    return res.status(404).send("The book with the given ID was not found");
  }
  res.status(200).json(bookUpdated);
});

const deleteBook = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (!book) {
    return res.status(404).send("The book with the given ID was not found");
  } else {
    await Book.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "The book was deleted" });
  }
});

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
};
