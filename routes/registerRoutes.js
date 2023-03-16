const express = require("express");
const app = express();
const mysql = require("mysql2/promise");
const bcrypt = require("bcryptjs");
const connection = mysql.createPool(
    {
        host: 'localhost',
        user: 'root',
        database: 'HRMS',
        password: 'root'

    }
)
app.get("/", (req, res) => {
    res.render("register")
})

app.post("/register", async(req, res) => {
    // Code for generating a user ID
    const getCount = await connection.execute("SELECT count(*) as count from register");
    let idCount = getCount[0][0].count + 1;
    console.log(idCount);
    let id = "EMP" + idCount

    let {email, password} = req.body;
    password = await bcrypt.hash(password, 10)

    //inserting employee into database
    const sqlQuery = `INSERT INTO register (id, email, password) VALUES('${id}', '${email}', '${password}')`;
    const executeInsert = await connection.execute(sqlQuery);


})


module.exports = app;