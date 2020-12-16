const express = require("express");

const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();
const passport = require("passport");
const passportLocal = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const expressSession = require("express-session");
const cookieParser = require("cookie-parser");
const PORT = process.env.PORT || 3001;

// Define middleware here
app.use(cookieParser());
app.use(express.json());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
// Add routes, both API and view
app.use(routes);

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/artsingtest", {useUnifiedTopology: true}, () => console.log("successfully connected to db"));

const User = require("./models/user")

const userInput = {
  first_name: "Cris",
  last_name: "Perez",
  city: "Houston",
  state: "Texas",
  voice_type: "bass-baritone",
  email: "c.perez525@yahoo.com",
  password: "testing123"
}

const user = new User(userInput);
user.save((err,document) => {
  if (err) console.log(err);

  console.log(document)
});

// Start the API server'
app.listen(PORT, function() {
  console.log(`API Server now listening on PORT ${PORT}!`);
});
