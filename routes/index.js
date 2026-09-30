const router = require('express').Router();

const userRoutes = require('./userRoutes');
const noteRoutes = require('./noteRoutes');

// Add the user and note routes to the API.
router.use('/users', userRoutes);
router.use('/notes', noteRoutes);

module.exports = router;