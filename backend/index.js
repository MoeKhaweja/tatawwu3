const express = require("express");
const crypto = require("crypto");
const cookieSession = require("cookie-session");
const multer = require("multer");
const passport = require("passport");
const path = require("path");
require("dotenv").config();
const socketio = require("socket.io");

const { fileStorage, fileFilter, fields } = require("./configs/multer.configs");
const { connectToMongoDB } = require("./configs/mongoDb.configs");
const passportSetup = require("./configs/passport-setup");

// initialize passport
// app.use(passport.initialize());

const app = express();
app.use(express.json());

io = socketio(8000);

io.on("connection", (socket) => {
  socket.on("join", ({ name }, callback) => {
    if (error) {
      callback(error);
    } else {
      let roomID = 2436;
      socket.join(roomID);
      console.log(name);
      socket.broadcast.to(roomID).emit("adminMessage", {
        name: "admin",
        content: `${name} has joined`,
      });
    }
  });

  socket.on("disconnect", () => {});
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
