var connection = require("../connection/connection");
const moment = require("moment");
   let currentTime = moment();
   let currentDate = moment().format("YYYY-MM-DD");
   let tenAM = moment("10:00:00", "HH:mm:ss");
   let isLate = 0;


const checkInHandler = async (req, res) => {  
   
   let time = moment().format("HH:mm:ss");
   if (currentTime.isAfter(tenAM)) {
      isLate = 1;
   }
   let currentEmployee = req.session.user;


   let checkIfalreadyExist = `SELECT * FROM attendence_manager where employee_id = ${currentEmployee} and date = '${currentDate}'`;

   try{
      let [executeAlreadyExists] = await connection.execute(checkIfalreadyExist);
      if(executeAlreadyExists.length){
         return;
      }
   }catch(e){
      console.log(e);
   }
   let insertQuery = `INSERT INTO attendence_manager (employee_id, check_in, date, is_late) VALUES (${currentEmployee}, '${time}', '${currentDate}', ${isLate})`;

   try{
      let [executeInsert] = await connection.execute(insertQuery);
      return res.json({status: "DONE", checkInTime: time})
      
   }
   catch(e){
      console.log(e);
   }
}


const checkOutHandler = async (req, res) => {
   let currentEmployee = req.session.user;

   let checkIfalreadyExist = `SELECT count(*) as length FROM attendence_manager where employee_id = ${currentEmployee} and date = '${currentDate}' and check_out <> 0`;
   try{
      let [executeAlreadyExists] = await connection.execute(checkIfalreadyExist);
      if(executeAlreadyExists[0].length != 0){
         return;
      }
   }catch(e){
      return console.log(e);
   }

   let time = moment().format("HH:mm:ss");
   let updateQuery = `UPDATE attendence_manager SET check_out = '${time}' where employee_id = ${currentEmployee}`;

   try{
      let [executeUpdateQuery] = await connection.execute(updateQuery);
      if(executeUpdateQuery){
         return res.json({status: "DONE", checkOutTime: time});
      }
   }catch(e){
      console.log(e);
      return res.json({status: "ERROR"});
   }
   
}


const breakInHandler = async (req, res) => {
   let currentEmployee = req.session.user;
   
   let time = moment().format("HH:mm:ss");
   
   let insertQueryForBreak = `INSERT INTO break_manager (employee_id, break_in) VALUES (${currentEmployee}, '${time}')`;
   
   try{
      let [executeInsertForBreak] = await connection.execute(insertQueryForBreak);
      
      if(executeInsertForBreak){
         return res.json({status: "DONE", breakInTime: time});
      }
   }
   catch(e){
      console.log(e);
      return res.json({status: "ERROR"});
   }

}

const breakOutHander = async (req, res) => {
   let currentEmployee = req.session.user;
   let getLastDataofUser = `SELECT * FROM break_manager where employee_id = ${currentEmployee} order by id desc LIMIT 1`;

   try{
      let [executeForLastData] = await connection.execute(getLastDataofUser);
      let returnedData = executeForLastData[0];
      let breakedInTime = returnedData.break_in;
      var startTime = moment(breakedInTime, "hh:mm:ss");
      var currentTime = moment();
      var hoursDiff = currentTime.diff(startTime, "hours");
      var minsDiff = currentTime.diff(startTime, "minutes");

      console.log(minsDiff, hoursDiff);

   }catch(e){
      console.log(e)
   }
}
module.exports = {checkInHandler, checkOutHandler, breakInHandler, breakOutHander}
