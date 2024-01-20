const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  updateUserById,
  deleteUserById,
} = require("../controllers/admin.controller");
const { login } = require("../controllers/auth.controllers");
const { isAdmin } = require("../middlewares/admin.middleware");

router.get("/", isAdmin, getAllUsers);
router.post("/login", login);
router.post("/update", updateUserById);
router.post("/delete", deleteUserById);

module.exports = router;
