import React from 'react';
import StockComparison from './components/StockComparison.js';
import MenuBar from "./components/MenuBar.js";
import './App.css';

/**
 * App Component
 *
 * This is the main component of the application. It renders the MenuBar
 * and the StockComparison components.
 *
 * @returns {React.Element} The rendered App component
 */
const App = () => {
    return (
        <div>
            <MenuBar />
            <StockComparison />
        </div>
    );
};

export default App;
