const express = require("express");
const router=express.Router();
const { handleLogin } = require("../middlewares/authMiddlewares");
var connection = require("../connection/connection");
router.get("/home", handleLogin, async(req, res) => {
    let name;
    let user_id = req.session.user;
    let getName = `SELECT full_name from basic_information where employee_id = ${user_id}`;
    try{
        let [executeName] = await connection.execute(getName);
        name = executeName[0].full_name;
        
    }catch(e){
        console.log(e);
    }
    res.render("index", {name: name})
})


module.exports = router;

