import React, { useState } from 'react';
import '../App.css';
import StockChart from '../components/StockChart.js';
import { rawGraphDescription, normalizedGraphDescription, spreadGraphDescription, equityGraphDescription } from "../DefaultData.js";
import { backtest, calculateEuclideanDifference } from "./Calculations.js";
import Latex from 'react-latex';

/**
 * GraphDescription component renders different types of stock charts with descriptions.
 *
 * @param {Object} props - Component props
 * @param {Object} props.data1 - Data for the first stock
 * @param {Object} props.data2 - Data for the second stock
 * @param {string} props.chartType - Type of chart to display ('raw', 'normalized', 'spread', or 'equity')
 * @returns {JSX.Element} Rendered component
 */
const GraphDescription = ({ data1, data2, chartType }) => {
    const [isChecked, setIsChecked] = useState(true);

    const euclideanDistance = (data1 && data2) ? calculateEuclideanDifference(data1, data2) : 0;
    const formulaSSD = `$$SSD = \\sum_{i=0}^{n} (p1_i - p2_i)^2 = ${euclideanDistance}$$`;
    const tickerSubtractionFormula = `$$P_{${data1?.symbol}} - P_{${data2?.symbol}}$$`;
    const backtestEquitySeries = chartType === 'equity' ? backtest(data1, data2) : null;
    const backtestProfit = chartType === 'equity' ? backtestEquitySeries[backtestEquitySeries.length - 1].toFixed(2) : 0;
    const profitValue = `$$Profit = ${backtestProfit}$$`;

    const handleClick = () => setIsChecked(!isChecked);

    const getDisplayText = () => {
        const baseText = isChecked ? 'Hide' : 'Show';
        switch (chartType) {
            case 'raw': return `${baseText} Price Series`;
            case 'normalized': return `${baseText} Normalized Price Series`;
            case 'spread': return `${baseText} Spread Price Series`;
            case 'equity': return `${baseText} Backtest Results`;
            default: return baseText;
        }
    };

    const renderChartContent = () => {
        switch (chartType) {
            case 'raw':
                return (
                    <>
                        <div className='description-container'>{rawGraphDescription}</div>
                        <div className="graph">
                            <StockChart data1={data1} data2={data2} chartType='raw'/>
                        </div>
                    </>
                );
            case 'normalized':
                return (
                    <>
                        <div className='description-container'>
                            {normalizedGraphDescription}
                            <br/><br/>
                            <Latex>{formulaSSD}</Latex>
                            <br/><br/>
                        </div>
                        <div className="graph">
                            <StockChart data1={data1} data2={data2} chartType='normalized' risk={2}/>
                        </div>
                    </>
                );
            case 'spread':
                return (
                    <>
                        <div className='description-container'>
                            {spreadGraphDescription}
                            <div>
                                <Latex>{tickerSubtractionFormula}</Latex>
                            </div>
                            <div>
                                <span style={{ color: 'blue' }}>BLUE</span> and <span style={{ color: 'red' }}>RED</span> indicate two historical deviations of spread price
                            </div>
                        </div>
                        <div className="graph">
                            <StockChart data1={data1} data2={data2} chartType='spread'/>
                        </div>
                    </>
                );
            case 'equity':
                return (
                    <>
                        <div className='description-container'>
                            {equityGraphDescription}
                            <br/><br/>
                            <div>
                                <Latex>{profitValue}</Latex>
                            </div>
                        </div>
                        <div className="graph">
                            <StockChart data1={data1} data2={data2} chartType='equity' equitySeries={backtestEquitySeries}/>
                        </div>
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <>
            <div className='toggle-container'>
                <label className="cursor-pointer label pr-3">
                    <input
                        onChange={handleClick}
                        type="checkbox"
                        className="toggle toggle-primary"
                        checked={isChecked}
                    />
                </label>
                <div className='toggle-text'>{getDisplayText()}</div>
            </div>
            {isChecked && (
                <div className='description-graph-container'>
                    {renderChartContent()}
                </div>
            )}
        </>
    );
};

export default GraphDescription;