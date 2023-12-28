const express = require("express");
const cookieSession = require("cookie-session");

const passport = require("passport");
const passportSetup = require("./configs/passport-setup");

require("dotenv").config();

const { connectToMongoDB } = require("./configs/mongoDb.configs");

const app = express();
app.use(express.json());

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
