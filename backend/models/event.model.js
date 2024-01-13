const mongoose = require("mongoose");
const Community = require("../models/community.model");

// Define the applicant schema
const applicantSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  status: {
    type: String,
    required: true,
    enum: ["pending", "approved", "rejected"],
  },
});

// Define the event schema
const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  schedule: { type: String, required: true },
  location: { type: String, required: true },
  applicants: [applicantSchema],
  targetedSkills: [{ type: String }],
  img: { type: String, required: true },
  duration: { type: Number, required: true },
  community: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Community",
  },
});

// Middleware to automatically update the community when a new event is added
eventSchema.pre("save", function (next) {
  const eventId = this._id;
  const communityId = this.community;
  console.log("hello", eventId, communityId);
  Community.findByIdAndUpdate(
    communityId,
    { $push: { events: eventId } },
    { new: true }
  )
    .then(() => next())
    .catch(next);
});

// Post-remove hook to update the community's events array after an event is removed
eventSchema.pre(
  "deleteOne",
  { document: false, query: true },
  async function (next) {
    try {
      const event = await this.model.findOne(this.getFilter());

      // Check if the event exists
      if (!event) {
        console.log("Event not found");
        return next();
      }

      // Save the community ID before removing the event
      const communityId = event.community;

      await Community.findByIdAndUpdate(
        communityId,
        { $pull: { events: event._id } },
        { new: true }
      );
      // Proceed with the event deletion
      next();
    } catch (error) {
      console.error("Error deleting event:", error);
      next(error);
    }
  }
);

const Event = mongoose.model("Event", eventSchema);
module.exports = Event;
