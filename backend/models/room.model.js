const mongoose = require("mongoose");

const room = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please add a title"],
  },
  description: {
    type: String,
    minlength: 1,
    maxlength: 256,
    required: [true, "Please add a description"],
  },
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  chat: [
    {
      message: { type: String },
      sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      createdAt: { type: Date, default: Date.now },
    },
  ],
  lastMessage: {
    message: {
      default: "",
      type: String,
    },
    sender: {
      type: String,
    },
    createdAt: {
      type: Date,
    },
  },

  avatar: {
    type: String,
    default:
      "https://www.google.com/url?sa=i&url=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FList_of_monochrome_and_RGB_color_formats&psig=AOvVaw3YDs5Fee9xnkDEqWEIAE_F&ust=1704664627882000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCPC_s-XgyYMDFQAAAAAdAAAAABAY",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Room = mongoose.model("Room", room);
module.exports = Room;
