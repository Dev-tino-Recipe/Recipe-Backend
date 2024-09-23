import { v4 as generate_uuid } from "uuid";
import conn from "../connection/connection.js";
import { hashPassword } from "../utils/passwordHash.js";

export default {
  signUp: async (user_name, password) => {
    const uuid = generate_uuid();
    const pwd = await hashPassword(password);
    const res = await conn.query(
      `
            INSERT INTO Users
            (
            user_id,
            user_name,
            password
            )
            VALUES(
                ?,
                ?,
                ?
            )
        `,
      [String(uuid), user_name, pwd],
    );
    return res;
  },
  findByUserName: async (user_name) => {
    const rows = await conn.query(`SELECT * FROM Users WHERE User_Name = ?`, [
      user_name,
    ]);
    return rows;
  },

  userByCredentials: async (user_id) => {
    console.log();
    const credentials = await conn.query(
      `SELECT * 
                                                        FROM Users 
                                                        where User_Name = ?`,
      [user_id],
    );
    return credentials;
  },

  updateSessionId: async (user_id, session_id) => {
    await conn.query(
      `update user
                                    SET session_id = ?
                                    where user_id = ?`,
      [user_id, session_id],
    );
  },
};
