// This file contains the logic to handle requests for fetching stock data from an external API (Alpha Vantage)
// This is a promise-based HTTP client used to make requests to the Alpha Vantage API
const axios = require('axios')
// Loads environment variables from a .env file into process.env
require('dotenv').config()

// Controller function to fetch stock data
const getStockData = async (req, res) => {
    // Extract the stock symbol from the request parameters
    const { symbol } = req.params
    try {
        // Make a GET request to the Alpha Vantage API with the necessary parameters
        const response = await axios.get(`https://alphavantage.co/query`, {
            params: {
                function: 'TIME_SERIES_DAILY', // API function to get daily series data
                symbol: symbol, // Stock symbol to fetch data for
                outputsize: 'compact', // We want 20 years of data; not "compact"
                apikey: process.env.ALPHA_VANTAGE_API_KEY // API key from environment variables
            }
        })
        // console.log(response.data) // Log the response data for debugging
        res.json(response.data) // Send the API response data back to the client
    } catch (error) {
        // Handle errors and send a 500 status code with an error message
        res.status(500).json({ error: 'Error fetching stock data' })
    }
}

// Export the getStockData function
module.exports = { getStockData }