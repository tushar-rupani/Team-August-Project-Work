const express = require("express");
const app = express();
const mysql = require("mysql2/promise");
const bcrypt = require("bcryptjs");
var connection = require("../connection/connection");


app.get("/", (req, res) => {
    res.render("register")
})


app.post("/register", async(req, res) => {
    let {email, password} = req.body;
    password = await bcrypt.hash(password, 10);
    const sqlQuery = `INSERT INTO register (email, password) VALUES('${email}', '${password}')`;
    const executeInsert = await connection.execute(sqlQuery);
    let lastInsertId = executeInsert[0].insertId;
    if(executeInsert){
        
    }
})

app.post("/check-user-email", async (req, res) => {
    let getEmail = req.body.email;
    let sqlQuery = `SELECT * FROM register where email = '${getEmail}'`;
    let results = await connection.execute(sqlQuery);
    if (results[0].length) {
        return res.json({ status: "exist" })
    }
    else {
        return res.json({ status: "not" })
    }
})


module.exports = app;