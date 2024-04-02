import mariadb from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

const pool = mariadb.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: "KosherM"
}).promise();


pool.getConnection()
    .then(connection => {
        console.log("Connected to mariadb");
        connection.release();
    }).catch(err => {
        console.error("Error connecting to database:", err);
    });

async function listAllUsers() {
    const [rows] = await pool.query(`SELECT Users.*, Roles.Name FROM Users JOIN Roles ON Users.RoleId = Roles.Id`);
    return rows;
}
const result = await listAllUsers();
console.log(result);