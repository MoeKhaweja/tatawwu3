const express = require("express");
const {
  createCommunity,
  addEvent,
  editEvent,
  deleteEvent,
  inviteOrCancelInvite,
  applyForEvent,
  getCommunityEvents,
  getAllEvents,
  sortBySkills,
  cancelApplication,
  acceptApplication,
  rejectApplication,
  getAllCommunities,
} = require("../controllers/community.controller");
const { authMiddleware } = require("../middlewares/auth.middleware");

const router = express.Router();

router.get("/", authMiddleware, getAllCommunities);
router.post("/create", authMiddleware, createCommunity);
router.post("/addEvent", authMiddleware, addEvent);
router.post("/editEvent", authMiddleware, editEvent);
router.post("/deleteEvent", authMiddleware, deleteEvent);
router.post("/invite", inviteOrCancelInvite);
router.post("/apply", authMiddleware, applyForEvent);
router.post("/cancel", authMiddleware, cancelApplication);
router.post("/accept", authMiddleware, acceptApplication);
router.post("/reject", authMiddleware, rejectApplication);
router.get("/events", authMiddleware, getCommunityEvents);
router.post("/events", authMiddleware, getAllEvents);
router.get("/sort", authMiddleware, sortBySkills);

module.exports = router;
