const express = require("express");
const app = express();
const mysql = require("mysql2/promise");
const bcrypt = require("bcryptjs");
var connection = require("../connection/connection");
 
app.get("/",  (req, res) => {
    res.render('employee_form.ejs');
});

app.post("/insert", async(req, res) => {
    //  for basic info------------------------------------
    // var employee_id = req.query.employee_id;
    // console.log(employee_id);
    var fullname = req.body.name;
    var gender=req.body.gender;
    var dob=req.body.dob;
    var status =req.body.status;
    var wfh=req.body.wfh;

    // for contact info------------------------------------
var current_address=req.body.current_address;
console.log(current_address);
var permanent_address =req.body.permanent_address;
console.log(permanent_address);
var contact= req.body.contact;
console.log(contact);
var emergency_contact =req.body.emergency_contact;
console.log(emergency_contact);
var emergency_person = req.body.emergency_person;
console.log(emergency_person);

// for social information------------------------------------

var tname = req.body.tname;
var gname = req.body.gname;
var lname = req.body.lname;
var fname = req.body.fname;



// query to insert into basic information table------------------------------------
    var basic_query = `UPDATE basic_information SET full_name = '${fullname}', gender ='${gender}', birthdate = '${dob}', marital_status = '${status}',allowed_wfh = '${wfh}' WHERE employee_id = 1`;
    const execute_basic = await connection.execute(basic_query);
    console.log(execute_basic[0]);

// query to insert into contact information table------------------------------------
 var contact_query = `UPDATE contact_information SET current_address = '${current_address}',permenant_address = '${permanent_address}',contact_no = '${contact}',emergency_contact ='${emergency_contact}',emergency_person_name = '${emergency_person}' WHERE employee_id = 1`;
 const execute_contact = await connection.execute(contact_query);
    console.log(execute_contact[0]);

// query to insert into social information table------------------------------------

var social_query = `UPDATE social_information SET twitter = '${tname}', facebook = '${fname}', linkedin = '${lname}',github = '${gname}' WHERE employee_id=1`;
console.log(social_query);
const execute_social = await connection.execute(social_query);
console.log(execute_social[0]);
});




module.exports = app;