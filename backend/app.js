require('dotenv').config();          
console.log('環境変数の読み込み完了');

const express = require('express');      
const cors = require('cors');         
const db = require('./db');
const swaggerSetup = require("./swagger");
const todoRoutes = require('./routes/todo');
const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 3001; 

app.use(express.json()); 
app.use(cors());

swaggerSetup(app);

app.use('/', todoRoutes);
app.use('/', authRoutes);


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

