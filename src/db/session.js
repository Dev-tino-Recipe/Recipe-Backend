import session from "express-session";
import MySQLStore from "express-mysql-session";
import {conn} from "./connection.js";
import dotenv from "dotenv";

dotenv.config();

const sessionStore = new (MySQLStore(session))({}, conn);

console.log("process.env.SECRET_KEY", process.env.SECRET_KEY);

const sessionOption = {
  key: "session_cookie_name",
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: false,
  store: sessionStore,
};

export default session({
  ...sessionOption,
  cookie: {
    httpOnly: true,
    secure: false,
    maxAge: 1000 * 60 * 60 * 24 * 7,
    sameSite: "Lax",
  }
});
