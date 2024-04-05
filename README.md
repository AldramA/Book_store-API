# Book Store API

This project is a Node.js application utilizing MongoDB for database operations. It provides endpoints for CRUD operations on a book store database, along with authentication, authorization, and security measures.

## Technologies Used
- Node.js
- Express.js
- MongoDB

## API Endpoints

### Authentication
- `POST /api/v1/auth/register`: Register a new user.
- `POST /api/v1/auth/login`: Login with registered credentials.
- `PUT /api/v1/users/:id` : Update user by ID.

### Book Operations
- `GET /api/v1/books`: Retrieve all books.
- `GET /api/v1/books/:id`: Retrieve a specific book by ID.
- `POST /api/v1/books`: Add a new book.
- `PUT /api/v1/books/:id`: Update a book by ID.
- `DELETE /api/v1/books/:id`: Delete a book by ID.


### Author Operations
- `GET /api/v1/authors?page=?`: Retrieve Authors books.
- `GET /api/v1/authors/:id`: Retrieve a specific book by ID.
- `POST /api/v1/authors`: Add a new Author.
- `PUT /api/v1/authors/:id`: Update a author by ID.
- `DELETE /api/v1/authors/:id`: Delete a book by ID.

### User Operations
- `GET /api/v1/users/`: Retrieve all users.
- `GET /api/v1/users/:id`: Retrieve a specific user by ID.

### Reset Passwored
- `POST /api/v1/password/forgot`: Get Email to Reset Passwored.
- `POST /api/v1/auth/login`: New Passwored.

### Security Measures
- JWT (JSON Web Tokens) for authentication.
- Password hashing using bcrypt for secure storage.
- Middleware for authorization checks on protected routes.

## Setup
1. Clone the repository.
2. Install dependencies using `npm install`.
3. Set up environment variables for MongoDB connection and JWT secret.
4. Run the application using `npm start`.

## Usage
1. Register a new user or login with existing credentials.
2. Use the provided JWT token for authorization.
3. Access the various endpoints for CRUD operations on books.

## Contribution
Contributions are welcome! Feel free to open issues or pull requests for any improvements or bug fixes.

## License
This project is licensed under the [MIT License](LICENSE).
