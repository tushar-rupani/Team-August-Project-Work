var connection = require("../connection/connection");
const moment = require("moment");

const renderController = async(req, res) => {
    let getAllMessages = "SELECT s.message, b.full_name, s.time, b.profile_pic, s.image FROM sensation s INNER JOIN basic_information b ON b.employee_id = s.emp_id order by s.time";
    try{
        var [executeAllMessage] = await connection.execute(getAllMessages);
    }catch(e){
        console.log(e);
    }
    res.render("sensation", {executeAllMessage, activatePage: "sensation"})
}

const postMessage = async(req, res) => {
    let filename;
    if(req.files.length){
        filename = req.files[0].filename;
    }
    let message = req.body.message;
    let time = moment().format('YYYY-MM-DD HH:mm:ss');
    let currentUser = req.session.user;
    let sqlQuery;
    if(filename){
        sqlQuery = `INSERT INTO sensation (emp_id, message, time, image) VALUES (${currentUser}, '${message}', '${time}', '${filename}')`;
    }else{
        sqlQuery = `INSERT INTO sensation (emp_id, message, time) VALUES (${currentUser}, '${message}', '${time}')`;
    }
    try{
        let [fireQuery] = await connection.execute(sqlQuery);
        console.log(fireQuery);
        let getSelectQuery = `SELECT * from sensation where id = ${fireQuery.insertId}`;
        let [executeSelect] = await connection.execute(getSelectQuery);
        return res.json(executeSelect);
    }catch(e){
        console.log(e);
    }
}

const getNameOfUser = async(req, res) => {
    let getNameOfUser = `SELECT full_name, profile_pic FROM basic_information where employee_id = ${req.session.user}`;
    try{
        let [fireUser] = await connection.execute(getNameOfUser);

        res.status(200).json({fireUser});
    }
    catch(e){
        console.log(e);
    }
}

const renderVideoChat = async(req, res) => {
    res.redirect("https://espark-vidchat-by-tushar.netlify.app/lobby.html")
}

module.exports = {renderController, postMessage, getNameOfUser, renderVideoChat};