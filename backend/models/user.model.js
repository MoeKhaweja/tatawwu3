const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Community = require("../models/community.model");
const Event = require("../models/event.model");
const Room = require("../models/room.model");

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true, minlength: 2 },
  lastName: { type: String, required: true, minlength: 2 },
  birthdate: { type: String },
  nationality: { type: String, minlength: 3 },
  gender: { type: String },
  bio: { type: String, minlength: 5 },
  email: { type: String, required: true, unique: true },
  googleId: { type: String },
  password: {
    type: String,
    required: function () {
      return !this.googleId;
    },
    minlength: 6,
  },
  passwordResetToken: { type: String },
  passwordResetTokenExpiry: { type: Date },

  verified: { type: Boolean, default: false },
  role: {
    type: String,
    enum: ["admin", "volunteer", "community"],
    default: "volunteer",
  },
  identificationImage: { type: String },
  userImage: { type: String },
  resume: { type: String },
  isResumeUploaded: { type: Boolean, default: false },
  isIdImageUploaded: { type: Boolean, default: false },
  isCommunityOwner: { type: Boolean, default: false },

  skills: [String],
  academicBackground: [
    { degreeTitle: { type: String }, Institution: { type: String } },
  ],
  volunteeringRecords: [
    {
      community: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Community",
        required: true,
      },
      duration: { type: Number, required: true },
    },
  ],
  following: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  rooms: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
    },
  ],
});

userSchema.pre(
  "findOneAndDelete",
  { document: true, query: true },
  async function (next) {
    try {
      const user = await this.model.findOne(this.getFilter());
      console.log(user);
      // Handle community owner deletion
      if (user.isCommunityOwner) {
        await Community.findOneAndDelete({ owner: user.id }); // Delete the community
        await Event.deleteMany({ community: user.id }); // Delete community events
      }

      // Handle event applicant removal
      await Event.updateMany(
        { "applicants.user": user.id },
        { $pull: { applicants: { user: user.id } } }
      );

      // Handle room chat admin deletion
      await Room.deleteOne({ admin: user.id });

      // Handle room chat member removal
      await Room.updateMany(
        { members: user.id },
        { $pull: { members: user.id } }
      );

      next();
    } catch (error) {
      console.error("Error during user deletion:", error);
      next(error);
    }
  }
);

userSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) {
      return next();
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
