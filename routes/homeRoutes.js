const express = require("express");
const router = express.Router();
const moment = require("moment")
const { handleLogin } = require("../middlewares/authMiddlewares");
const { checkIfUserIsonBreak, checkIfUserIsBreakedOut } = require("../controllers/activityController");

var connection = require("../connection/connection");
const e = require("express");


router.get("/home", handleLogin, async (req, res) => {
    let name;
    let user_id = req.session.user;
    let currentDate = moment().format("YYYY-MM-DD");
    let breakAns = await checkIfUserIsonBreak(user_id);
    let breakoutAns = await checkIfUserIsBreakedOut(user_id);
    let hasCheckedIn;
    var executeAttendance, executeActivity;
    try {
        let getAttendanceDetails = `SELECT * FROM attendence_manager where employee_id = ${user_id} and date = '${currentDate}'`;
        [executeAttendance] = await connection.execute(getAttendanceDetails);

        if (executeAttendance[0].length != 0); {
            hasCheckedIn = true;
        }

        let getActivityDetails = `SELECT * FROM break_manager where employee_id = ${user_id} and created_date = '${currentDate}'`;
        [executeActivity] = await connection.execute(getActivityDetails);
    } catch (e) {
        console.log(e);
    }

    name = "dummy"
    let activatePage = "home"
    let ts = Date.now();

    let date_time = new Date(ts);
    let date = date_time.getDate();
    let month = date_time.getMonth() + 1;
    let year = date_time.getFullYear();

   
    
    var date_ob=year + "-" + month + "-" + date
    let qry_show = `SELECT * FROM HRMS.comments where employee_id = ${user_id} and date ='${date_ob}'  order by id DESC`;
    try {
        let result = await connection.execute(qry_show);
      
        res.render("index", { result: result[0], name: name, attendance: executeAttendance[0], activity: executeActivity, breakAns, hasCheckedIn, breakoutAns, activatePage });


    }
    catch (err) {
        return console.log(err);
    }

})

router.get("/hotline", handleLogin, (req, res) => {
    res.render("hotline", { activatePage: "hotline" });
});

module.exports = router;
