const express = require("express");
const {
  followCommunity,
  updateProfile,
  applyForEvent,
  updateUserImage,
} = require("../controllers/volunteer.controller");

const router = express.Router();

router.post("/follow", followCommunity);
router.post("/update", updateProfile);
router.post("/apply", applyForEvent);
router.post("/image", updateUserImage);

module.exports = router;
