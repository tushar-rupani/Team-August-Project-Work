var connection = require("../connection/connection");

const leavesController = async(req,res) => {
    let id = req.session.user;
    let query = `select * from leave_request where employee_id = "${id}"`;
    try {
        let showquery = await connection.execute(query);
        console.log(showquery);
    res.render('leaves.ejs',{showquery:showquery});

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
    try {
        let insertQuery = await connection.execute(query);
        
    } catch (err) {
        return console.log(err);
    }    
}

const cancelleavesController = async(req,res) => {
    res.render('leaves.ejs');
}



module.exports = {leavesController,addleavesController,cancelleavesController};