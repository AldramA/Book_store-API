const asyncHandler = require("express-async-handler");
const {
  Book,
  validatCreateBook,
  validatUpdateBook,
} = require("../models/book");
const multer = require("multer");
const path = require("path");

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

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const imagespath = path.join(__dirname, "../images/bookCover");
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

    let createBookFields = {
      title: req.body.title,
      author: req.body.author,
      price: req.body.price,
      description: req.body.description,
      cover: req.body.cover,
      category: req.body.category,
    };
    if (req.file) {
      createBookFields.image = req.file.path;
    }

    const newBook = new Book(createBookFields);
    const savedBook = await newBook.save();
    res.status(201).json(savedBook);
  });
});

const updateBook = asyncHandler(async (req, res) => {
  const { error } = validatUpdateBook(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const imagespath = path.join(__dirname, "../images/bookCover");
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
    if (req.file) {
      bookUpdated.image = req.file.path;
    }
    res.status(200).json(bookUpdated);
  });
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
