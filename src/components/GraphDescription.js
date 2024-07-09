import React, { useState } from 'react';
import '../App.css';
import StockChart from '../components/StockChart.js';
import {rawGraphDescription} from "../DefaultData.js";
import {normalizedGraphDescription} from "../DefaultData.js";
import {spreadGraphDescription} from "../DefaultData.js";
import {equityGraphDescription} from "../DefaultData.js";
import {backtest, calculateEuclideanDifference} from "./Calculations.js";
import Latex from 'react-latex';



const GraphDescription = ({ data1, data2, chartType }) => {
    const [isChecked, setIsChecked] = useState(true)
    const euclideanDistance = (data1 && data2) ? calculateEuclideanDifference(data1, data2) : 0;
    const formulaSSD = `$$SSD = \\sum_{i=0}^{n} (p1_i - p2_i)^2 = ${euclideanDistance}$$`;
    const tickerSubtractionFormula = `$$P_{${data1.symbol}} - P_{${data2.symbol}}$$`
    const backtestEquitySeries = chartType === 'equity' ? backtest(data1, data2) : null;
    const backtestProfit = chartType === 'equity' ? backtestEquitySeries[backtestEquitySeries.length - 1].toFixed(2) : 69;
    const profitValue = `$$Profit = ${backtestProfit}$$`;

    const handleClick = () => {
        setIsChecked(!isChecked);
    }

    let display = isChecked ? 'Hide' : 'Show'
    if (chartType === 'raw') {
        display = isChecked ? 'Hide Price Series' : 'Show Price Series'
    } else if (chartType === 'normalized') {
        display = isChecked ? 'Hide Normalized Price Series' : 'Show Normalized Price Series'
    } else if (chartType === 'spread') {
        display = isChecked ? 'Hide Spread Price Series' : 'Show Spread Price Series'
    } else if (chartType === 'equity') {
        display = isChecked ? 'Hide Backtest Results' : 'Show Backtest Results'
    }

    return (
        <>
            <div className='toggle-container'>
                <label className="cursor-pointer label pr-3">
                    <input onChange={handleClick} type="checkbox" className="toggle toggle-primary"
                           checked={isChecked}/>
                </label>
                <div className='toggle-text'>
                    {display}
                </div>
            </div>
            {isChecked && (
            <div className='description-graph-container'>
                {chartType === 'raw' && (
                    <>
                        <div className='description-container'>
                            {rawGraphDescription}
                        </div>
                        <div className="graph">
                            <StockChart data1={data1} data2={data2} chartType='raw'/>
                        </div>
                    </>
                )}
                {chartType === 'normalized' && (
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
                )}
                {chartType === 'spread' && (
                    <>
                        <div className='description-container'>
                            {spreadGraphDescription}
                            <div>
                                <Latex>{tickerSubtractionFormula}</Latex>
                            </div>
                            <div>
                                <span style={{ color: 'blue' }}>BLUE</span> and <span style={{ color: 'red' }}>RED</span> indicate two historical deviations of spread price                            </div>
                        </div>
                        <div className="graph">
                            <StockChart data1={data1} data2={data2} chartType='spread'/>
                        </div>
                    </>
                )}
                {chartType === 'equity' && (
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
                )}
            </div>
            )}
        </>
    )
}


export default GraphDescription;