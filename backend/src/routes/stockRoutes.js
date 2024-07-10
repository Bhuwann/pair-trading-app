const express = require('express');
const { getStockData } = require('../controllers/stockController');

/**
 * Express router to mount stock related functions on.
 */
const router = express.Router();

/**
 * Route serving stock data for a given symbol.
 * @name get/:symbol
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.get('/:symbol', getStockData);

module.exports = router;