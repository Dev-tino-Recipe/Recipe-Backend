import { v4 as generate_uuid } from "uuid";
import conn from "../connection/connection.js";
import { hashPassword } from "../utils/passwordHash..js";

export default {
  signUp: async (user_name, password) => {
    const uuid = generate_uuid();
    const pwd = hashPassword(password);
    const res = await conn.query(
      `
            INSERT INTO Users
            (
            user_id,
            user_name,
            password,
            session_id
            )
            VALUES(
                ?,
                ?,
                ?,
                "" 
            )
        `,
      [uuid, user_name, pwd],
    );
    return res;
  },
  findByUserName: async (user_name) => {
    const rows = await conn.query(`SELECT * FROM Users WHERE User_Name = ?`, [
      user_name,
    ]);
    return rows;
  },
  findByUserId: async (user_id) => {
    const rows = await conn.query(`SELECT * FROM Users WHERE user_id = ?`, [
      user_id,
    ]);
    return rows;
  },
};
