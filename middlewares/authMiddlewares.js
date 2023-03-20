const jwt = require("jsonwebtoken");

function checkIfTokenExists(req, res, next){
    let token = req.cookies.token;
    if(!token){
        console.log("token ");
        next();
    }else{
        return res.redirect("/activate");
    }
}

function handleLogin(req, res, next){
    if(!req.session.user){
        console.log("came here for sessions");
        return res.redirect("/")
    }
    next();
}

function checkIfLoggedIn(req, res, next){
    console.log(req.session.user);
    if(req.session.user){
        return res.redirect("/self/home")
    }
    next();
}

module.exports = {checkIfTokenExists, handleLogin, checkIfLoggedIn};