const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const passport = require("passport");

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
      if (
        user.passwordResetToken == token &&
        user.passwordResetTokenExpiry > Date.now()
      ) {
        user.password = password;
        await user.save();
      }
      res.status(200).json(user);
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

module.exports = {
  login,
  register,
  changePassword,
};
