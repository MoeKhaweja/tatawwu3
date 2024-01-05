const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true, minlength: 2 },
  lastName: { type: String, required: true, minlength: 2 },
  birthdate: { type: Date },
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
  rooms: {
    type: [mongoose.Schema.Types.ObjectId],
    default: [],
  },
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
