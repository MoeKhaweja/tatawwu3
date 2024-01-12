const mongoose = require("mongoose");

const communitySchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  name: { type: String, required: true, minlength: 3 },
  description: { type: String, required: true, minlength: 10 },
  img: { type: String },
  // location: { type: String, required: true, minlength: 3 },
  events: [
    {
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
  ],
});

const Community = mongoose.model("Community", communitySchema);

module.exports = Community;
