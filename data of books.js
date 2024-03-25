const books = [
  {
    title: "Black Swan",
    author: "65f94da1b87a77029acfb24c",
    description: "About Black Swan",
    price: 10,
    cover: "soft",
  },
  {
    title: "Skin In The Game",
    author: "65f94da1b87a77029acfb24c",
    description: "About Skin In The Game",
    price: 12,
    cover: "soft",
  },
  {
    title: "1984",
    author: "65f96c1aba0902184f236484",
    description: "About 1984",
    price: 11,
    cover: "soft",
  },
  {
    title: "To Kill a Mockingbird",
    author: "65f94dd3b87a77029acfb24e",
    description: "About To Kill a Mockingbird",
    price: 9,
    cover: "soft",
  },
  {
    title: "The Catcher in the Rye",
    author: "65f94dd3b87a77029acfb24e",
    description: "About The Catcher in the Rye",
    price: 10,
    cover: "soft",
  },
  {
    title: "The Great Gatsby",
    author: "65f94e06b87a77029acfb250",
    description: "About The Great Gatsby",
    price: 13,
    cover: "soft",
  },
  {
    title: "Pride and Prejudice",
    author: "65f94e06b87a77029acfb250",
    description: "About Pride and Prejudice",
    price: 8,
    cover: "soft",
  },
  {
    title: "Crime and Punishment",
    author: "65f94e2eb87a77029acfb252",
    description: "About Crime and Punishment",
    price: 10,
    cover: "soft",
  },
  {
    title: "The Alchemist",
    author: "65f94e2eb87a77029acfb252",
    description: "About The Alchemist",
    price: 15,
    cover: "soft",
  },

  {
    title: "Lord of the Flies",
    author: "65f96c1aba0902184f236479",
    description: "About Lord of the Flies",
    price: 9,
    cover: "soft",
  },
  {
    title: "The Hobbit",
    author: "65f96c1aba0902184f236479",
    description: "About The Hobbit",
    price: 14,
    cover: "soft",
  },
  {
    title: "The Chronicles of Narnia",
    author: "65f96c1aba0902184f23647a",
    description: "About The Chronicles of Narnia",
    price: 16,
    cover: "soft",
  },
  {
    title: "The Da Vinci Code",
    author: "65f96c1aba0902184f23647a",
    description: "About The Da Vinci Code",
    price: 11,
    cover: "soft",
  },
  {
    title: "Gone with the Wind",
    author: "65f96c1aba0902184f23647b",
    description: "About Gone with the Wind",
    price: 13,
    cover: "soft",
  },
  {
    title: "The Catcher in the Rye",
    author: "65f96c1aba0902184f23647b",
    description: "About The Catcher in the Rye",
    price: 10,
    cover: "soft",
  },
  {
    title: "The Grapes of Wrath",
    author: "65f96c1aba0902184f23647c",
    description: "About The Grapes of Wrath",
    price: 12,
    cover: "soft",
  },
  {
    title: "The Picture of Dorian Gray",
    author: "65f96c1aba0902184f23647c",
    description: "About The Picture of Dorian Gray",
    price: 9,
    cover: "soft",
  },
  {
    title: "The Hunger Games",
    author: "65f96c1aba0902184f23647d",
    description: "About The Hunger Games",
    price: 15,
    cover: "soft",
  },
  {
    title: "The Road",
    author: "65f96c1aba0902184f23647d",
    description: "About The Road",
    price: 10,
    cover: "soft",
  },
  {
    title: "Wuthering Heights",
    author: "65f96c1aba0902184f23647e",
    description: "About Wuthering Heights",
    price: 11,
    cover: "soft",
  },
  {
    title: "The Secret Garden",
    author: "65f96c1aba0902184f23647e",
    description: "About The Secret Garden",
    price: 8,
    cover: "soft",
  },
  {
    title: "Little Women",
    author: "65f96c1aba0902184f23647f",
    description: "About Little Women",
    price: 10,
    cover: "soft",
  },
  {
    title: "Moby-Dick",
    author: "65f96c1aba0902184f23647f",
    description: "About Moby-Dick",
    price: 13,
    cover: "soft",
  },
  {
    title: "Jane Eyre",
    author: "65f96c1aba0902184f236480",
    description: "About Jane Eyre",
    price: 9,
    cover: "soft",
  },
  {
    title: "The Shining",
    author: "65f96c1aba0902184f236485",
    description: "About The Shining",
    price: 11,
    cover: "soft",
  },
  {
    title: "Frankenstein",
    author: "65f96c1aba0902184f236481",
    description: "About Frankenstein",
    price: 10,
    cover: "soft",
  },
  {
    title: "The Handmaid's Tale",
    author: "65f96c1aba0902184f236481",
    description: "About The Handmaid's Tale",
    price: 12,
    cover: "soft",
  },
  {
    title: "A Tale of Two Cities",
    author: "65f96c1aba0902184f236486",
    description: "About A Tale of Two Cities",
    price: 9,
    cover: "soft",
  },
  {
    title: "The Adventures of Tom Sawyer",
    author: "65f96c1aba0902184f236487",
    description: "About The Adventures of Tom Sawyer",
    price: 8,
    cover: "soft",
  },
  {
    title: "The Secret Life of Bees",
    author: "65f96c1aba0902184f236488",
    description: "About The Secret Life of Bees",
    price: 11,
    cover: "soft",
  },
];

const authors = [
  {
    firstName: "Robert",
    lastName: "Kiyosaki",
    nationality: "USA",
  },
  {
    firstName: "Paulo",
    lastName: "Coelho",
    nationality: "Brazil",
  },
  {
    firstName: "Wayne",
    lastName: "Dyer",
    nationality: "USA",
  },
  {
    firstName: "Rolf",
    lastName: "Dobelli",
    nationality: "Switzerland",
  },
  {
    firstName: "Margaret",
    lastName: "Atwood",
    nationality: "Canada",
  },
  {
    firstName: "Haruki",
    lastName: "Murakami",
    nationality: "Japan",
  },
  {
    firstName: "J.K.",
    lastName: "Rowling",
    nationality: "UK",
  },
  {
    firstName: "Gabriel",
    lastName: "García Márquez",
    nationality: "Colombia",
  },
  {
    firstName: "Agatha",
    lastName: "Christie",
    nationality: "UK",
  },
  {
    firstName: "Leo",
    lastName: "Tolstoy",
    nationality: "Russia",
  },
  {
    firstName: "Stephen",
    lastName: "King",
    nationality: "USA",
  },
  {
    firstName: "George",
    lastName: "Orwell",
    nationality: "UK",
  },
  {
    firstName: "Jane",
    lastName: "Austen",
    nationality: "UK",
  },
  {
    firstName: "Ernest",
    lastName: "Hemingway",
    nationality: "USA",
  },
  {
    firstName: "Fyodor",
    lastName: "Dostoevsky",
    nationality: "Russia",
  },
  {
    firstName: "Virginia",
    lastName: "Woolf",
    nationality: "UK",
  },
];

module.exports = {
  books,
  authors,
};
