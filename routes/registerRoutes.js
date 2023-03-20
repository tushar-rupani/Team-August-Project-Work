const express = require("express");
const app = express.Router();
const { handleLogin, checkIfLoggedIn } = require("../middlewares/authMiddlewares");
const {loginController, registerController, checkEmailExistController, logoutController} = require("../controllers/authControllers")
const {activateLinkController, renderActivatePage} = require("../controllers/validationControllers");


app.get("/", checkIfLoggedIn, (req, res) => {
    res.render("register")
})

app.post("/register", registerController);

app.post("/login", loginController);

app.get("/activate", renderActivatePage);

app.get("/activate-account/:token", activateLinkController);

app.post("/check-user-email", checkEmailExistController);

app.get("/logout", logoutController)

app.get("/home", (req, res) => {
    res.render("employee_form.ejs")
})

module.exports = app;