const express = require("./node_modules/express");
const passport = require("./passport");
const app = express();
const PORT = process.env.PORT || 3001;



// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(passport.initialize());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
// Add routes, both API and view
require("./routes/routes")(app, passport);

// Start the API server
app.listen(PORT, () =>
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`)
);
