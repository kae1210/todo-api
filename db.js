const mysql = require('mysql2');
const SECRET_KEY = process.env.JWT_SECRET; // .env に保存した秘密鍵を dotenv を使って読み込む

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to database');
});

module.exports = db;
