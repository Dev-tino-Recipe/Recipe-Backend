import session from "express-session";
import MySQLStore from "express-mysql-session";
import { conn } from "./connection.js";
import dotenv from "dotenv";

dotenv.config();

const sessionStore = new (MySQLStore(session))({}, conn);

console.log("process.env.SESSION_SECRET", process.env.SESSION_SECRET);

const sessionOption = {
  key: "session_cookie_name",
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: sessionStore,
};

export default session(sessionOption);
