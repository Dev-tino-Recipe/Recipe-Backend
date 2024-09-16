import mysql from "mysql2/promise";

// 이 부분은 각자 설정에 맞게 조정
const conn = mysql.createPool({
    host : "127.0.0.1",
    port: 3306,
    user : process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database : process.env.DB_DATABASE,
});

export default{
    async query(queryString = "", params = []){
        const [rows,] = await conn.execute(queryString, params);
        return rows;
    }
}