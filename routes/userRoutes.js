const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// POST /api/users/register - Create a user account.
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Make sure all required fields were provided.
    if (!username || !email || !password) {
      return res.status(400).json({
        message: 'Please provide a username, email, and password.',
      });
    }

    // Check whether the email is already registered.
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: 'Email is already registered.' });
    }

    // Hash the password before saving it.
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: 'User registered successfully.',
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(500).json({ message: 'Could not register user.' });
  }
});

// POST /api/users/login - Log in and receive a token.
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the account using the email address.
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'Incorrect email or password.' });
    }

    // Compare the submitted password with the saved hash.
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(400).json({ message: 'Incorrect email or password.' });
    }

    // Create a token that identifies the logged-in user.
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({
      message: 'Login successful.',
      token,
    });
  } catch (err) {
    res.status(500).json({ message: 'Could not log in.' });
  }
});

module.exports = router;