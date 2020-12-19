const express = require("express");

const mongoose = require("mongoose");
const app = express();
const passport = require("passport");
const passportLocal = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const expressSession = require("express-session");
const cookieParser = require("cookie-parser");
const usersRouter = require("./routes/api");
const PORT = process.env.PORT || 3001;
const path = require("path");

// Define middleware here
app.use(cookieParser());
app.use(express.json());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.get("/*", (req, res) => { res.sendFile(path.join(__dirname, "client", "build", "index.html")); });

// Add routes, both API and view
app.use('/user', usersRouter);


// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/artsingtest", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
}
).then(
  () => { console.log("Connected, yay!!") }
).catch((err) => {
  console.log("ERROR:", err);
}
);

// Start the API server'
app.listen(PORT, function () {
  console.log(`API Server now listening on PORT ${PORT}!`);
});
