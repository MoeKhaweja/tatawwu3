const express = require("express");
const multer = require("multer");
const path = require("path");
const http = require("http");
const cors = require("cors");
require("dotenv").config();
const socketIO = require("socket.io");
const { fileStorage, fileFilter, fields } = require("./configs/multer.configs");
const { connectToMongoDB } = require("./configs/mongoDb.configs");
const Room = require("./models/room.model");

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173", // Add your client's origin
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);
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
      console.log(room, sender);
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
          lastMessage: {
            message: message,
            sender: sender,
          },
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

const adminRoutes = require("./routes/admin.route");
app.use("/admin", adminRoutes);

server.listen(8000, () => {
  console.log("Server listining on PORT: ", 8000);
  connectToMongoDB();
});
