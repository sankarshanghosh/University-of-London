const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "myBookshop"
});

db.connect(err => {
  if (err) {
    console.error('Connection error: ', err);
    return;
  }
  console.log('Connected to database');
});
