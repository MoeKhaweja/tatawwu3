const User = require("../models/user.model"); // Import your User model

/**
 * Get all users.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - The array of users in JSON format.
 * @throws {Object} - JSON object with an error message in case of failure.
 */
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select(
      "_id firstName lastName email verified identificationImage role"
    );

    return res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * Update a user by ID.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - The updated user in JSON format.
 * @throws {Object} - JSON object with an error message in case of failure.
 */
const updateUserById = async (req, res) => {
  try {
    const userId = req.body.userId;
    if (!userId) {
      return res.status(404).json({ error: "No userId found" });
    }
    const updatedUser = await User.findByIdAndUpdate(userId, req.body, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

/**
 * Delete a user by ID.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - JSON object with a success message.
 * @throws {Object} - JSON object with an error message in case of failure.
 */
const deleteUserById = async (req, res) => {
  try {
    const userId = req.body.id;
    if (!userId) {
      return res.status(404).json({ error: "No userId found" });
    }
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getAllUsers,
  updateUserById,
  deleteUserById,
};
