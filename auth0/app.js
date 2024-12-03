const express = require("express");
const session = require("express-session");
const passport = require("passport");
const Auth0Strategy = require("passport-auth0");

require("dotenv").config();

const app = express();

// Environment variables for Auth0
const { AUTH0_DOMAIN, AUTH0_CLIENT_ID, AUTH0_CLIENT_SECRET, SESSION_SECRET } = process.env;

// Configure session
app.use(
  session({
    secret: SESSION_SECRET || "a-very-secure-secret",
    resave: false,
    saveUninitialized: true,
  })
);

// Configure Passport
passport.use(
  new Auth0Strategy(
    {
      domain: AUTH0_DOMAIN,
      clientID: AUTH0_CLIENT_ID,
      clientSecret: AUTH0_CLIENT_SECRET,
      callbackURL: "http://localhost:4000/callback",
    },
    function (accessToken, refreshToken, extraParams, profile, done) {
      return done(null, { profile, jwt: extraParams.id_token });
    }
  )
);

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

app.use(passport.initialize());
app.use(passport.session());

// Routes
app.get("/", (req, res) => {
  res.send(`<h1>Welcome</h1><a href="/login">Log in with Auth0</a><br/><a href="/profile">View Profile</a>`);
});

app.get(
  "/login",
  passport.authenticate("auth0", {
    scope: "openid email profile",
  }),
  (req, res) => {
    res.redirect("/");
  }
);

app.get("/callback", passport.authenticate("auth0", { failureRedirect: "/" }), (req, res) => {
  const jwt = req.user.jwt;
  console.log("JWT:", jwt);
  res.redirect("/profile");
});

app.get("/profile", (req, res) => {
  if (!req.isAuthenticated()) {
    return res.redirect("/");
  }

  res.send(`<h1>Profile</h1><pre>${JSON.stringify(req.user, null, 2)}</pre>`);
});

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
