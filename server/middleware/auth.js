const jwt = require('jsonwebtoken');

exports.protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  console.log('=== PROTECT MIDDLEWARE ===');
  console.log('Token:', token ? 'Present' : 'Missing');
  console.log('Headers:', req.headers.authorization);

  if (!token) {
    console.log('No token - returning 401');
    return res.status(401).json({ success: false, message: 'Not authorized to access this route' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    console.log('Token verified - User:', req.user);
    next();
  } catch (error) {
    console.log('Token verification failed:', error.message);
    return res.status(401).json({ success: false, message: 'Not authorized to access this route' });
  }
};

exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ success: false, message: 'User not authenticated' });
    }
    next();
  };
};
