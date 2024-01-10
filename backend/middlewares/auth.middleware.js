const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const authMiddleware = async (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    console.log("no token");
    return res.status(403).send("Forbidden");
  } else {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findOne({ email: decoded.email }).select(
        "-password"
      );
      req.user = user;
      req.token = token;
      next();
    } catch (err) {
      if (err.name === "TokenExpiredError") {
        console.log("Token expired");
        return res.status(401).send("Token expired");
      } else {
        console.log("Invalid token");
        return res.status(403).send("Forbidden");
      }
    }
  }
};

module.exports = {
  authMiddleware,
};
