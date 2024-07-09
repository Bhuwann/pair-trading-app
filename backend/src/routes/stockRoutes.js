// This file defines the routing for stock-related API endpoints
const express = require('express')
const { getStockData } = require('../controllers/stockController')

const router = express.Router()

// Define a route to get stock data for a given symbol
router.get('/:symbol', getStockData)

module.exports = router

