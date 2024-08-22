// index.js
const express = require('express');
const dotenv = require('dotenv');
const dataRoutes = require('./Routes/dataRoutes');

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000; // Use PORT from .env or default to 3000

// Middleware to parse JSON
app.use(express.json());

// Use the routes defined in csvRoutes
app.use('/api/csv', dataRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
