import mysql2 from "mysql2";
import session from "express-session";
import MySQLStore from "express-mysql-session";

const sessionConn = mysql2.createPool({
  host: "127.0.0.1",
  port: 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  connectionLimit: 10,
});

const sessionStore = new (MySQLStore(session))({}, sessionConn);

export default sessionStore;
