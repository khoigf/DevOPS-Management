const jwt = require('jsonwebtoken');

/**
 * Middleware for authenticating requests using JWT.
 * Extracts the token from the "Authorization" header and verifies it.
 */
const authenticate = (req, res, next) => {
  // Lấy token từ header Authorization
  const authHeader = req.header('Authorization');
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  const token = authHeader.split(' ')[1]; // Tách "Bearer" ra khỏi token

  try {
    // Xác thực token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Lưu thông tin user từ payload vào request để route tiếp theo dùng
    req.user = {
      userId: decoded.userId,  // Có thể là thông tin userId từ JWT payload
      role: decoded.role       // Hoặc các thông tin khác bạn gắn trong payload
    };

    next(); // Tiếp tục tới route tiếp theo
  } catch (error) {
    res.status(400).json({ error: 'Invalid token or token has expired.' });
  }
};

const authorizeAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    return next(); // User is an admin; proceed to the next middleware/route
  }
  return res.status(403).json({ error: 'Access denied. Admins only.' });
};

module.exports = { authenticate, authorizeAdmin };
