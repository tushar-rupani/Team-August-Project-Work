const express = require("express");
const router=express.Router();
const moment = require("moment")
const { handleLogin } = require("../middlewares/authMiddlewares");
var connection = require("../connection/connection");


router.get("/home", handleLogin, async(req, res) => {
    let name;
    let user_id = req.session.user;
    let currentDate = moment().format("YYYY-MM-DD");
    var executeAttendance;
    // let getName = `SELECT full_name from basic_information where employee_id = ${user_id}`;
    try{
        // let [executeName] = await connection.execute(getName);
        // name = executeName[0].full_name;
        let getAttendanceDetails = `SELECT * FROM attendence_manager where employee_id = ${user_id} and date = '${currentDate}'`;
        [executeAttendance] = await connection.execute(getAttendanceDetails);
    }catch(e){
        console.log(e);
    }
    name = "dummy"
    res.render("index", {name: name, attendance: executeAttendance[0]})
})


module.exports = router;

