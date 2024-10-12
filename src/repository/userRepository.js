import {v4 as uuid} from "uuid";
import conn from "../db/connection.js";
import {hash} from "../utils/auth.js";

export default {
  save: async (username, password, connection) => {
    let userId = uuid();
    const hashedPassword = await hash(password);
    const sql = `
        INSERT INTO users(userId, username, password)
        VALUES (?, ?, ?)
    `
    await conn.query(sql, [userId, username, hashedPassword], connection);
    return userId;
  },

  findById: async (userId, connection) => {
    const sql = `
        SELECT *
        from users
        where userId = ?
    `
    return (await conn.query(sql, [userId], connection))[0];
  },

  findByUsername: async (username, connection) => {
    const sql = `
        SELECT *
        FROM users
        WHERE username = ?
    `
    return (await conn.query(sql, [username], connection))[0];
  },

  findByUsernameAndPassword: async (username, password, connection) => {
    const sql = `
        select *
        from users
        where username = ?
          and password = ?
    `
    return (await conn.query(sql, [username, await hash(password)], connection))[0];
  },

  updateSessionIdByUserId: async (userId, sessionId, connection) => {
    const sql = `
        update users
        SET sessionId = ?
        where userId = ?
    `
    await conn.query(sql, [sessionId, userId], connection);
  },

  clearSessionId: async (userId, connection) => {
    const sql = `
        update users
        SET sessionId = NULL
        WHERE userId = ?
    `
    await conn.query(sql, [userId], connection);
  },
};
