import mysql from "mysql2/promise";

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    connectionLimit: 5,
    waitForConnections: true,
    queueLimit: 0,
    ssl: {
        rejectUnauthorized: false
    },
    connectTimeout: 60000
});

export async function query(sql, params) {
    try {
        let conn;
        conn = await pool.getConnection();
        const [rows] = await conn.execute(sql, params);
        return rows;
    } catch (error) {
        console.error(error);
        throw error;
    } finally {
        if (conn) conn.release();
    }
}












// import mariadb from "mariadb";
// 
// const pool = mariadb.createPool({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME,
//     connectionLimit: 5,
//     ssl: {
//         rejectUnauthorized: false
//     },
//     connectTimeout: 60000
// });
// 
// export async function query(sql, params) {
//     let conn;
//     try {
//         conn = await pool.getConnection();
//         const result = await conn.query(sql, params);
//         return result;
//     } catch (error) {
//         console.error(error);
//         throw error;
//     } finally {
//         if (conn) conn.release();
//     }
// }