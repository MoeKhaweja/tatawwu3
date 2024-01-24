const express = require("express");
const router = express.Router();
const {
  createRoom,
  joinRoom,
  getUserRooms,
  getRoom,
  getNotUserRooms,
} = require("../controllers/room.controller");

router.post("/create", createRoom);
router.post("/join", joinRoom);
router.post("/get", getRoom);
router.get("/get", getUserRooms);
router.get("/join", getNotUserRooms);

module.exports = router;
