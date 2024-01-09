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
router.post("/addEvent", authMiddleware, addEvent);
router.post("/editEvent", authMiddleware, editEvent);
router.post("/deleteEvent", deleteEvent);
router.post("/invite", inviteOrCancelInvite);
router.post("/handle", handleApplication);
router.get("/events", authMiddleware, getCommunityEvents);

module.exports = router;
