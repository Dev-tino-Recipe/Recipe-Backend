import session from "express-session";
import { options, conn } from "../connection/connection.js";
import MySQLStore from "express-mysql-session";

const MySQLStoreSession = MySQLStore(session);

export const sessionStore = new MySQLStoreSession(options);
