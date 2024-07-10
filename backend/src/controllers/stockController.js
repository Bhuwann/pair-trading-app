const axios = require('axios');
require('dotenv').config();

/**
 * Fetches stock data from the Alpha Vantage API
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getStockData = async (req, res) => {
    const { symbol } = req.params;

    try {
        const response = await axios.get('https://alphavantage.co/query', {
            params: {
                function: 'TIME_SERIES_DAILY',
                symbol: symbol,
                outputsize: 'full', // Changed to 'full' for 20 years of data
                apikey: process.env.ALPHA_VANTAGE_API_KEY
            }
        });

        res.json(response.data);
    } catch (error) {
        console.error('Error fetching stock data:', error);
        res.status(500).json({ error: 'Error fetching stock data' });
    }
};

module.exports = { getStockData };