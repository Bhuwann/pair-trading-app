import React, { useState } from 'react';
import axios from 'axios';
import '../App.css';
import { aaplData, msftData } from '../DefaultData.js';
import GraphDescription from './GraphDescription.js';
import AnimatedBullets from "./AnimatedBullets.js";

/**
 * Toggle component for showing/hiding content
 * @returns {JSX.Element} A toggle switch with a label
 */
const Toggle = () => {
    const [isChecked, setIsChecked] = useState(true);
    const handleClick = () => setIsChecked(!isChecked);
    const display = isChecked ? 'Hide' : 'Show';

    return (
        <div className='toggle-container'>
            <label className="cursor-pointer label pr-3">
                <input
                    onChange={handleClick}
                    type="checkbox"
                    className="toggle toggle-primary"
                    checked={isChecked}
                />
            </label>
            <div className='toggle-text'>{display}</div>
        </div>
    );
};

/**
 * StockComparison component for fetching and comparing stock data
 * @returns {JSX.Element} A form for entering stock symbols and displaying comparison charts
 */
const StockComparison = () => {
    const [symbol1, setSymbol1] = useState('');
    const [symbol2, setSymbol2] = useState('');
    const [data1, setData1] = useState(aaplData);
    const [data2, setData2] = useState(msftData);
    const [backtestButtonClicked, setBacktestButtonClicked] = useState(false);
    const [analyzeButtonClicked, setAnalyzeButtonClicked] = useState(false);

    /**
     * Fetches stock data for a given symbol
     * @param {string} symbol - The stock symbol to fetch data for
     * @param {function} setData - State setter function to update the stock data
     */
    const fetchStockData = async (symbol, setData) => {
        try {
            const response = await axios.get(`http://localhost:5001/api/stocks/${symbol}`);
            const timeSeries = response.data['Time Series (Daily)'];
            setData(timeSeries ? { symbol, data: timeSeries } : null);
        } catch (error) {
            console.error('Error fetching stock data:', error);
            setData(null);
            throw error;
        }
    };

    /**
     * Handles the comparison of two stocks
     */
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
    };

    /**
     * Handles the backtest button click
     */
    const handleBacktest = () => {
        setBacktestButtonClicked(true);
        setTimeout(() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' }), 500);
    };

    return (
        <>
            <div className="landing-body-container">
                <div className="input-fields-container">
                    <StockInputField
                        label="Stock 1"
                        value={symbol1}
                        onChange={setSymbol1}
                        placeholder="e.g. AAPL"
                    />
                    <StockInputField
                        label="Stock 2"
                        value={symbol2}
                        onChange={setSymbol2}
                        placeholder="e.g. MSFT"
                    />
                </div>
                <div className="primary-button-container">
                    <button
                        className="btn btn-outline w-1/6 text-lg font-pro font-bold"
                        onClick={handleCompare}
                    >
                        Analyze
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
                        <button
                            className="btn btn-outline w-1/6 text-lg font-pro font-bold"
                            onClick={handleBacktest}
                        >
                            Backtest
                        </button>
                        {!backtestButtonClicked && <div style={{ paddingBottom: '50px' }}></div>}
                    </div>

                    {backtestButtonClicked && (
                        <div className="graph-container">
                            <GraphDescription data1={data1} data2={data2} chartType='equity'/>
                        </div>
                    )}
                </>
            )}
        </>
    );
};

/**
 * StockInputField component for entering stock symbols
 * @param {Object} props - Component props
 * @param {string} props.label - Label for the input field
 * @param {string} props.value - Current value of the input field
 * @param {function} props.onChange - Function to handle input changes
 * @param {string} props.placeholder - Placeholder text for the input field
 * @returns {JSX.Element} An input field for entering stock symbols
 */
const StockInputField = ({ label, value, onChange, placeholder }) => (
    <div className="input-field">
        <div className="text-4xl font-bold mb-4">{label}</div>
        <label className="input input-bordered flex items-center gap-2 font-pro">
            {`Ticker ${label.split(' ')[1]}:`}
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
            />
        </label>
    </div>
);

export default StockComparison;
