const express = require("express");
const router=express.Router();
const moment = require("moment")
const { handleLogin } = require("../middlewares/authMiddlewares");
const {checkIfUserIsonBreak, checkIfUserIsBreakedOut } = require("../controllers/activityController");

var connection = require("../connection/connection");
const e = require("express");


router.get("/home", handleLogin, async(req, res) => {
    let name;
    let user_id = req.session.user;
    let currentDate = moment().format("YYYY-MM-DD");
    let breakAns = await checkIfUserIsonBreak(user_id); 
    let breakoutAns = await checkIfUserIsBreakedOut(user_id);
    let hasCheckedIn;
    var executeAttendance, executeActivity;
    try{
        let getAttendanceDetails = `SELECT * FROM attendence_manager where employee_id = ${user_id} and date = '${currentDate}'`;
        [executeAttendance] = await connection.execute(getAttendanceDetails);

        if(executeAttendance[0].length != 0 );{
            hasCheckedIn = true;
        }

        let getActivityDetails = `SELECT * FROM break_manager where employee_id = ${user_id} and created_date = '${currentDate}'`;
        [executeActivity] = await connection.execute(getActivityDetails);
    }catch(e){
        console.log(e);
    }
    name = "dummy"
    res.render("index", {name: name, attendance: executeAttendance[0], activity: executeActivity, breakAns, hasCheckedIn, breakoutAns});
})


module.exports = router;

