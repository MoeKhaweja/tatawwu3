const express = require("express");
const cookieSession = require("cookie-session");
const passport = require("passport");
const passportSetup = require("./configs/passport-setup");

require("dotenv").config();

const { connectToMongoDB } = require("./configs/mongoDb.configs");

const app = express();
app.use(express.json());

// set up session cookies
// app.use(
//   cookieSession({
//     maxAge: 24 * 60 * 60 * 1000,
//     keys: ["secret"],
//   })
// );

// initialize passport
app.use(passport.initialize());
// app.use(passport.session());

// auth route
const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);

// create home route
app.get("/", (req, res) => {
  res.render("home", { user: req.user });
});

app.listen(8000, () => {
  console.log("Server listining on PORT: ", 8000);
  connectToMongoDB();
});
