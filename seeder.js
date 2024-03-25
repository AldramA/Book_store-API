const { books,authors } = require("./data of books");
const { Book } = require("./models/book");
const { Author } = require("./models/author");
const mongoose = require("mongoose");
require("dotenv").config();

mongoose
  .connect(process.env.MONGODB_URI, {})
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error while connecting to MongoDB", err);
  });

const removeBooks = async () => {
  try {
    await Book.deleteMany();
    console.log("books has been removed");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

const seedBookes = async () => {
  try {
    await Book.insertMany(books);
    console.log("books has been added");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

const seedAuthors = async () => {
  try {
    await Author.insertMany(authors);
    console.log("authors has been added");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

const removeAuthors = async () => {
  try {
    await Author.deleteMany();
    console.log("authors has been removed");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}

if (process.argv[2] === "-seed") {
  seedBookes();
} else if (process.argv[2] === "-remove") {
  removeBooks();
}else if (process.argv[2] === "-seedAuthors") {
  seedAuthors();
}else if (process.argv[2] === "-removeAuthors") {
  removeAuthors();
}
else {
  console.log("Invalid command");
  process.exit(1);
}
