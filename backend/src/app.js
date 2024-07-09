// This file sets up the Express application and middleware

// Loads environment variables from a .env file
require('dotenv').config()
// Sets up the Express application
const express = require('express');
// Middleware to enable Cross-Origin Resource Sharing, allowing the frontend to make requests to the backend
const cors = require('cors');
// Imported routes for handling stock-related requests
const stockRoutes = require('./routes/stockRoutes');

const app = express()

// Middleware to enable CORS
app.use(cors())
// Middleware to parse JSON bodies in requests
app.use(express.json())

// Use the stock routes for requests to /api/stocks
app.use('/api/stocks', stockRoutes)

module.exports = app


