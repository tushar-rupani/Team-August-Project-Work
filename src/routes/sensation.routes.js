const express = require("express");
const router=express.Router();
const { handleLogin } = require("../middlewares/authMiddlewares");



router.get("/sensation", handleLogin, (req,res)=>{
    res.render('sensation',{activatePage:"sensation"});
});


module.exports = router;