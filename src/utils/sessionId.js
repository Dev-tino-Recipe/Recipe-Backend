import session from "express-session";
import conn from "../connection/connection.js";
import MySQLStore from 'express-mysql-session';

const MySQLStoreSession = MySQLStore(session);

export const sessionStore = new MySQLStoreSession(
  {
    expiration: 60, // 세션 만료 시간
    createDatabaseTable: true, // 세션 테이블 자동 생성
    schema: {
      tableName: "sessions",
      columnNames: {
        session_id: "session_id",
        expires: "expires",
        data: "data",
      },
    },
  },
  conn,
);