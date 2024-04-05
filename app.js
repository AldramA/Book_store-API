require("dotenv").config();
const ex = require("express");
const path = require("path");
const helmet = require("helmet");
const cors = require("cors");
const mongoose = require("mongoose");
const logger = require("./middlewares/logger");
const { notFound, errorHandler } = require("./middlewares/errorHandler");
const app = ex();

app.use(helmet());
app.use(cors((origin = "*")));

app.use(ex.static(path.join(__dirname, "images")));

app.use(ex.json());
app.use(ex.urlencoded({ extended: false }));
app.use(logger.logger);


app.use("/api/v1/books", require("./routes/books"));
app.use("/api/v1/authors", require("./routes/authors"));
app.use("/api/v1/auth", require("./routes/auth"));
app.use("/api/v1/users", require("./routes/users"));
app.use("/api/v1/password", require("./routes/reset_pass"));

app.use(notFound);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  mongoose
    .connect(process.env.MONGODB_URI, {})
    .then(() =>
      console.log(`Connected to MongoDB
Server is running on port ${PORT}
  `)
    )
    .catch((err) => console.log("Failed to connect to MongoDB", err));
});
