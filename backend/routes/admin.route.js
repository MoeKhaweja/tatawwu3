const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  updateUserById,
  deleteUserById,
} = require("../controllers/admin.controller");

router.get("/", getAllUsers);
router.post("/update", updateUserById);
router.post("/delete", deleteUserById);

module.exports = router;
