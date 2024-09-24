import mysql2 from "mysql2/promise";
import dotenv from "dotenv";
import tables from "./tables.js";

dotenv.config();

// 이 부분은 각자 설정에 맞게 조정
export const conn = mysql2.createPool({
  host: "localhost",
  port: 3301,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  connectionLimit: 10,
});

export default {
  async query(queryString = "", params = []) {
    const [rows] = await conn.execute(queryString, params);
    return rows;
  },
};

export const initDB = async () => {
  for (let [name, sql] of Object.entries(tables)) {
    try {
      await conn.execute(sql);
      console.log(`table ${name} 가 생성되었습니다.`);
    } catch (e) {
      console.error(e);
      console.log(`table ${name}생성 도중 오류가 발생했습니다.`);
    }
  }
};
