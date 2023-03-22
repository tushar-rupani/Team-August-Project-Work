const express = require("express");
const app = express();
const mysql = require("mysql2/promise");
const bcrypt = require("bcryptjs");
var connection = require("../connection/connection");

app.get("/", async (req, res) => {

 
var query = `SELECT basic_information.full_name,leave_request.leave_date,leave_request.leave_reason,leave_request.leave_type,leave_request.half_day FROM basic_information  INNER JOIN leave_request  ON basic_information.employee_id = leave_request.employee_id;`;
var result = await connection.execute(query);
 
 
console.log(result);
    res.render('leaveadmin.ejs' ,{result:result[0]});
 });
 


module.exports = app;