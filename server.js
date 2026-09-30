// Load environment variables before connecting to the database.
require('dotenv').config();

const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3001;

// Allow the server to read JSON from requests.
app.use(express.json());

// Use the API routes.
app.use('/api', routes);

// Start the server after connecting to MongoDB.
db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});

// Show a message if the database connection fails.
db.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});