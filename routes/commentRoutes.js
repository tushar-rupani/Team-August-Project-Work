const express = require('express');
const app = express.Router();
const {checkIfLoggedIn} = require("../middlewares/authMiddlewares");
const {registerController} = require("../controllers/authControllers")
const {commentControllers} = require("../controllers/commentControllers");

app.get("/", commentControllers)

app.post("/comments", commentControllers);

module.exports = app;
