const User = require("../models/user.model");
const Community = require("../models/community.model");
const fs = require("fs");

async function followCommunity(req, res) {
  const { userId, communityId } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user || user.role !== "volunteer") {
      return res
        .status(404)
        .json({ error: "Invalid user or user is not a volunteer" });
    }

    const community = await Community.findById(communityId);
    if (!community) {
      return res.status(404).json({ error: "Community not found" });
    }

    const isFollowing = user.following.includes(communityId);

    if (isFollowing) {
      user.following = user.following.filter(
        (id) => id.toString() !== communityId
      );
    } else {
      user.following.push(communityId);
    }

    await user.save();
    return res.status(200).json({ following: user.following });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}

async function updateProfile(req, res) {
  const { userId, updates } = req.body;
  try {
    const user = await User.findByIdAndUpdate(userId, updates, { new: true });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.status(200).json({ user });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}

async function applyForEvent(req, res) {
  const { userId, eventId } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const event = await Community.findOneAndUpdate(
      { "events._id": eventId },
      {
        $addToSet: {
          "events.$.applicants": { user: userId, status: "applied" },
        },
      },
      { new: true }
    );

    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    return res.status(200).json({ event });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}

async function updateUserImage(req, res) {
  const userId = req.body.userId; // Assuming userId is part of the route
  const image = req.file; // Access the uploaded file information

  try {
    if (!image) {
      return res.status(400).send("Please upload a valid image file.");
    }

    const updatedUserData = {
      userImage: image.path, // Save the file path in the user's data
    };

    const user = await User.findByIdAndUpdate(userId, updatedUserData);
    fs.unlink(user.userImage, (err) => {
      if (err) {
        console.error("Error deleting the previous image:", err);
      } else {
        console.log("Previous image deleted successfully!");
      }
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

module.exports = {
  followCommunity,
  updateProfile,
  applyForEvent,
  updateUserImage,
};
