const mongoose = require('mongoose');

// Connect to the MongoDB database.
mongoose.connect(process.env.MONGO_URI);

// Export the database connection.
module.exports = mongoose.connection;