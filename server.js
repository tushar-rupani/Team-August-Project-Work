const express = require("express");
const app = express();

const favicon = require('serve-favicon');
const path = require('path');

const routes = require("./src/routes/routes");
var cookieParser = require('cookie-parser');
var session = require('express-session');
require("dotenv").config();

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname ,'/public')));
app.set('views', path.join(__dirname, '/src/views'));
app.use(cookieParser());
app.use(session({
    secret:process.env.SESSION_SECRET_KEY,
    resave:false,
    saveUninitialized:true
}));


// Routes for entire application.
app.use(routes);



app.use(favicon(path.join(__dirname ,'/public/assets/favicon.ico')));

app.get("*", (req, res) => {
  res.render("404")
})

app.listen(3001, () => {
    console.log("App is runnig");
})