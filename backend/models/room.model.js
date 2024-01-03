const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

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
  admin: [
    {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    },
  ],
  members: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
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
      type: String,
    },
    username: {
      type: String,
    },
    createdAt: {
      type: Date,
    },
  },

  avatar: {
    type: String,
    default: "v1608731788/images/defualt_kzmons.png",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Room = mongoose.model("Room", room);
module.exports = Room;
