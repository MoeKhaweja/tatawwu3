const { handleBase64Image } = require("../helpers/base64.helper");
const { semanticEvents } = require("../helpers/semanticEvents.helper");
const Community = require("../models/community.model");
const Event = require("../models/event.model");
const User = require("../models/user.model");
const fs = require("fs");
const path = require("path");

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
async function getAllEvents(req, res) {
  const page = parseInt(req.body.page) || 1; // Extract the page from query parameters or default to page 1
  const pageSize = 10; // Set the number of events per page as needed

  try {
    const allEvents = await Event.find()
      .skip((page - 1) * pageSize)
      .limit(pageSize);

    return res.status(200).json({ allEvents });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

async function getCommunityEvents(req, res) {
  const user = req.user;

  try {
    const community = await Community.findOne({ owner: user._id }).populate(
      "events"
    );

    if (!community) {
      return res.status(404).json({ error: "Community not found" });
    }

    return res.status(200).send({ events: community.events });
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
    const community = await Community.findOne({ owner: user._id });

    // Check if the community exists
    if (!community) {
      return res.status(404).json({ error: "Community not found" });
    }

    // Handle the image if provided
    const imagePath = img ? await handleBase64Image(img) : null;

    // Add the new event to the community's events array
    community.events.push({
      title,
      description,
      schedule,
      location,
      duration,
      img: imagePath,
      targetedSkills,
    });

    // Save the updated community
    await community.save();

    // Respond with the updated events array
    return res.status(200).send({ events: community.events });
  } catch (error) {
    // Handle errors and respond with an error message
    console.log(error.message);
    return res.status(400).json({ error: error.message });
  }
}

async function editEvent(req, res) {
  const user = req.user;
  const { title, description, schedule, location, duration, img, _id } =
    req.body;

  try {
    // Handle the image if provided
    const imagePath = img ? await handleBase64Image(img) : null;
    console.log(imagePath);

    // Create an updatedEventData object
    const updatedEventData = {
      title,
      description,
      schedule,
      location,
      duration,
      img: imagePath,
    };

    // Ensure that the user owns the community
    const community = await Community.findOne({ owner: user._id });
    if (!community) {
      return res.status(404).json({ error: "Community not found" });
    }

    // Check if the event is associated with the community
    const isEventAssociated = community.events.some((eventId) =>
      eventId.equals(_id)
    );
    if (!isEventAssociated) {
      return res.status(404).json({
        error: "Event not found or not associated with the community",
      });
    }

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
  try {
    // Find the event by its ID and remove it
    const removedEvent = await Event.findByIdAndRemove(eventId);

    if (!removedEvent) {
      return res.status(404).json({ error: "Event not found or not removed" });
    }

    // The 'remove' hook in eventSchema.post("remove") should have updated the community's events array

    // Respond with the removed event
    return res.status(200).send({ removedEvent });
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

async function handleApplication(req, res) {
  const { communityId, eventId, userId, action } = req.body;
  try {
    const community = await Community.findById(communityId);
    if (!community) {
      return res.status(404).json({ error: "Community not found" });
    }

    const event = community.events.id(eventId);
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    const applicant = event.applicants.find(
      (applicant) =>
        applicant.user.toString() === userId && applicant.status === "applied"
    );

    if (!applicant) {
      return res
        .status(404)
        .json({ error: "User did not apply for this event" });
    }

    if (action === "accept") {
      applicant.status = "accepted";
    } else if (action === "decline") {
      applicant.status = "declined";
    }

    await community.save();
    return res.status(200).send({ event });
  } catch (error) {
    return res.status(400).json({ error: error.message });
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
  handleApplication,
  getCommunityEvents,
  getAllEvents,
  sortBySkills,
};
