const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const jwt = require('jsonwebtoken');
const db = require('../db');

// POST /register
/**
 * @swagger
 * /register:
 *   post:
 *     summary: 新規ユーザー登録
 *     description: ユーザー名とパスワードを登録し、データベースに保存します。
 *     tags:
 *       - ユーザー登録
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: "testuser"
 *               password:
 *                 type: string
 *                 example: "mypassword"
 *     responses:
 *       200:
 *         description: ユーザー登録成功
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "ユーザー登録成功！"
 *       400:
 *         description: 入力エラー
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "ユーザー名とパスワードを入力してください。"
 *       500:
 *         description: 登録エラー
 */

router.post('/register', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "ユーザー名とパスワードを入力してください。" });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword], (err) => {
        if (err) {
            console.error('DB挿入エラー:', err.sqlMessage); 
            return res.status(500).json({ message: "登録に失敗しました。" });
        }
        res.json({ message: "ユーザー登録成功！" });
    });
});

/**
 * @swagger
 * /login:
 *   post:
 *     summary: ユーザーログイン
 *     description: 登録済みのユーザーがログインし、JWTトークンを取得する。
 *     tags:
 *       - 認証
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: testuser
 *               password:
 *                 type: string
 *                 example: yourpassword
 *     responses:
 *       200:
 *         description: ログイン成功（JWTトークンを返す）
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       401:
 *         description: 認証失敗（ユーザー名またはパスワードが間違っている）
 *       500:
 *         description: サーバーエラー
 */

router.post('/login', (req, res) => {
    const { username, password } = req.body;
  
    
    db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
        if (err || results.length === 0) {
            console.log("ログインエラー: ユーザーが見つかりません");
            return res.status(401).json({ message: "ユーザーが見つかりません。" });
        }

        const user = results[0];

        const isMatch = bcrypt.compareSync(password, user.password);
        if (!isMatch) {
            console.log("ログインエラー: パスワード不一致");
            return res.status(401).json({ message: "パスワードが間違っています。" });
        }

        
        const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ token });
    });
});

module.exports = router;