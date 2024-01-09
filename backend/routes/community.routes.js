const express = require("express");
const {
  createCommunity,
  addEvent,
  editEvent,
  deleteEvent,
  inviteOrCancelInvite,
  handleApplication,
  getCommunityEvents,
} = require("../controllers/community.controller");
const { authMiddleware } = require("../middlewares/auth.middleware");

const router = express.Router();

router.post("/create", authMiddleware, createCommunity);
router.post("/addEvent", addEvent);
router.post("/editEvent", editEvent);
router.post("/deleteEvent", deleteEvent);
router.post("/invite", inviteOrCancelInvite);
router.post("/handle", handleApplication);
router.get("/events", authMiddleware, getCommunityEvents);

module.exports = router;
