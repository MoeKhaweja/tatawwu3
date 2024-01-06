const mongoose = require("mongoose");

const communitySchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  name: { type: String, required: true, minlength: 3 },
  description: { type: String, required: true, minlength: 10 },
  // location: { type: String, required: true, minlength: 3 },
  events: [
    {
      title: { type: String, required: true, minlength: 3 },
      description: { type: String, required: true, minlength: 10 },
      schedule: { type: String, required: true },
      location: { type: String, required: true, minlength: 3 },
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
      image: String,
      duration: { type: Number, required: true },
    },
  ],
});

const Community = mongoose.model("Community", communitySchema);

module.exports = Community;
