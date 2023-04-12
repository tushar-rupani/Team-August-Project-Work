const moment = require("moment");
var connection = require("../connection/connection");
const {
    checkIfUserIsonBreak,
    checkIfUserIsBreakedOut,
} = require("../controllers/activity.controller");

const dateformat = require('date-fns');


const renderHome = async (req, res) => {
    let emp_id = req.session.user;
    let check_emp_details = `select * from basic_information where employee_id = '${emp_id}'`;
    try {
        let [hasData] = await connection.execute(check_emp_details);
        if (hasData.length === 0) {
            return res.redirect("/employee-form")
        }

    } catch (e) {
        console.log(e);
    }


    let name;
    let user_id = req.session.user;
    let currentDate = moment().format("YYYY-MM-DD");
    let breakAns = await checkIfUserIsonBreak(user_id);
    let breakoutAns = await checkIfUserIsBreakedOut(user_id);
    let hasCheckedIn = false;
    var forgotLastTime = false;

    var executeAttendance, executeActivity;
    try {
        let getAttendanceDetails = `SELECT * FROM attendence_manager where employee_id = ${user_id} and date = '${currentDate}'`;
        [executeAttendance] = await connection.execute(getAttendanceDetails);

        if (executeAttendance.length != 0) {
            hasCheckedIn = true;
        }
        const startOfMonth = moment().startOf('month').format('YYYY-MM-DD');
        const endOfMonth = moment().endOf('month').format('YYYY-MM-DD');

        let getActivityDetails = `SELECT * FROM break_manager where employee_id = ${user_id} and created_date = '${currentDate}'`;
        [executeActivity] = await connection.execute(getActivityDetails);

        let hasUserCheckedOutQuery = `SELECT check_out FROM attendence_manager where employee_id = ${user_id} and date = '${currentDate}'`;
        let [hasUserCheckedOut] = await connection.execute(hasUserCheckedOutQuery);
        var checked_out = "not";

        let usersAttendance = `SELECT count(id) as attendance from attendence_manager WHERE employee_id = ${user_id} and date BETWEEN '${startOfMonth}' AND '${endOfMonth}'`;
        let [executeAttendanceDays] = await connection.execute(usersAttendance);
        var attendanceDays = executeAttendanceDays[0].attendance;

        let lateDays = `SELECT count(id) as late from attendence_manager WHERE employee_id = ${user_id} and is_late = 1`;
        let [executeLateDays] = await connection.execute(lateDays);
        var lateDaysCount = executeLateDays[0].late;

      

        let totalHoursWorked = `SELECT SEC_TO_TIME(SUM(TIME_TO_SEC(hours_worked))) AS hours_worked
          FROM attendence_manager
          WHERE date BETWEEN '${startOfMonth}' AND '${endOfMonth}' and employee_id = ${user_id}`;

        let [executeTotalHoursWorked] = await connection.execute(totalHoursWorked);
        var hoursWorked = executeTotalHoursWorked[0].hours_worked;
        if (hoursWorked) {
            hoursWorked = hoursWorked.split(":").slice(0, 2).join(":");
        }
        if (hasUserCheckedOut.length) {
            if (hasUserCheckedOut[0].check_out != "0") {
                checked_out = "checkout";
            }
        }

        let getLastRow = `SELECT check_out FROM attendence_manager where employee_id = ${user_id} and date != '${currentDate}' order by id desc LIMIT 1`;
        let [executeForgot] = await connection.execute(getLastRow);
        if (executeForgot.length) {
            let getLastCheckout = executeForgot[0].check_out;

            if (getLastCheckout == "0") {
                forgotLastTime = true;
            }
        }
        let qry_show = `SELECT * FROM comments where employee_id = ${user_id} and date ='${currentDate}' order by id DESC`;
        var [commentResult] = await connection.execute(qry_show);


        let absentDays = `SELECT count(id) as leave_length FROM leave_request where employee_id = ${user_id} and leave_status = 'accepted'`;
        var [executeAbsent] = await connection.execute(absentDays);

        let halfDays = `SELECT count(id) as half_length FROM leave_request where employee_id = ${user_id} and leave_status = 'accepted' and half_day = 1`;
        var [executeHalf] = await connection.execute(halfDays);

    } catch (e) {
        console.log(e);
    }
    name = "dummy";
    let activatePage = "home";
    res.render("index", {
        name: name,
        attendance: executeAttendance[0],
        hoursWorked,
        attendanceDays,
        lateDaysCount,
        activity: executeActivity,
        breakAns,
        hasCheckedIn,
        breakoutAns,
        activatePage,
        checked_out,
        commentResult,
        forgotLastTime,
        executeAbsent,
        executeHalf
    });
}

