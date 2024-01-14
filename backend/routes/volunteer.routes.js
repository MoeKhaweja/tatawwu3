const express = require("express");
const {
  followCommunity,
  updateProfile,
  applyForEvent,
  updateUserImage,
  applicationStatus,
  findEventsByApplicant,
} = require("../controllers/volunteer.controller");
const { authMiddleware } = require("../middlewares/auth.middleware");

const router = express.Router();

router.post("/follow", followCommunity);
router.post("/update", updateProfile);
router.post("/apply", authMiddleware, applyForEvent);
router.post("/status", authMiddleware, applicationStatus);
router.get("/find", authMiddleware, findEventsByApplicant);
router.post("/image", updateUserImage);

module.exports = router;
