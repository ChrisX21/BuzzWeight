import mariadb from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

const pool = mariadb.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
}).promise();

pool.getConnection()
  .then(connection => {
    console.log("Connected to mariadb");
    connection.release();
  }).catch(err => {
    console.error("Error connecting to database:", err);
  });

export async function getUserByEmail(email) {
  const [rows] = await pool.query(`SELECT * FROM Users WHERE Email=?`, [email]);
  return rows[0];
};

export async function getUserById(userId) {
  const [rows] = await pool.query(`SELECT * FROM Users WHERE Id=?`, [userId]);
  return rows[0];
}

export async function createUser(email, password, firstName, lastName, roleId) {
  await pool.query(`INSERT INTO Users VALUES (DEFAULT, ?, ?, ?, ?, ?, DEFAULT)`, [email, password, firstName, lastName, roleId]);
  return getUserByEmail(email);
}

export async function getAllUsers() {
  const [rows] = await pool.query(`SELECT Users.*, Roles.Name FROM Users JOIN Roles ON Users.RoleId = Roles.Id ORDER BY Users.Id`);
  return rows;
}

export async function deleteUser(userId) {
  await pool.query(`DELETE FROM Users WHERE Id=?`, [userId]);
}

export async function editUser(userId, email, password, firstName, lastName, roleId) {
  await pool.query(`UPDATE Users SET Email=?, Password=?, FirstName=?, LastName=?, RoleId=? WHERE Id=?`, [email, password, firstName, lastName, roleId, userId]);
}