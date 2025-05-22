const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.JWT_SECRET;


const authenticateJWT = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
      return res.status(401).json({ message: '認証トークンが必要です' });
  }

  try {
      const decoded = jwt.verify(token, SECRET_KEY);
      req.user = decoded; 
      next(); 
  } catch (err) {
      return res.status(401).json({ message: '無効なトークンです' });
  }
};


module.exports = authenticateJWT;