const express = require("express");
const {
  login,
  register,
  changePassword,
  updateVerificationImage,
} = require("../controllers/auth.controllers");

const router = express.Router();
const passport = require("passport");
const { authMiddleware } = require("../middlewares/auth.middleware");

router.post("/login", login);
router.post("/register", register);
router.post("/reset", changePassword);
router.post("/verify", authMiddleware, updateVerificationImage);

// auth login
// router.get('/login', (req, res) => {
//   res.render('login', { user: req.user });
// });

// // auth logout
// router.get("/logout", function (req, res) {
//   req.session.destroy(function (e) {
//     req.logout();
//     res.redirect("/google");
//   });
// });

// // auth with google+
// router.get(
//   "/google",
//   passport.authenticate("google", {
//     scope: ["profile", "email"],
//     session: false,
//   })
// );

// // callback route for google to redirect to
// // hand control to passport to use code to grab profile info
// router.get(
//   "/google/redirect",
//   passport.authenticate("google", { session: false }),
//   (req, res) => {
//     return res.send({ user: req.user });
//     // res.redirect('/profile');
//   }
// );

module.exports = router;
