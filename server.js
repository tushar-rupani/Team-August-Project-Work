const express = require("express");
const app = express();
const mysql = require("mysql2/promise")
const authRoutes = require("./routes/registerRoutes")

const employeeDataRoutes = require("./routes/employeeDataHandling");
const favicon = require('serve-favicon'); 
const leaveAdminRoute = require("./routes/ leaveAdminRoute"); 
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));
app.use(favicon(__dirname + '/public/assets/favicon.ico'));

app.use("/", authRoutes);

app.use("/employee-data", employeeDataRoutes);
app.use("/leaveadmin", leaveAdminRoute);
app.listen(3000, () => {
    console.log("App is runnig");
})