require('dotenv').config();          // .env から環境変数を読み込む

console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
console.log('DB_NAME:', process.env.DB_NAME);

const express = require('express');  // Express.js（Webサーバー）
const mysql = require('mysql2');     // MySQL2（DB操作）
const cors = require('cors');        // CORS（フロントエンドとの通信用）


const app = express();
const PORT = process.env.PORT || 3000; // 環境変数がなければ3000番を使用

app.use(express.json()); // JSON データを受け取るためのミドルウェア
app.use(cors()); // フロントエンドからのアクセスを許可

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// データベース接続の確認
db.connect(err => {
  if (err) {
    console.error('MySQL接続エラー:', err);
  } else {
    console.log('MySQLに接続成功！');
  }
});

app.get('/todos', (req, res) => {
  db.query('SELECT * FROM todos', (err, results) => {
    if (err) {
      console.error('データ取得エラー:', err);
      res.status(500).json({ error: 'データ取得エラー' });
    } else {
      res.json(results);
    }
  });
});

app.post('/todos', (req, res) => {
  const { title } = req.body; // リクエストのJSONからタイトルを取得

  if (!title) {
    return res.status(400).json({ error: 'タイトルは必須です' });
  }

  db.query('INSERT INTO todos (title) VALUES (?)', [title], (err, result) => {
    if (err) {
      console.error('データ追加エラー:', err);
      res.status(500).json({ error: 'データ追加エラー' });
    } else {
      res.json({ id: result.insertId, title });
    }
  });
});


app.put('/todos/:id', (req, res) => {
  const { id } = req.params; // URL の ID を取得
  const { title } = req.body;

  db.query('UPDATE todos SET title = ? WHERE id = ?', [title, id], (err, result) => {
    if (err) {
      console.error('更新エラー:', err);
      res.status(500).json({ error: '更新エラー' });
    } else {
      res.json({ message: '更新成功', id, title });
    }
  });
});

app.delete('/todos/:id', (req, res) => {
  const { id } = req.params;

  db.query('DELETE FROM todos WHERE id = ?', [id], (err, result) => {
    if (err) {
      console.error('削除エラー:', err);
      res.status(500).json({ error: '削除エラー' });
    } else {
      res.json({ message: '削除成功', id });
    }
  });
});

app.listen(PORT, () => {
  console.log(`サーバー起動: <http://localhost>:${PORT}`);
});
