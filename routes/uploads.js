const ex = require("express");
const router = ex.Router();
const upload = require("../controllers/uploadsController");

router.post("/", upload.single("image"), (req, res) => {
  res.json({ message: "File uploaded successfully" });
});

module.exports = router;
