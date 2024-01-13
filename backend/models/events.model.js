const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  event: {
    title: { type: String, required: true },
    description: { type: String, required: true },
    schedule: { type: String, required: true },
    location: { type: String, required: true },
    applicants: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        status: {
          type: String,
          required: true,
        },
      },
    ],
    targetedSkills: [{ type: String }],
    img: { type: String, required: true },
    duration: { type: Number, required: true },
  },
});

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
