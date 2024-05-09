const jwt = require('jsonwebtoken');

// Authentication Middleware
const authenticateToken = (req, res, next) => {
  // Extract token from headers, query parameters, or cookies
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Authentication token is missing' });
  }

  try {
    // Verify token and decode user information
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Set authenticated user information on request object
    next();
  } catch (error) {
    return res.status(403).json({ error: 'Invalid token' });
  }
};

// Authorization Middleware
const authorizeRole = (requiredRole) => {
  return (req, res, next) => {
    // Check if authenticated user's role matches required role
    if (req.user && req.user.role === requiredRole) {
      next(); 
    } else {
      return res.status(403).json({ error: 'Unauthorized' });
    }
  };
};

module.exports = { authenticateToken, authorizeRole };
