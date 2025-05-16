require('dotenv').config();          //.env から環境変数を読み込む

console.log('環境変数の読み込み完了');

const express = require('express');  //Webサーバー
const mysql = require('mysql2');     //DB操作
const cors = require('cors');        //フロントエンドとの通信用
const bcrypt = require('bcryptjs'); //パスワードのハッシュ化
const db = require('./db');
const swaggerSetup = require("./swagger");
const todoRoutes = require('./routes/todo');//ToDo関連のルート
const authRoutes = require('./routes/auth');//認証関連のルート
const app = express();
const PORT = process.env.PORT || 3001; //環境変数がなければ3000番を使用

app.use(express.json()); // JSONデータを受け取るためのミドルウェア
app.use(cors()); // フロントエンドからのアクセスを許可

swaggerSetup(app);

app.use('/', todoRoutes);// ルーティングの適用
app.use('/', authRoutes);

// データベース接続
db.connect(err => {
  if (err) {
    console.error('MySQL接続エラー:', err);
    process.exit(1);
  }
  console.log('MySQLに接続成功！');
});

app.listen(PORT, () => {
  console.log(`サーバー起動: http://localhost:${PORT}`);
});

