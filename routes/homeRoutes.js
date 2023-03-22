const express = require("express");
const router=express.Router();
const moment = require("moment");
const jwt=require("jsonwebtoken");
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
    let hasCheckedIn = false;
    var executeAttendance, executeActivity;
    try{
        let getAttendanceDetails = `SELECT * FROM attendence_manager where employee_id = ${user_id} and date = '${currentDate}'`;
        [executeAttendance] = await connection.execute(getAttendanceDetails);

        if(executeAttendance.length != 0 ){
            hasCheckedIn = true;
        }

        let getActivityDetails = `SELECT * FROM break_manager where employee_id = ${user_id} and created_date = '${currentDate}'`;
        [executeActivity] = await connection.execute(getActivityDetails);

        let hasUserCheckedOutQuery = `SELECT check_out FROM attendence_manager where employee_id = ${user_id} and date = '${currentDate}'`;
        let [hasUserCheckedOut] = await connection.execute(hasUserCheckedOutQuery);
        var checked_out = "not";
        if(hasUserCheckedOut.length){
            if(hasUserCheckedOut[0].check_out != "0"){
                checked_out = "checkout";
            }
        } 

    }catch(e){
        console.log(e);
    }
    name = "dummy"
    let activatePage = "home"
    res.render("index", {name: name, attendance: executeAttendance[0], activity: executeActivity, breakAns, hasCheckedIn, breakoutAns, activatePage, checked_out});
})

router.get("/logs", handleLogin, async (req, res) => {
    let currentDate = moment().format("YYYY-MM-DD");
    let getDailyLogs = `
        select full_name, activity, date, time from daily_logs d 
        INNER JOIN basic_information b
        ON b.employee_id = d.employee_id
        where date = '${currentDate}'
        order by time desc`;
        try{
            var [executeDailyLogs] = await connection.execute(getDailyLogs);

        }catch(e){
            console.log(e);
        }

        return res.status(200).json({logs: executeDailyLogs});
    })

router.get("/hotline", handleLogin, (req, res) => {
    res.render("hotline",{activatePage:"hotline"});
});

router.get('/get-user',handleLogin,async (req, res) => {

    let user = jwt.verify(req.cookies.user,"JWT_SECRET");

    try {
        
        let query=`select * from basic_information where employee_id=${user}`;

        let [[user_data]]=await connection.execute(query);

        return res.status(200).json({msg:"done",user_data})    

    } catch (err) {
        console.log(err);
        return res.redirect("/"); 
    }

    

})

module.exports = router;