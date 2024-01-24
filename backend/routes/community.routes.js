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
  getCommunityEventApplicants,
  getCommunity,
  getEvent,
  getCommunityEventsUser,
  sortByQuery,
} = require("../controllers/community.controller");

const router = express.Router();

router.get("/", getAllCommunities);
router.post("/create", createCommunity);
router.post("/addEvent", addEvent);
router.post("/editEvent", editEvent);
router.post("/deleteEvent", deleteEvent);
router.post("/invite", inviteOrCancelInvite);
router.post("/apply", applyForEvent);
router.post("/cancel", cancelApplication);
router.post("/accept", acceptApplication);
router.post("/reject", rejectApplication);
router.get("/events", getCommunityEvents);
router.post("/events", getAllEvents);
router.post("/community_events", getCommunityEventsUser);
router.post("/event", getEvent);
router.post("/details", getCommunity);
router.post("/applicants", getCommunityEventApplicants);
router.get("/sort", sortBySkills);
router.post("/search", sortByQuery);

module.exports = router;
