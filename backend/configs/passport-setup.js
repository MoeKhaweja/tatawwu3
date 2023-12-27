const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const User = require("../models/user.model");

// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });

// passport.deserializeUser((id, done) => {
//   User.findById(id).then((user) => {
//     done(null, user);
//   });
// });

passport.use(
  new GoogleStrategy(
    {
      // options for google strategy
      clientID:
        "370038405536-ebe6jcl1i7724kn212rmmrsfo0jak36v.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "/auth/google/redirect",
      prompt: "select_account",
    },
    (accessToken, refreshToken, profile, done) => {
      // check if user already exists in our own db
      User.findOne({ googleId: profile.id }).then((currentUser) => {
        if (currentUser) {
          // already have this user
          console.log("user is: ", profile);
          done(null, currentUser, profile);
        } else {
          // if not, create user in our db
          new User({
            googleId: profile.id,
            email: profile.email,
            firstName: profile.name.givenName,
            lastName: profile.name.family_name,
          })
            .save()
            .then((newUser) => {
              console.log("created new user: ", newUser);
              done(null, newUser, profile);
            });
        }
      });
    }
  )
);
