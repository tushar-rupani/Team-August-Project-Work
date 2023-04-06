var connection = require("../connection/connection");
const moment = require("moment");

const renderController = async(req, res) => {
    let getAllMessages = "SELECT s.message, b.full_name, s.time FROM sensation s INNER JOIN basic_information b ON b.employee_id = s.emp_id order by s.time";
    try{
        var [executeAllMessage] = await connection.execute(getAllMessages);
    }catch(e){
        console.log(e);
    }
    res.render("sensation", {executeAllMessage})
}

const postMessage = async(req, res) => {
    let message = req.body.message;
    let time = moment().format('HH:mm:ss');
    let currentUser = req.session.user;
    let sqlQuery = `INSERT INTO sensation (emp_id, message, time) VALUES (${currentUser}, '${message}', '${time}')`;
    try{
        let [fireQuery] = await connection.execute(sqlQuery);
    }catch(e){
        console.log(e);
    }
}

const getNameOfUser = async(req, res) => {
    let getNameOfUser = `SELECT full_name FROM basic_information where employee_id = ${req.session.user}`;
    try{
        let [fireUser] = await connection.execute(getNameOfUser);

        res.status(200).json({fireUser});
    }
    catch(e){
        console.log(e);
    }
}

module.exports = {renderController, postMessage, getNameOfUser};