const ex = require("express");
const {
  sendResetLink,
  updatePassword,
} = require("../controllers/passwordController");
const router = ex.Router();

router.route("/forgot").post(sendResetLink);
router.route("/reset/:id/:token").post(updatePassword);

module.exports = router;
