"use strict";

const mysql = require("mysql");

const pool = mysql.createPool({
    connectionLimit: 10,
    host: "localhost",
    user: "utilisateur",
    password: "admin",
    database: "todo"
});


module.exports = pool;
