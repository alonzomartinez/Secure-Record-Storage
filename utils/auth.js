const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Check whether the request has a valid login token.
const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Make sure the token was included in the request.
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authentication required.' });
  }

// splits the text wherever there is a space. and [1] gets the second item.
  const token = authHeader.split(' ')[1];

  try {
    // Verify the token using the secret key.
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find the user connected to the token.
    const user = await User.findById(decoded.id).select('-password');

    if (!user) {
      return res.status(401).json({ message: 'User not found.' });
    }

    // Make the logged-in user's information available to routes.
    req.user = user;

    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token.' });
  }
};

module.exports = { authMiddleware };