const renderLogs = async (req, res) => {
    let currentDate = moment().format("YYYY-MM-DD");
    let getDailyLogs = `
          select full_name, activity, date, time from daily_logs d 
          INNER JOIN basic_information b
          ON b.employee_id = d.employee_id
          where date = '${currentDate}'
          order by time desc`;
    try {
      var [executeDailyLogs] = await connection.execute(getDailyLogs);
    } catch (e) {
      console.log(e);
    }
  
    return res.status(200).json({ logs: executeDailyLogs });
  }

const editForm = async (req, res) => {

    let con = await connection.getConnection();

    try {
        let ID = Number(req.session.user);

        let basic_details = await con.execute(`select employee_id,full_name,gender,birthdate,marital_status,allowed_wfh,profile_pic from basic_information where employee_id=${ID}`);
        let contact_info = await con.execute(`select contact_no,emergency_contact,emergency_person_name,permenant_address,current_address from contact_information where employee_id=${ID}`);
        let company_relation = await con.execute(`select designation,department,join_date,probation_date from company_relation where employee_id=${ID}`);
        let social = await con.execute(`select twitter,linkedin,github,facebook from social_information where employee_id=${ID}`);
        let document_info = await con.execute(`select aadhar_no,pancard_no,cheque_no,aadhar_path, pancard_path, cheque_path,resume_path from documents where employee_id=${ID}`);
        let email = await con.execute(` select email from register where id=${ID}`);

        var bdate = dateformat.format(new Date(basic_details[0][0].birthdate), 'dd/MM/yyyy');
        var join_date = dateformat.format(new Date(company_relation[0][0].join_date), 'dd/MM/yyyy');
        console.log(join_date);
        var prob_date = dateformat.format(new Date(company_relation[0][0].probation_date), 'dd/MM/yyyy');

        var gender = ['male', 'female', 'other'];
        var status = ['Married', 'Unmarried'];


        console.log(basic_details[0][0]);
        res.render('edit-form', {
            basic_details, contact_info, company_relation, document_info, social, email, bdate, gender, status, join_date, prob_date

        })
        await con.commit();



    } catch (err) {
        if (con) {
            await con.rollback();
        }
        console.log(err);
        res.status(500).json({ msg: "Somethig went wrong", status: 500 });
    } finally {
        if (con) {
            con.release();
        }
    }


}

const forgotCheckout = async(req, res) => {
    let id = req.session.user;
    console.log(req.body);
    let {checkInTime, checkOutTime} = req.body;
    let queryForAddForgot = `INSERT into forgot_details(employee_id, check_out_time, check_in_time) VALUES(${id}, '${checkOutTime}', '${checkInTime}')`;
    try{
        let [executeForgot] = await connection.execute(queryForAddForgot);
        if(executeForgot){
            return res.status(200).json({ans: "success", msg: "We will update your time accordingly."})
        }
    }catch(e){
        console.log(e);
        return res.status(400).json({ans: "error", msg: "Something went wrong, sorry!"})
    }
    
}

module.exports = {renderHome, renderLogs, editForm, forgotCheckout};