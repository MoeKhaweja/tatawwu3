const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const passport = require("passport");
const fs = require("fs");
const { extract } = require("../helpers/resumeExtractor.helper");

const login = async (req, res) => {
  const { email: email, password } = req.body;

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

const changePassword = async (req, res) => {
  const { email, password, token } = req.body;

  if (!email || !password || !token) {
    res.status(400).send({ message: "all fields are required" });
  }
  try {
    const user = await User.findOne({ email: email }); // Finding user by email
    if (user) {
      // User found
      console.log(user.passwordResetToken == token);
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
async function updateVerificationImage(req, res) {
  const userId = req.user.id; // Assuming userId is part of the route
  const private = req.files.private[0]; // Access the uploaded file information
  console.log(private);

  try {
    if (!private) {
      return res.status(400).send("Please upload a valid image file.");
    }

    const updatedUserData = {
      identificationImage: private.path, // Save the file path in the user's data
    };

    const user = await User.findByIdAndUpdate(userId, updatedUserData);
    fs.unlink(user.identificationImage, (err) => {
      if (err) {
        console.error("Error deleting the previous image:", err);
      } else {
        console.log("Previous image deleted successfully!");
      }
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

async function getResume(req, res) {
  console.log("hi");
  const userId = req.body.id; // Assuming userId is part of the route
  const resume = req.files.resume[0]; // Access the uploaded file information

  try {
    if (!resume) {
      return res.status(400).send("Please upload a valid cv file.");
    }

    const updatedUserData = {
      resume: resume.path, // Save the file path in the user's data
    };

    const user = await User.findByIdAndUpdate(userId, updatedUserData);
    fs.unlink(user.resume, (err) => {
      if (err) {
        console.error("Error deleting the previous cv:", err);
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
};
