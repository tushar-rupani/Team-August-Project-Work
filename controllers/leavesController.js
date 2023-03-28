var connection = require("../connection/connection");
var moment = require("moment");
const leavesController = async(req,res) => {
    let id = req.session.user;
    let query = `select * from leave_request where employee_id = "${id}"`;
    let query2 = `select leave_date from leave_request where id = '${id}'`;

    try {
        let showquery = await connection.execute(query);
        //console.log(showquery);
        let answer = await connection.execute(query2);
        let ans = answer[0][0].leave_date;
        let date = moment(ans).format('DD/MM/YYYY');
    res.render('leaves.ejs',{showquery:showquery,date:date});

    }
    catch(err) {
        return console.log(err);
    }
}

const addleavesController = async (req,res) => {
    let id = req.session.user;
    //console.log(id);

    let leave_date = req.body.date;
    //console.log(leave_date);
    let leave_type = req.body.type;
    let leave_reason = req.body.reason;
    let leave_day = req.body.day;

    let query = `INSERT INTO leave_request (employee_id,leave_date,leave_type,leave_reason, half_day) VALUES (${id},'${leave_date}',"${leave_type}",'${leave_reason}','${leave_day}')`;
    //console.log(query);
    try {
        let insertQuery = await connection.execute(query);
        
        
    } catch (err) {
        return console.log(err);
    }    
}





module.exports = {leavesController,addleavesController};