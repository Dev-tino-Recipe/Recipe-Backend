import { v4 as generate_uuid } from "uuid";
import conn from "../db/connection.js";
import { hashPassword } from "../utils/passwordHash.js";

export default {
  signUp: async (user_name, password) => {
    const uuid = generate_uuid();
    const pwd = await hashPassword(password);
    const res = await conn.query(
      `
            INSERT INTO Users
            (user_id,
             user_name,
             password)
            VALUES (?,
                    ?,
                    ?)
        `,
      [String(uuid), user_name, pwd],
    );
    return res;
  },
  findByUserName: async (user_name) => {
    console.log("user_name", user_name);

    const rows = await conn.query(
      `
          SELECT *
          FROM Users
          WHERE user_name = ?`,
      [user_name],
    );
    return rows[0];
  },

  userByCredentials: async (user_name) => {
    const credentials = await conn.query(
      `SELECT *
         FROM Users
         where User_Name = ?`,
      [user_name],
    );
    console.log(credentials);
    return credentials;
  },

  updateSessionId: async (user_id, session_id) => {
    await conn.query(
      `update users
         SET session_id = ?
         where user_id = ?`,
      [session_id, user_id],
    );
  },

  clearUserSessionId: async (user_id) => {
    await conn.query(
      `update users
         SET session_id = NULL
         WHERE user_id = ?`,
      [user_id],
    );
  },
};
