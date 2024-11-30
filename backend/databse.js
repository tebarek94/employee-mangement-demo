import mysql from "mysql2";
// Create a connection to the MySQL database
const db = mysql.createConnection({
  host: "localhost", // your MySQL host, usually 'localhost'
  user: "root", // your MySQL username
  password: "Mahi_1993", // your MySQL password (leave empty if none)
  database: "employee", // the database you want to connect to
});
export default db;
