// This file starts the Express server
// Import the Express application setup from app.js
const app = require('./app')

// Sets the port for the server to listen on. Defaults to 5001 if not specififed in the environment variables
const PORT = process.env.PORT || 5001

// Start the server and listen on the specified port
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})