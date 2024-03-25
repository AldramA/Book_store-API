const ex = require("express");
const {
  getAllAuthors,
  getAuthorById,
  createAuthor,
  updateAuthor,
  deleteAuthor,
} = require("../controllers/authorsController");
const { verifyTokenAndAdmin } = require("../middlewares/verifyToken");
const router = ex.Router();

router.route("/").get(getAllAuthors).post(verifyTokenAndAdmin, createAuthor);
router
  .route("/:id")
  .get(getAuthorById)
  .put(verifyTokenAndAdmin, updateAuthor)
  .delete(verifyTokenAndAdmin, deleteAuthor);

module.exports = router;
