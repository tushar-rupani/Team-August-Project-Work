const mysql = require("mysql2/promise");
require("dotenv").config();
const connection = mysql.createPool(
    {
        host: 'localhost',
        user: process.env.DB_USER,
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD
    }

)

module.exports = connection;