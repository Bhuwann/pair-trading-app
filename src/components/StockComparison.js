import React, { useState } from 'react';
// axios is a package that allows us to make HTTP requests to the backend server
import axios from 'axios';
// import styles
import '../App.css';
// import the StockChart component
// import temporary default data
import { aaplData, msftData } from '../DefaultData.js';
import GraphDescription from './GraphDescription.js';
import AnimatedBullets from "./AnimatedBullets.js";

const Toggle = () => {
    const [isChecked, setIsChecked] = useState(true)
    const handleClick = () => {
        setIsChecked(!isChecked);
    }
    let display = isChecked ? 'Hide' : 'Show'

    return (
        <div className='toggle-container'>
            <label className="cursor-pointer label pr-3">
                <input onChange={handleClick} type="checkbox" className="toggle toggle-primary"
                       checked={isChecked}/>
            </label>
            <div className='toggle-text'>
                {display}
            </div>
        </div>
    )
}

// StockComparison component fetched and compares stock data for two stock symbols
const StockComparison = () => {
    // State variables to hold stock symbols and fetched data for each symbol
    const [symbol1, setSymbol1] = useState('');
    const [symbol2, setSymbol2] = useState('');
    const [data1, setData1] = useState(aaplData);
    const [data2, setData2] = useState(msftData);
    const [backtestButtonClicked, setBacktestButtonClicked] = useState(false);
    const [analyzeButtonClicked, setAnalyzeButtonClicked] = useState(false);

    // Function to fetch stock data for a given symbol from the backend server and update state
    // Params: symbol --> The stock symbol to fetch data for
    //         setData --> The state setter function to update the state variable
    const fetchStockData = async (symbol, setData) => {
        try {
            //  Make an HTTP GET request to the backend endpoint for symbol
            const response = await axios.get(`http://localhost:5001/api/stocks/${symbol}`)
            // Extract the 'Time Series (Daily)' data from the response
            const timeSeries = response.data['Time Series (Daily)']

            // Check if time series data is available
            if (timeSeries) {
                setData({ symbol: symbol, data: timeSeries });
            } else {
                setData(null)
            }
        } catch (error) {
            console.error('error fetching stock data', error)
            setData(null)
            throw error;
        }
    }

    const handleCompare = async () => {
        if (symbol1 && symbol2) {
            try {
                await Promise.all([
                    fetchStockData(symbol1, setData1),
                    fetchStockData(symbol2, setData2)
                ]);
            } catch (error) {
                console.error('Error fetching stock data:', error);
                // Handle error (e.g., show error message to user)
            }
        } else {
            setData1({...aaplData});
            setData2({...msftData});
        }

        console.log('Data1:', data1);
        console.log('Data2:', data2);
        setAnalyzeButtonClicked(true);
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }

    const handleBacktest = () => {
        setTimeout(() => setBacktestButtonClicked(true), 0);
        setTimeout(() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' }), 500);
    }

    return (
        <>
            <div className="landing-body-container">
                <div className={"input-fields-container"}>
                    <div className="input-field">
                        <div className="text-4xl font-bold mb-4">Stock 1</div>
                        <label className="input input-bordered flex items-center gap-2">
                            Ticker 1:
                            <input
                                type="text"
                                value={symbol1}
                                onChange={(e) => setSymbol1(e.target.value)}
                                placeholder="e.g. AAPL"
                            />
                        </label>
                    </div>
                    <div className="input-field">
                        <div className="text-4xl font-bold mb-4">Stock 2</div>
                        <label className="input input-bordered flex items-center gap-2 font-pro">
                            Ticker 2:
                            <input
                                type="text"
                                value={symbol2}
                                onChange={(e) => setSymbol2(e.target.value)}
                                placeholder="e.g. MSFT"
                            />
                        </label>
                    </div>
                </div>
                <div className="primary-button-container">
                    <button className="btn btn-outline w-1/6 text-lg font-pro font-bold"
                            onClick={handleCompare}>Analyze
                    </button>
                </div>
            </div>

            {analyzeButtonClicked && (
            <>
                <div className="graph-container">
                    <GraphDescription data1={data1} data2={data2} chartType='raw'/>
                    <GraphDescription data1={data1} data2={data2} chartType='normalized'/>
                    <GraphDescription data1={data1} data2={data2} chartType='spread'/>
                    <AnimatedBullets/>
                </div>

                <div className="primary-button-container">
                    <button className="btn btn-outline w-1/6 text-lg font-pro font-bold"
                            onClick={handleBacktest}>Backtest
                    </button>
                    {!backtestButtonClicked && (
                        <div style={{ paddingBottom: '50px' }}></div>
                    )}
                </div>

                {backtestButtonClicked && (
                <div className="graph-container">
                    <GraphDescription data1={data1} data2={data2} chartType='equity'/>
                </div>
                    )
                }
                </>
            )}
        </>
    )
}

export default StockComparison;