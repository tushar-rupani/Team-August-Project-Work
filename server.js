const express = require("express");
const app = express();
const mysql = require("mysql2/promise");

//require routes
const authRoutes = require("./routes/registerRoutes");
const dashboardRoutes = require("./routes/homeRoutes");

//set template engine
app.set("view engine", "ejs");

//middleware set up
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));

//define routes
app.use("/", authRoutes)
app.use("/dashboard", dashboardRoutes)

app.listen(3000, () => {
    console.log("App is runnig");
})