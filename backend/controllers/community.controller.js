const { handleBase64Image } = require("../helpers/base64.helper");
const Community = require("../models/community.model");
const User = require("../models/user.model");
const fs = require("fs");
const path = require("path");

async function createCommunity(req, res) {
  const user = req.user;
  const { name, description, schedule, img } = req.body;

  const imagePath = await handleBase64Image(img);
  console.log(imagePath);

  try {
    const newCommunity = new Community({
      name,
      description,
      schedule,
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

async function getCommunityEvents(req, res) {
  const user = req.user;

  try {
    const community = await Community.findOne({ owner: user._id });
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
  const { title, description, schedule, location, duration, img } = req.body;
  try {
    const imagePath = await handleBase64Image(img);
    console.log(imagePath);
    const community = await Community.findOne({ owner: user._id });

    if (!community) {
      return res.status(404).json({ error: "Community not found" });
    }
    console.log(title, description, schedule, location, duration, imagePath);

    community.events.push({
      title,
      description,
      schedule,
      location,
      duration,
      img: imagePath,
    });
    await community.save();
    return res.status(200).send({ events: community.events });
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({ error: error.message });
  }
}

async function editEvent(req, res) {
  const user = req.user;
  const { title, description, schedule, location, duration, img, _id } =
    req.body;
  const updatedEventData = {
    title,
    description,
    schedule,
    location,
    duration,
    img,
  };
  try {
    const imagePath = img ? await handleBase64Image(img) : null;
    console.log(imagePath);
    const updatedEventData = {
      title,
      description,
      schedule,
      location,
      duration,
      img: imagePath,
    };
    const community = await Community.findOne({ owner: user._id });
    if (!community) {
      return res.status(404).json({ error: "Community not found" });
    }

    const eventToUpdate = community.events.id(_id);
    if (!eventToUpdate) {
      return res.status(404).json({ error: "Event not found" });
    }
    if (updatedEventData.img) {
      fs.unlink(
        path.join(
          path.resolve(path.join(__dirname, "..")),
          "images",
          eventToUpdate.img
        ),
        (err) => {
          if (err) {
            console.error("Error deleting the previous image:", err);
          } else {
            console.log("Previous image deleted successfully!");
          }
        }
      );
    }

    Object.assign(eventToUpdate, updatedEventData);
    await community.save();

    return res.status(200).send({ updatedEvent: eventToUpdate });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}

async function deleteEvent(req, res) {
  const { communityId, eventId } = req.body;
  try {
    const community = await Community.findById(communityId);
    if (!community) {
      return res.status(404).json({ error: "Community not found" });
    }

    community.events.pull({ _id: eventId });
    await community.save();
    return res.status(200).send({ events: community.events });
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

module.exports = {
  createCommunity,
  addEvent,
  editEvent,
  deleteEvent,
  inviteOrCancelInvite,
  handleApplication,
  getCommunityEvents,
};
