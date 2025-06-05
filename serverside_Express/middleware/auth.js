// middleware/auth.js
const jwt = require('jsonwebtoken');
const SECRET_KEY = "my_super_secret_key_123!"; // Use env variable in real apps

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization']; // Bearer TOKEN
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'Access Denied' });

  try {
    const verified = jwt.verify(token, SECRET_KEY);
    req.user = verified; // Add user info to request
    next(); // Proceed to the next handler
  } catch (err) {
    res.status(403).json({ message: 'Invalid Token' });
  }
};

module.exports = authenticateToken;
