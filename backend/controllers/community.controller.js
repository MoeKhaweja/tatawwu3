const { handleBase64Image } = require("../helpers/base64.helper");
const { semanticEvents } = require("../helpers/semanticEvents.helper");
const Community = require("../models/community.model");
const Event = require("../models/event.model");
const User = require("../models/user.model");
const fs = require("fs");
const path = require("path");

const getAllCommunities = async (req, res) => {
  try {
    const communities = await Community.find().populate({
      path: "owner",
      select: "-_id firstName lastName bio skills academicBackground userImage",
    });

    res.status(200).json(communities);
  } catch (error) {
    console.error("Error getting communities:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getCommunity = async (req, res) => {
  const { community } = req.body;
  try {
    const communities = await Community.findById(community).populate({
      path: "owner",
      select: "-_id firstName lastName bio skills academicBackground userImage",
    });

    res.status(200).json(communities);
  } catch (error) {
    console.error("Error getting communities:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

async function createCommunity(req, res) {
  const user = req.user;
  const { name, description, img } = req.body;

  const imagePath = img ? await handleBase64Image(img) : null;
  console.log(imagePath);

  try {
    const newCommunity = new Community({
      name,
      description,
      img: imagePath,
    });
    newCommunity.owner = user.id;

    await newCommunity.save();
    user.isCommunityOwner = true;
    await user.save();

    return res.status(200).send({ community: newCommunity });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: error.message });
  }
}

async function getEvent(req, res) {
  const { eventId } = req.body;

  try {
    const allEvents = await Event.findById(eventId).select("-applicants");

    return res.status(200).json(allEvents);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

async function getAllEvents(req, res) {
  const page = parseInt(req.body.page) || 1; // Extract the page from query parameters or default to page 1
  const pageSize = 10; // Set the number of events per page as needed

  try {
    const allEvents = await Event.find()
      .skip((page - 1) * pageSize)
      .limit(pageSize);

    return res.status(200).json(allEvents);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

async function getCommunityEventsUser(req, res) {
  const { communityId } = req.body;

  try {
    const community = await Community.findById(communityId);
    console.log(community);

    if (!community) {
      return res.status(404).json({ error: "Community not found" });
    }

    return res.status(200).send(community.events);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}

// as a community
async function getCommunityEvents(req, res) {
  const user = req.user;

  try {
    const community = await Community.findOne({
      owner: user._id,
    }).populate({
      path: "events",
      populate: {
        path: "applicants.user",
        select:
          "-_id firstName lastName bio skills academicBackground userImage",
      },
    });
    console.log(community);

    if (!community) {
      return res.status(404).json({ error: "Community not found" });
    }

    return res.status(200).send({ events: community.events });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}

async function getCommunityEventApplicants(req, res) {
  const { eventId } = req.body;

  try {
    const event = await Event.findById(eventId).populate({
      path: "applicants.user",
      select: "-_id firstName lastName bio skills academicBackground userImage",
    });
    console.log(event);

    if (!event) {
      return res.status(404).json({ error: "Community not found" });
    }

    return res.status(200).send({ events: event.applicants });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}

async function addEvent(req, res) {
  const user = req.user;
  const {
    title,
    description,
    schedule,
    location,
    duration,
    img,
    targetedSkills,
  } = req.body;

  try {
    // Find the community based on the user
    const community = await Community.findOne({ owner: user.id });

    // Check if the community exists
    if (!community) {
      return res.status(404).json({ error: "Community not found" });
    }

    // Handle the image if provided
    const imagePath = img ? await handleBase64Image(img) : "null";

    // Create a new Event document with the associated community and save it
    const newEvent = new Event({
      title,
      description,
      schedule,
      location,
      duration,
      img: imagePath,
      targetedSkills,
      community: community._id, // Specify the community association
    });
    await newEvent.save();

    // Respond with the new event
    return res.status(200).send({ event: newEvent });
  } catch (error) {
    // Handle errors and respond with an error message
    console.log(error.message);
    return res.status(400).json({ error: error.message });
  }
}

async function editEvent(req, res) {
  const user = req.user;
  const {
    title,
    description,
    schedule,
    location,
    duration,
    targetedSkills,
    img,
    _id,
  } = req.body;

  try {
    // Handle the image if provided
    const imagePath = img ? await handleBase64Image(img) : null;
    console.log(
      title,
      description,
      schedule,
      location,
      duration,
      targetedSkills,
      img,
      _id
    );

    // Create an updatedEventData object
    const updatedEventData = {
      title,
      description,
      schedule,
      location,
      duration,
      targetedSkills,
      img: imagePath,
    };

    // Directly update the event by its ID
    const updatedEvent = await Event.findByIdAndUpdate(
      _id,
      {
        $set: {
          title: updatedEventData.title,
          description: updatedEventData.description,
          schedule: updatedEventData.schedule,
          location: updatedEventData.location,
          duration: updatedEventData.duration,
          targetedSkills: updatedEventData.targetedSkills,
          img: updatedEventData.img,
        },
      },
      { new: true }
    );

    // Check if the event was found and updated
    if (!updatedEvent) {
      return res.status(404).json({ error: "Event not found or not updated" });
    }

    // Respond with the updated event
    return res.status(200).send({ updatedEvent });
  } catch (error) {
    // Handle errors and respond with an error message
    console.log(error.message);
    return res.status(400).json({ error: error.message });
  }
}

async function deleteEvent(req, res) {
  const { eventId } = req.body;
  const user = req.user;
  try {
    const community = await Community.findOne({ owner: user._id });
    if (!community) {
      return res.status(404).json({ error: "Community not found" });
    }
    // Find the event by its ID and remove it
    const removedEvent = await Event.findById(eventId);
    console.log(community._id, removedEvent.community);

    if (!removedEvent) {
      return res.status(404).json({ error: "Event not found or not removed" });
    }
    if (removedEvent.community.equals(community._id)) {
      await removedEvent.deleteOne();
      return res.status(200).send({ removedEvent });
    }

    // The 'remove' hook in eventSchema.post("remove") should have updated the community's events array

    // Respond with the removed event
    return res.status(400).send({ error: error.message });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}

async function inviteOrCancelInvite(req, res) {
  const { communityId, eventId, userId, cancel } = req.body;
  try {
    const community = await Community.findById(communityId);
    if (!community) {
      return res.status(404).json({ error: "Community not found" });
    }

    const event = community.events.id(eventId);
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    const existingInviteIndex = event.applicants.findIndex(
      (applicant) =>
        applicant.user.toString() === userId && applicant.status === "invited"
    );

    if (cancel) {
      // Cancel the invitation if it exists
      if (existingInviteIndex !== -1) {
        event.applicants.splice(existingInviteIndex, 1);
        await community.save();
        return res.status(200).send({ event });
      }
      return res
        .status(404)
        .json({ error: "User is not invited to this event" });
    }

    // Invite the user if not already invited
    if (existingInviteIndex === -1) {
      event.applicants.push({ user: userId, status: "invited" });
      await community.save();
      return res.status(200).send({ event });
    }
    return res.status(400).json({ error: "User already invited" });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}

// Function to apply for an event
async function applyForEvent(req, res) {
  const { eventId } = req.body;
  const userId = req.user.id;
  console.log(userId, eventId);
  try {
    const event = await Event.findById(eventId);

    if (!event) {
      return res
        .status(400)
        .json({ success: false, message: "Event not found" });
    }

    // Check if the user has already applied
    const existingApplicant =
      event.applicants &&
      event.applicants.some(
        (applicant) =>
          applicant.user && applicant.user.toString() === userId.toString()
      );

    if (existingApplicant) {
      return res
        .status(400)
        .json({ success: false, message: "User has already applied" });
    }

    // Add new application
    event.applicants.push({
      user: userId,
      status: "pending",
    });

    await event.save();

    return res
      .status(200)
      .send({ success: true, message: "Application successful" });
  } catch (error) {
    console.error("Error applying for event:", error);
    return res
      .status(400)
      .json({ success: false, message: "Internal server error" });
  }
}

async function cancelApplication(req, res) {
  const { eventId } = req.body;
  const userId = req.user.id;
  console.log(userId, eventId);
  try {
    const event = await Event.findById(eventId);

    if (!event) {
      return res
        .status(400)
        .json({ success: false, message: "Event not found" });
    }

    // Check if the user has already applied
    const existingApplicant =
      event.applicants &&
      event.applicants.findIndex(
        (applicant) =>
          applicant.user && applicant.user.toString() === userId.toString()
      );

    if (existingApplicant !== -1) {
      event.applicants.splice(existingApplicant, 1);

      await event.save();

      return res
        .status(200)
        .json({ success: true, message: "Application canceled" });
    }

    return res.status(400).send({ success: true, message: "error" });
  } catch (error) {
    console.error("Error applying for event:", error);
    return res
      .status(400)
      .json({ success: false, message: "Internal server error" });
  }
}

async function acceptApplication(req, res) {
  const { eventId, applicantId } = req.body;
  console.log(applicantId, eventId);
  try {
    const event = await Event.findById(eventId);

    if (!event) {
      return res
        .status(400)
        .json({ success: false, message: "Event not found" });
    }

    // Find the applicant in the event
    const applicant = event.applicants.find(
      (app) => app._id.toString() === applicantId
    );

    if (!applicant) {
      return res
        .status(400)
        .json({ success: false, message: "Applicant not found" });
    }

    // Update applicant status to 'approved'
    applicant.status = "approved";

    await event.save();

    return res
      .status(200)
      .json({ success: true, message: "Application accepted" });
  } catch (error) {
    console.error("Error accepting application:", error);
    return res
      .status(400)
      .json({ success: false, message: "Internal server error" });
  }
}
async function rejectApplication(req, res) {
  const { eventId, applicantId } = req.body;
  console.log(applicantId, eventId);
  try {
    const event = await Event.findById(eventId);

    if (!event) {
      return res
        .status(400)
        .json({ success: false, message: "Event not found" });
    }

    // Find the applicant in the event
    const applicantIndex = event.applicants.findIndex(
      (app) => app.id && app.id === applicantId
    );

    if (applicantIndex === -1) {
      return res
        .status(400)
        .json({ success: false, message: "Applicant not found" });
    }

    // Remove the applicant from the list
    event.applicants[applicantIndex].status = "rejected";

    await event.save();

    return res
      .status(200)
      .json({ success: true, message: "Application rejected" });
  } catch (error) {
    console.error("Error rejecting application:", error);
    return res
      .status(400)
      .json({ success: false, message: "Internal server error" });
  }
}

async function sortBySkills(req, res) {
  const user = req.user;

  try {
    // Retrieve all events from the Event model
    const allEvents = await Event.find();

    // Use semanticEvents or any other logic to calculate similarities
    const similarities = await semanticEvents(user.skills, allEvents);

    function getSimilarEvents(allEvents, similarities) {
      const similarEventIds = similarities.map((similarity) => similarity.id);
      return allEvents.filter((event) => similarEventIds.includes(event.id));
    }

    // Get the filtered events
    const filteredEvents = getSimilarEvents(allEvents, similarities);

    return res.status(200).send(filteredEvents);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}

module.exports = {
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
};
