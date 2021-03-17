const mysql = require("mysql");

let db;

function initializeConnection(){
    db = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "todo",
      });

      db.connect((err) => {
        if (err) {
          console.log(err);
        } else {
          console.log("Connected!!!");
        }
      });
}

function getConnection(){
    if(!db){
        initializeConnection();
    }
    return db;
}

module.exports = {
    conn: getConnection()
}