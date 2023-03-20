const express = require("express");
const app = express();
const mysql = require("mysql2/promise")
const authRoutes = require("./routes/registerRoutes")
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));


app.use("/", authRoutes)

app.get("/attendence",function(req,res) {
    res.render('attendence.ejs')
})

app.get("/leaves",function(req,res) {
    res.render('leaves.ejs');
})
app.listen(3001, () => {
    console.log("App is runnig");
})