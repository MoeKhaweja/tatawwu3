const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const fs = require("fs");
const { extract } = require("../helpers/resumeExtractor.helper");
const { handleBase64Image } = require("../helpers/base64.helper");
const path = require("path");

/**
 * Verifies the user's token and returns the user's details.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} The user's details and token.
 */
const verify = async (req, res) => {
  if (!req.user) {
    return res.status(404).send({ error: "no token" });
  }
  const { _id, ...userDetails } = req.user.toJSON();
  return res.status(200).send({ user: userDetails, token: req.token });
};

/**
 * Logs in the user by checking their credentials and generating a JWT token.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} The user's details and JWT token.
 */
const login = async (req, res) => {
  const { email, password } = req.body;

  // check if user is available in DB
  const user = await User.findOne({ email: email });
  if (!user)
    return res.status(400).send({ message: "Invalid username/password" });

  // check if password is correct
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword)
    return res.status(400).send({ message: "Invalid username/password" });

  const { password: hashedPassword, _id, ...userDetails } = user.toJSON();

  // generate JWT token
  const token = jwt.sign(
    {
      ...userDetails,
    },
    process.env.JWT_SECRET,
    { expiresIn: "2 days" }
  );

  res.status(200).send({
    user: userDetails,
    token,
  });
};

/**
 * Registers a new user.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} The newly registered user's details.
 */
const register = async (req, res) => {
  const { email, password, firstName, lastName, role = null } = req.body;
  if (!email || !password || !firstName || !lastName) {
    res.status(400).send({ message: "all fields are required" });
  }

  try {
    const user = new User({
      email,
      password,
      firstName,
      lastName,
      role,
    });

    await user.save();

    res.status(200).send({ user });
  } catch (e) {
    res.status(500).send({ error: e });
  }
};

/**
 * Changes the user's password.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} A message indicating the status of the password change.
 */
const changePassword = async (req, res) => {
  const { email, password, token } = req.body;

  if (!email || !password || !token) {
    res.status(400).send({ message: "all fields are required" });
  }
  try {
    const user = await User.findOne({ email: email }); // Finding user by email
    if (user) {
      // User found
      if (
        user.passwordResetToken === token &&
        user.passwordResetTokenExpiry > Date.now()
      ) {
        user.password = password;
        await user.save();
        res.status(200).json({ message: "password updated" });
      } else {
        res.status(404).json({ message: "wrong token" });
      }
    } else {
      // User not found
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    // Handle any errors that occur during the query
    console.error("Error finding user by email:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * Updates the user's details.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} The updated user's details.
 */
async function updateUser(req, res) {
  const userId = req.user.id; // Assuming userId is part of the route
  const {
    firstName,
    lastName,
    skills,
    academicBackground,
    bio,
    userImage,
    birthdate,
    gender,
  } = req.body;
  try {
    const imagePath = userImage ? await handleBase64Image(userImage) : null;
    const updatedUserData = {
      firstName,
      lastName,
      gender,
      skills,
      academicBackground: [...academicBackground],
      bio,
      birthdate,
      userImage: imagePath,
    };

    const user = await User.findByIdAndUpdate(userId, updatedUserData, {
      new: true,
    });
    const oldImage = await path.join(
      path.resolve(path.join(__dirname, "..")),
      "images",
      user.userImage
    );
    fs.unlink(oldImage, (err) => {
      if (err) {
        console.log("Error deleting the previous image:", err);
      } else {
        console.log("Previous image deleted successfully!");
      }
    });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ error: "error.message" });
  }
}

/**
 * Updates the user's verification image.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} The updated user's details or an error message.
 */
async function updateVerificationImage(req, res) {
  const userId = req.user.id; // Assuming userId is part of the route
  const img = req.body.image; // Access the uploaded file information
  const imagePath = img ? await handleBase64Image(img) : null;

  try {
    if (!img) {
      return res.status(400).send("Please upload a valid image file.");
    }

    const updatedUserData = {
      identificationImage: imagePath, // Save the file path in the user's data
      isIdImageUploaded: true,
    };

    const user = await User.findByIdAndUpdate(userId, updatedUserData);
    const oldImage = await path.join(
      path.resolve(path.join(__dirname, "..")),
      "images",
      user.identificationImage
    );
    fs.unlink(oldImage, (err) => {
      if (err) {
        console.log("Error deleting the previous image:", err);
      } else {
        console.log("Previous image deleted successfully!");
      }
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ error: "error.message" });
  }
}

/**
 * Retrieves and processes the user's resume.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} The extracted features from the resume or an error message.
 */
async function getResume(req, res) {
  const userId = req.user.id; // Assuming userId is part of the route
  const resume = req.files.resume[0]; // Access the uploaded file information
  try {
    if (!resume) {
      return res.status(400).send("Please upload a valid cv file.");
    }

    const updatedUserData = {
      resume: resume.path, // Save the file path in the user's data
      isResumeUploaded: true,
    };

    const user = await User.findByIdAndUpdate(userId, updatedUserData);
    fs.unlink(user.resume, (err) => {
      if (err) {
        console.log("Error deleting the previous cv:", err);
      } else {
        console.log("Previous cv deleted successfully!");
      }
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const features = await extract(resume.path);
    return res.status(200).json(features);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

module.exports = {
  login,
  register,
  changePassword,
  updateVerificationImage,
  getResume,
  verify,
  updateUser,
};
