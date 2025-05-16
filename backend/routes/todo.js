const express = require('express');
const router = express.Router();
const authenticateJWT = require('../middleware/auth');
const db = require('../db');

/**
 * @swagger
 * tags:
 *   - name: ToDoのCRUD操作
 *     description: ToDoの作成・取得・更新・削除を行うエンドポイント
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 * 
 * security:
 *   - BearerAuth: []
 *
 * @swagger
 * /todos:
 *   get:
 *     tags:
 *       - ToDoのCRUD操作
 *     summary: ToDo一覧取得（認証が必要）
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: 成功時にToDoリストを返す
 *       401:
 *         description: 認証トークンなし
 *       403:
 *         description: 無効なトークン
 */

router.get('/todos', authenticateJWT, (req, res) => {
    const userId = req.user.id;

    db.query(
      'SELECT * FROM todos WHERE user_id = ?',
      [userId],
      (err, results) => {
        if (err) {
          console.error('データ取得エラー:', err);
          return res.status(500).json({ error: 'データ取得エラー' });
        }
        res.json(results);
      }
    );
  });

  /**
 * @swagger
 * /todos:
 *   post:
 *     tags:
 *       - ToDoのCRUD操作
 *     summary: ToDoを作成（認証必要）
 *     description: 認証が必要なエンドポイント。JWTトークンを含める必要があります。
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "新しいタスク"
 *             required:
 *               - title
 *     responses:
 *       200:
 *         description: ToDoの作成成功
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 title:
 *                   type: string
 *       400:
 *         description: 必須パラメータが不足
 *       401:
 *         description: 認証トークンが無効
 *       500:
 *         description: サーバーエラー
 */

router.post('/todos', authenticateJWT, (req, res) => {
    const { title } = req.body;
    const userId = req.user.id; // JWTから取得
  
    db.query(
      'INSERT INTO todos (title, completed, user_id) VALUES (?, ?, ?)',
      [title, false, userId],
      (err, results) => {
        if (err) {
          console.error('ToDo作成エラー:', err);
          return res.status(500).json({ error: 'ToDo作成エラー' });
        }
        res.status(201).json({ id: results.insertId, title, completed: false });
      }
    );
  });

/**
 * @swagger
 * /todos/{id}:
 *   put:
 *     tags:
 *       - ToDoのCRUD操作
 *     summary: ToDoを更新（認証必要）
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: 更新するToDoのID
 *         schema:
 *           type: integer
 *     requestBody:
 *       description: 更新するToDoの内容
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               completed:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: ToDoの更新に成功
 *       401:
 *         description: 認証エラー（トークンが無効）
 *       404:
 *         description: 対象のToDoが見つからない、またはユーザーに権限がない
 */

router.put('/todos/:id', authenticateJWT, (req, res) => {
    const todoId = req.params.id;
    const { title, completed } = req.body;
    const userId = req.user.id;
  
    db.query(
      'UPDATE todos SET title = ?, completed = ? WHERE id = ? AND user_id = ?',
      [title, completed, todoId, userId],
      (err, results) => {
        if (err) {
          console.error('更新エラー:', err);
          return res.status(500).json({ error: '更新エラー' });
        }
        if (results.affectedRows === 0) {
          return res.status(404).json({ message: 'ToDoが見つからないか、権限がありません' });
        }
        res.json({ message: '更新成功' });
      }
    );
  });

/**
 * @swagger
 * /todos/{id}:
 *   delete:
 *     tags:
 *       - ToDoのCRUD操作
 *     summary: ToDoを削除（認証必要）
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: 削除成功
 */

router.delete('/todos/:id', authenticateJWT, (req, res) => {
    const todoId = req.params.id;
    const userId = req.user.id;
  
    db.query(
      'DELETE FROM todos WHERE id = ? AND user_id = ?',
      [todoId, userId],
      (err, results) => {
        if (err) {
          console.error('削除エラー:', err);
          return res.status(500).json({ error: '削除エラー' });
        }
        if (results.affectedRows === 0) {
          return res.status(404).json({ message: 'ToDoが見つからないか、権限がありません' });
        }
        res.json({ message: '削除成功' });
      }
    );
  });


module.exports = router;
