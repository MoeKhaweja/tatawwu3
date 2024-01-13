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
const bodyParser = require("body-parser");
const Room = require("./models/room.model");

// initialize passport
// app.use(passport.initialize());

const app = express();
// app.use(bodyParser.json({ limit: "35mb" }));

// app.use(
//   bodyParser.urlencoded({
//     extended: true,
//     limit: "35mb",
//     parameterLimit: 500000,
//   })
// );
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(
  express.json({
    verify: (req, res, buf) => {
      req.rawBody = buf.toString();
    },
    limit: "50mb",
  })
);

const server = http.createServer(app); // Create HTTP server

const io = socketIO(server); // Attach Socket.IO to the HTTP server

io.on("connection", (socket) => {
  console.log(socket.id);

  socket.on("send-message", (message, room, sender) => {
    if (room) {
      console.log(message, room, sender);
      // Handle message for all clients
      // socket.emit("receive-message", "hooooyehhh");
      socket.to(room).emit("receive-message", message, sender);
      const find = async () => {
        const target = await Room.findById(room);
        const fieldsToUpdate = {
          chat: [
            ...target.chat,
            {
              message: message,
              sender: sender,
            },
          ],
        };
        await target.updateOne(fieldsToUpdate, {
          new: true,
          runValidators: true,
        });
        console.log("done");
      };
      find();
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
