const mongoose = require("mongoose");

// Define the community schema
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
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
    },
  ],
});

const Community = mongoose.model("Community", communitySchema);

module.exports = Community;
