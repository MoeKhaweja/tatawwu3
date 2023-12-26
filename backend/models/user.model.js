const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const eventSchema = new mongoose.Schema({
  eventId: { type: mongoose.Schema.Types.ObjectId, required: true },
  title: { type: String, required: true, minlength: 3 },
  description: { type: String, required: true, minlength: 10 },
  schedule: { type: String, required: true },
  location: { type: String, required: true, minlength: 3 },
  applicants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  image: String,
  duration: { type: Number, required: true },
});

const communitySchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, required: true },
  name: { type: String, required: true, minlength: 3 },
  description: { type: String, required: true, minlength: 10 },
  location: { type: String, required: true, minlength: 3 },
  events: [eventSchema],
});

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true, minlength: 2 },
  lastName: { type: String, required: true, minlength: 2 },
  birthdate: { type: Date },
  nationality: { type: String, minlength: 3 },
  gender: { type: String },
  bio: { type: String, minlength: 5 },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
  verified: { type: Boolean, default: false },
  role: {
    type: String,
    enum: ["admin", "volunteer", "community"],
    default: "volunteer",
  },
  communityDetails: {
    type: communitySchema,
    default: null,
  },
  identificationImage: String,
  skills: [String],
  academicBackground: [String],
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
});

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
