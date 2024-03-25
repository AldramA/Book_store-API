const ex = require("express");
const router = ex.Router();
const { registerUser, loginUser } = require("../controllers/authController");

router.post("/register", registerUser);

router.post("/login", loginUser);

module.exports = router;
