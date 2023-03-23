const express = require("express");
const app = express();
const authRoutes = require("./routes/registerRoutes")
const homeRoutes = require("./routes/homeRoutes");
const activityRoutes = require("./routes/activityRoutes");
const commentRoutes = require("./routes/commentRoutes");
const newsRoutes = require("./routes/newsRoutes");
const hotlineRoutes = require("./routes/hotlineRoutes");
const profileRoutes = require("./routes/profileRoutes");
const employeeFormRoutes = require("./routes/employeeFormRoutes")
var cookieParser = require('cookie-parser');
var session = require('express-session');
require("dotenv").config();

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));

app.use(cookieParser());
app.use(session({
    secret:process.env.SESSION_SECRET_KEY,
    resave:false,
    saveUninitialized:true
  }));


app.use("/", authRoutes);
app.use("/self", homeRoutes);
app.use("/activity", activityRoutes);
app.use("/comments", commentRoutes);
app.use("/news", newsRoutes);
app.use("/profile", profileRoutes);
app.use("/hotline", hotlineRoutes);
app.use("/", employeeFormRoutes)

app.get("*", (req, res) => {
  res.render("404")
})

app.listen(3000, () => {
    console.log("App is runnig");
})