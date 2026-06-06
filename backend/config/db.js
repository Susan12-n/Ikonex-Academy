const mysql = require("mysql2");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "Ikonex"
});

db.connect(err => {
    if(err){
        console.log(err);
    }else{
        console.log("Database Connected successfully");
    }
});

module.exports = db;