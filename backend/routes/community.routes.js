const express = require("express");
const {
  createCommunity,
  addEvent,
  editEvent,
  deleteEvent,
  inviteOrCancelInvite,
  handleApplication,
} = require("../controllers/community.controller");

const router = express.Router();

router.post("/create", createCommunity);
router.post("/addEvent", addEvent);
router.post("/editEvent", editEvent);
router.post("/deleteEvent", deleteEvent);
router.post("/invite", inviteOrCancelInvite);
router.post("/handle", handleApplication);

module.exports = router;
