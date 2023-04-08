const express = require("express");
const app = express.Router();
const { handleLogin, checkIfLoggedIn } = require("../middlewares/authMiddlewares");
const {loginController, registerController, checkEmailExistController, logoutController, forgotPassRender, forgotPassPost, newPasswordPage, resetPassword} = require("../controllers/auth.controllers")
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

app.get("/forgot", forgotPassRender)

app.post("/forgot-pass", forgotPassPost)

app.get("/new-pass", newPasswordPage)

app.get("/reset-password/:token", resetPassword)

module.exports = app;