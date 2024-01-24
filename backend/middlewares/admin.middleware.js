const User = require("../models/user.model");

/**
 * Checks if a user is an admin.
 * @async
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {void} Calls the next middleware function if the user is an admin, otherwise sends a response with an error.
 */
const isAdmin = async (req, res, next) => {
  if (req.body.email) {
    try {
      const user = await User.findOne({ email: req.body.email }).select(
        "-password"
      );
      req.user = user;

      if (req.user.role == "admin") {
        next();
      } else {
        return res.status(400).json({ error: "Forbidden" });
      }
    } catch {
      return res.status(400).json({ error: "Forbidden" });
    }
  } else {
    if (req.user) {
      if (req.user.role == "admin") {
        next();
      } else {
        return res.status(400).json({ error: "Forbidden" });
      }
    }
  }
};

module.exports = {
  isAdmin,
};
