const express = require("express");
const crypto = require("crypto");
const cookieSession = require("cookie-session");
const multer = require("multer");
const passport = require("passport");
const path = require("path");
const http = require("http");
require("dotenv").config();
const socketIO = require("socket.io");
const { fileStorage, fileFilter, fields } = require("./configs/multer.configs");
const { connectToMongoDB } = require("./configs/mongoDb.configs");
const passportSetup = require("./configs/passport-setup");

// initialize passport
// app.use(passport.initialize());

const app = express();
app.use(express.json());
const server = http.createServer(app); // Create HTTP server

const io = socketIO(server); // Attach Socket.IO to the HTTP server

io.on("connection", (socket) => {
  console.log(socket.id);

  socket.on("send-message", (message, room, sender) => {
    if (room == 5) {
      console.log(message);
      // Handle message for all clients
      // socket.emit("receive-message", "hooooyehhh");
      socket.to(room).emit("receive-message", message, sender);
    } else {
    }
  });

  socket.on("join-room", (room) => {
    socket.join(room);
    console.log(`Joined ${room}`);
  });
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

// rooms route
const roomRoutes = require("./routes/room.routes");
app.use("/rooms", roomRoutes);

server.listen(8000, () => {
  console.log("Server listining on PORT: ", 8000);
  connectToMongoDB();
});
