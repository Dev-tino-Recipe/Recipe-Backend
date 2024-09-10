import {generate_uuid} from "../connection/uuid.js";
import conn from  "../connection/connection.js";
import {hashPassword} from "../connection/passwordHash..js";

export default{
    singUp: async (user_name, password) => {
        const uuid = generate_uuid();
        const pwd = hashPassword(password);
        const res = await conn.query(`
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
        `, [uuid, user_name, pwd]);
        return res;
    },
    findByUserName: async (user_name) => {
        const rows = await conn.query(`SELECT * FROM Users WHERE User_Name = ?`, [user_name]);
        return rows;
    }
}