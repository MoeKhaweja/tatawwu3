const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  updateUserById,
  deleteUserById,
} = require("../controllers/admin.controller");
const { login } = require("../controllers/auth.controllers");
const { isAdmin } = require("../middlewares/admin.middleware");
const { authMiddleware } = require("../middlewares/auth.middleware");

router.get("/", authMiddleware, isAdmin, getAllUsers);
router.post("/login", isAdmin, login);
router.post("/update", authMiddleware, isAdmin, updateUserById);
router.post("/delete", authMiddleware, isAdmin, deleteUserById);

module.exports = router;
