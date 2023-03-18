const express = require("express");
const app = express();
const mysql = require("mysql2/promise")
const authRoutes = require("./routes/registerRoutes")
const homeRoutes = require("./routes/homeRoutes");
const dashboardRoutes = require("./routes/homeRoutes");
var cookieParser = require('cookie-parser');
var session = require('express-session');


app.set("view engine", "ejs");

//middleware set up
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));

app.use(cookieParser());
app.use(session({
    secret:"secret key",
    resave:false,
    saveUninitialized:true
  }));


app.use("/", authRoutes);
app.use("/self", homeRoutes);
app.use("/dashboard", dashboardRoutes)

app.get("*", (req, res) => {
  res.render("404")
})


app.listen(3000, () => {
    console.log("App is runnig");
})