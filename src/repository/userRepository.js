import {v4 as uuid} from "uuid";
import conn from "../db/connection.js";
import {hash} from "../utils/auth.js";

export default {
  createUser: async (username, password) => {
    const hashedPassword = await hash(password);
    const sql = `
        INSERT INTO users(userId, username, password)
        VALUES (?, ?, ?)
    `
    await conn.query(sql, [uuid(), username, hashedPassword]);
  },

  findByUserId: async (userId) => {
    const sql = `
        SELECT *
        from users
        where userId = ?
    `
    return (await conn.query(sql, [userId]))[0];
  },

  findByUsername: async (username) => {
    const sql = `
        SELECT *
        FROM Users
        WHERE username = ?
    `
    return (await conn.query(sql, [username]))[0];
  },

  findByUsernameAndPassword: async (username, password) => {
    const sql = `
        select *
        from users
        where username = ?
          and password = ?
    `
    return (await conn.query(sql, [username, await hash(password)]))[0];
  },

  updateSessionIdByUserId: async (userId, sessionId) => {
    const sql = `
        update users
        SET sessionId = ?
        where userId = ?
    `
    await conn.query(sql, [sessionId, userId]);
  },

  clearSessionId: async (userId) => {
    const sql = `
        update users
        SET sessionId = NULL
        WHERE userId = ?
    `
    await conn.query(sql, [userId]);
  },
};
