const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const verifyToken = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Access Denied: No token provided' });
  }

  try {
    // Verify token and decode payload
    const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
    req.user = decoded.user; // Attach decoded user payload to request object
    console.log('User authenticated:', req.user); // Log user information (optional)
    next();
  } catch (err) {
    console.error('Token verification failed:', err); // Log verification error
    return res.status(403).json({ message: 'Access Denied: Invalid token' });
  }
};

module.exports = verifyToken;
