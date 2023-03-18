const express = require("express");
const router=express.Router();
const { handleLogin } = require("../middlewares/authMiddlewares");

router.get("/home", handleLogin, (req, res) => {
    res.render("index")
})


module.exports = router;

