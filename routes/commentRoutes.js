const express = require('express');
const app = express.Router();
const {checkIfLoggedIn} = require("../middlewares/authMiddlewares");
const {registerController} = require("../controllers/authControllers")
const {addcommentControllers} = require("../controllers/commentControllers");



app.post("/comments", addcommentControllers);

module.exports = app;
