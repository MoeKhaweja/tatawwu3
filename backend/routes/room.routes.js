const express = require("express");
const router = express.Router();
const {
  createRoom,
  joinRoom,
  getUserRooms,
  getRoom,
} = require("../controllers/room.controller");
const { authMiddleware } = require("../middlewares/auth.middleware");

router.post("/create", authMiddleware, createRoom);
router.post("/join", authMiddleware, joinRoom);
router.post("/get", authMiddleware, getRoom);
router.get("/get", authMiddleware, getUserRooms);

module.exports = router;
