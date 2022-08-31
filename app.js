const createError = require("http-errors");
const express = require("express");
const path = require("path");
const logger = require("morgan");
const JWT = require("jsonwebtoken");

const homeRouter = require("./routes/home");
const postsRouter = require("./routes/posts");
const tokensRouter = require("./routes/tokens");
const usersRouter = require("./routes/users");

const app = express();

// setup for receiving JSON
app.use(express.json())

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// middleware function to check for valid tokens
const tokenChecker = (req, res, next) => {
  try {
    const payload = JWT.verify(req.body.token, process.env.JWT_SECRET);
    req.user_id = payload.user_id;
    next();
  } catch(err) {
    console.log(err);
    res.status(401).json({message: "auth error"});
  }
};

// route setup
app.use("/", homeRouter);
app.use("/posts", tokenChecker, postsRouter);
app.use("/tokens", tokensRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
