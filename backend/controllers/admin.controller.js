const User = require("../models/user.model"); // Import your User model

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).send(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
