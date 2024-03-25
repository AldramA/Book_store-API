const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const imagespath = path.join(__dirname, "../images");
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

const upload = multer({ storage: storage });

module.exports = upload;

module.exports = upload;