const express = require("express");
const crypto = require("crypto");
const cookieSession = require("cookie-session");
const multer = require("multer");
const passport = require("passport");
const path = require("path");

const passportSetup = require("./configs/passport-setup");

require("dotenv").config();

const { connectToMongoDB } = require("./configs/mongoDb.configs");

const app = express();
app.use(express.json());

const fileStorage = multer.diskStorage({
  destination: (req, file, callback) => {
    //this is storing the file in the images folder
    callback(null, path.join(__dirname, "images"));
  },

  filename: (req, file, callback) => {
    //this is just setting a unique filename
    let temp = file.originalname.split(".");
    const filename =
      temp[0] + "-" + crypto.randomBytes(16).toString("hex") + "." + temp[1];
    callback(null, filename);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single("image")
);

app.use("/images", express.static(path.join(__dirname, "images")));

// initialize passport
// app.use(passport.initialize());

// auth route
const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);

// community route
const communityRoutes = require("./routes/community.routes");
app.use("/community", communityRoutes);

const volunteerRoutes = require("./routes/volunteer.routes");
app.use("/volunteer", volunteerRoutes);

app.listen(8000, () => {
  console.log("Server listining on PORT: ", 8000);
  connectToMongoDB();
});
