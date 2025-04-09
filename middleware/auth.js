const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.JWT_SECRET;

// 1JWT検証ミドルウェア
const authenticateJWT = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1]; // "Bearer token" の形式

  if (!token) {
      return res.status(401).json({ message: '認証トークンが必要です' });
  }

  try {
      const decoded = jwt.verify(token, SECRET_KEY);
      req.user = decoded; // ユーザー情報をリクエストオブジェクトに格納
      next(); // 次のミドルウェア or ルート処理へ
  } catch (err) {
      return res.status(401).json({ message: '無効なトークンです' });
  }
};


module.exports = authenticateJWT;