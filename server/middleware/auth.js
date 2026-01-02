const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.JWT_SECRET || "super_secret_key_123";

module.exports = function(req, res, next) {
  // 1. Get the token from the header
  const token = req.header('x-auth-token');

  // 2. Check if no token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // 3. Verify token
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded; // Add the user to the request
    next(); // Let them pass!
  } catch (err) {
    res.status(400).json({ msg: 'Token is not valid' });
  }
};