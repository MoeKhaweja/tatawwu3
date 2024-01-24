const express = require("express");
const multer = require("multer");
const path = require("path");
const http = require("http");
const cors = require("cors");
require("dotenv").config();
const { fileStorage, fileFilter, fields } = require("./configs/multer.configs");
const { connectToMongoDB } = require("./configs/mongoDb.configs");
const { socket } = require("./configs/socket.config");
const { authMiddleware } = require("./middlewares/auth.middleware");

const app = express();

app.use(
  cors({
    origin: "*", // Add your client's origin
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

// Create HTTP server
const server = http.createServer(app);

// Attach Socket.IO to the HTTP server
socket(server);

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
app.use("/community", authMiddleware, communityRoutes);

// volunteer route
const volunteerRoutes = require("./routes/volunteer.routes");
app.use("/volunteer", authMiddleware, volunteerRoutes);

// mail route
const sendEmail = require("./routes/mail.route");
app.use("/mail", sendEmail);

// rooms route
const roomRoutes = require("./routes/room.routes");
app.use("/rooms", authMiddleware, roomRoutes);

const adminRoutes = require("./routes/admin.route");
app.use("/admin", adminRoutes);

server.listen(process.env.PORT, () => {
  console.log("Server listining on PORT: ", process.env.PORT);
  connectToMongoDB();
});
