const { handleLogin } = require("../middlewares/authMiddlewares");
const express = require("express");
const app = express.Router();

app.get("/home", handleLogin, (req, res) => {
    res.render("index")
});

app.get("/hotline", handleLogin, (req, res) => {
    res.render("hotline");
});


module.exports = app;