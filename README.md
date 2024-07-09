# Stock Pair Trading Application

## Overview

This application allows users to compare stock data for pair trading purposes. The backend is built with Node.js and Express, 
and it fetches stock data from the Alpha Vantage API

![DemoScreenCapture](https://github.com/Bhuwann/pair-trading-app/assets/107561906/e1c09329-d817-4ca0-b1b4-e981baae5f3d)

## Backend Directory Structure

```plaintext
backend/
├── src/
│   ├── controllers/
│   │   └── stockController.js
│   ├── routes/
│   │   └── stockRoutes.js
│   ├── app.js
│   ├── server.js
├── .env
├── .gitignore
```

## File Descriptions

### `src/controllers/stockController.js`
This file contains the logic to handle requests for fetching stock data from the Alpha Vantage API

### `src/routes/stockRoutes.js`
This file contains a function that creates a route for requests sent from the frontend to be handled by the controller

### `src/app.js`
This file sets up the Express application and middleware

### `src/server.js`
This file starts the Express server and listens for requests sent from the backend at a specified port

## Getting Started 

### Prerequisites

* Node.js
* npm

### Installation

1. Clone the repository:
   ```
    git clone <repository-url>
    cd backend
   ```
2. Install the dependencies:
    ```
   npm install
    ```
3. Create a `.env` file in the `backend` directory and your Alpha Vantage API key:
    ```
    ALPHA_VANTAGE_API_KEY=<your_key>   
    ```
   
### Running the Backend Server

Start the backend server: 
```
node src/server.js
```

The server should now be running on `http://localhost:5001`

## Usage

After starting the backend server, you can use the frontend to input two stock symbols and compare their data. Ensure the 
frontend is configured to send requests to the correct backend URL.

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

Bhuwan Bhattarai - `bb623@cornell.edu`




[//]: # (# Getting Started with Create React App)

[//]: # ()
[//]: # (This project was bootstrapped with [Create React App]&#40;https://github.com/facebook/create-react-app&#41;.)

[//]: # ()
[//]: # (## Available Scripts)

[//]: # ()
[//]: # (In the project directory, you can run:)

[//]: # ()
[//]: # (### `npm start`)

[//]: # ()
[//]: # (Runs the app in the development mode.\)

[//]: # (Open [http://localhost:3000]&#40;http://localhost:3000&#41; to view it in your browser.)

[//]: # ()
[//]: # (The page will reload when you make changes.\)

[//]: # (You may also see any lint errors in the console.)

[//]: # ()
[//]: # (### `npm test`)

[//]: # ()
[//]: # (Launches the test runner in the interactive watch mode.\)

[//]: # (See the section about [running tests]&#40;https://facebook.github.io/create-react-app/docs/running-tests&#41; for more information.)

[//]: # ()
[//]: # (### `npm run build`)

[//]: # ()
[//]: # (Builds the app for production to the `build` folder.\)

[//]: # (It correctly bundles React in production mode and optimizes the build for the best performance.)

[//]: # ()
[//]: # (The build is minified and the filenames include the hashes.\)

[//]: # (Your app is ready to be deployed!)

[//]: # ()
[//]: # (See the section about [deployment]&#40;https://facebook.github.io/create-react-app/docs/deployment&#41; for more information.)

[//]: # ()
[//]: # (### `npm run eject`)

[//]: # ()
[//]: # (**Note: this is a one-way operation. Once you `eject`, you can't go back!**)

[//]: # ()
[//]: # (If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.)

[//]: # ()
[//]: # (Instead, it will copy all the configuration files and the transitive dependencies &#40;webpack, Babel, ESLint, etc&#41; right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.)

[//]: # ()
[//]: # (You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.)

[//]: # ()
[//]: # (## Learn More)

[//]: # ()
[//]: # (You can learn more in the [Create React App documentation]&#40;https://facebook.github.io/create-react-app/docs/getting-started&#41;.)

[//]: # ()
[//]: # (To learn React, check out the [React documentation]&#40;https://reactjs.org/&#41;.)

[//]: # ()
[//]: # (### Code Splitting)

[//]: # ()
[//]: # (This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting]&#40;https://facebook.github.io/create-react-app/docs/code-splitting&#41;)

[//]: # ()
[//]: # (### Analyzing the Bundle Size)

[//]: # ()
[//]: # (This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size]&#40;https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size&#41;)

[//]: # ()
[//]: # (### Making a Progressive Web App)

[//]: # ()
[//]: # (This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app]&#40;https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app&#41;)

[//]: # ()
[//]: # (### Advanced Configuration)

[//]: # ()
[//]: # (This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration]&#40;https://facebook.github.io/create-react-app/docs/advanced-configuration&#41;)

[//]: # ()
[//]: # (### Deployment)

[//]: # ()
[//]: # (This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment]&#40;https://facebook.github.io/create-react-app/docs/deployment&#41;)

[//]: # ()
[//]: # (### `npm run build` fails to minify)

[//]: # ()
[//]: # (This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify]&#40;https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify&#41;)
