const express = require("express");
const crypto = require("crypto");
const cookieSession = require("cookie-session");
const multer = require("multer");
const passport = require("passport");
const path = require("path");
require("dotenv").config();

const { fileStorage, fileFilter, fields } = require("./configs/multer.configs");
const { connectToMongoDB } = require("./configs/mongoDb.configs");
const passportSetup = require("./configs/passport-setup");

// initialize passport
// app.use(passport.initialize());

const app = express();
app.use(express.json());

// Enable CORS middleware
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // Replace with your frontend domain
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// multer middleware
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).fields(fields)
);

// public folder
app.use("/images", express.static(path.join(__dirname, "images")));

// auth route
const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);

// community route
const communityRoutes = require("./routes/community.routes");
app.use("/community", communityRoutes);

// volunteer route
const volunteerRoutes = require("./routes/volunteer.routes");
app.use("/volunteer", volunteerRoutes);

// mail route
const sendEmail = require("./routes/mail.route");
app.use("/mail", sendEmail);

app.listen(8000, () => {
  console.log("Server listining on PORT: ", 8000);
  connectToMongoDB();
});
