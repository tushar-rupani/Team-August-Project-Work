const { handleLogin } = require("../middlewares/authMiddlewares");
const express = require("express");
const app = express.Router();

app.get("/home", handleLogin, (req, res) => {
    res.render("index")
})


module.exports = app;