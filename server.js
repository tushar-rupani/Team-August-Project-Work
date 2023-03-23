const express = require("express");
const app = express();
const authRoutes = require("./routes/registerRoutes")
const homeRoutes = require("./routes/homeRoutes");
const activityRoutes = require("./routes/activityRoutes");
const commentRoutes = require("./routes/commentRoutes");
const leavesRoutes = require("./routes/leavesRoutes");
const leaveAdminRoutes = require("./routes/leaveAdminRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");
var cookieParser = require('cookie-parser');
var session = require('express-session');
// const { attendanceController } = require("./controllers/attendanceController");
require("dotenv").config();
app.set("view engine", "ejs");

//middleware set up
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
app.use("/comment", commentRoutes);
app.use("/leaves",leavesRoutes);
app.use("/leaveadmin", leaveAdminRoutes);
app.use("/attendance",attendanceRoutes);

app.get("*", (req, res) => {
  res.render("404")
})


app.listen(8000, () => {
    console.log("App is runnig");
})