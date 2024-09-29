const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

if (process.env.NODE_ENV !== "production") {
  dotenv.config({
    path: "Backend/config/config.env",
  });
}

// using Middleware
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cookieParser());

// Importing Routes
const post = require("./routes/post");
const user = require("./routes/user");

// using Routes
app.use("/api/v1", post);
app.use("/api/v1", user);

module.exports = app;
