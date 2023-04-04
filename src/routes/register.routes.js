const express = require("express");
const app = express.Router();
const { handleLogin, checkIfLoggedIn } = require("../middlewares/authMiddlewares");
const {loginController, registerController, checkEmailExistController, logoutController} = require("../controllers/auth.controllers")
const {activateLinkController, renderActivatePage} = require("../controllers/validation.controllers");


app.get("/", checkIfLoggedIn, (req, res) => {
    res.render("register")
})

app.post("/register", registerController);

app.post("/login", loginController);

app.get("/activate", renderActivatePage);

app.get("/suspend", (req,res)=>{
    res.render("suspend");
});

app.get("/activate-account/:token", activateLinkController);

app.post("/check-user-email", checkEmailExistController);

app.get("/logout", logoutController)


module.exports = app;