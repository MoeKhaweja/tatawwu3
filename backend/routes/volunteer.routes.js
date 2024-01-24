const express = require("express");
const {
  followCommunity,
  updateProfile,
  applyForEvent,
  updateUserImage,
  applicationStatus,
  findEventsByApplicant,
  getAllVolunteers,
  sortByQuery,
} = require("../controllers/volunteer.controller");

const router = express.Router();

router.post("/follow", followCommunity);
router.post("/update", updateProfile);
router.post("/apply", applyForEvent);
router.post("/status", applicationStatus);
router.get("/find", findEventsByApplicant);
router.get("/", getAllVolunteers);
router.post("/", sortByQuery);
router.post("/image", updateUserImage);

module.exports = router;
