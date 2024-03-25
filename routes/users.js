const ex = require("express");
const router = ex.Router();

const {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../middlewares/verifyToken");

const {
  getAllUsers,
  getUserbyId,
  updateUser,
  deleteUser,
} = require("../controllers/usersContrller");

router.get("/", verifyTokenAndAdmin, getAllUsers);

router
  .route("/:id")
  .get(verifyTokenAndAuthorization, getUserbyId)
  .put(verifyTokenAndAuthorization, updateUser)
  .delete(verifyTokenAndAuthorization, deleteUser);

module.exports = router;
