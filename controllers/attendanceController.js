var connection = require("../connection/connection");

const attendanceController = async(req,res) => {
    let id = req.session.user;
    let query = `select * from attendence_manager where employee_id = "${id}"`;
    try {
        let showquery = await connection.execute(query);
        //console.log(showquery);
    res.render('attendance.ejs',{showquery:showquery});

    }
    catch(err) {
        return console.log(err);
    }
}
module.exports = {attendanceController}