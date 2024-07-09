// This component is a graph of the two stocks' raw prices

import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import '../App.css';
import {calculateStats, differenceSeries, transformData} from "./Calculations.js";
import {transformDataNormalize} from "./Calculations.js";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const StockChart = ({ data1, data2, chartType, risk=0, equitySeries=null}) => {
    let stockData1
    let stockData2

    if (chartType === 'raw') {
        stockData1 = transformData(data1)
        stockData2 = transformData(data2)
    } else if (chartType === 'normalized') {
        stockData1 = transformDataNormalize(data1)
        stockData2 = transformDataNormalize(data2)
    } else if (chartType === 'spread') {
        stockData1 = { labels: transformData(data1).labels,
            data: differenceSeries(transformDataNormalize(data1).data, transformDataNormalize(data2).data) }
    } else if (chartType === 'equity') {
        stockData1 = {
            labels: transformData(data1).labels,
            data: equitySeries
        }
    }

    let chartData

    if (chartType === 'raw' || chartType === 'normalized') {
        chartData = {
            // Store the newest stock as our timeline will start there if IPO'd < 20 years ago
            // Set the labels (x-axis) and datasets (y-axis)
            labels: stockData1.labels.length > stockData2.labels.length ? stockData1.labels : stockData2.labels,
            datasets: [
                {
                    label: data1.symbol,
                    data: stockData1.data,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                },
                {
                    label: data2.symbol,
                    data: stockData2.data,
                    borderColor: 'rgba(153, 102, 255, 1)',
                    backgroundColor: 'rgba(153, 102, 255, 0.2)',
                },
            ]
        }
    } else if (chartType === 'spread') {
        chartData = {
            // Store the newest stock as our timeline will start there if IPO'd < 20 years ago
            // Set the labels (x-axis) and datasets (y-axis)
            labels: stockData1.labels,
            datasets: [
                {
                    label: 'Spread',
                    data: stockData1.data,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                },
                {
                    label: 'Sell Signal Indicator',
                    data: Array(stockData1.labels.length).fill((calculateStats(stockData1.data)).std),
                    borderColor: 'rgb(0,0,255)',
                    backgroundColor: 'rgba(0,0,255,0.2)',
                },
                {
                    label: 'Close Position',
                    data: Array(stockData1.labels.length).fill(0),
                    borderColor: 'rgb(61,255,0)',
                    backgroundColor: 'rgba(61,255,0,0.2)',
                },
                {
                    label: 'Buy Signal Indicator',
                    data: Array(stockData1.labels.length).fill(-(calculateStats(stockData1.data)).std),
                    borderColor: 'rgb(255,0,0)',
                    backgroundColor: 'rgba(255,0,0,0.2)',
                }
            ]
        }
    } else if (chartType === 'equity') {
        chartData = {
            // Store the newest stock as our timeline will start there if IPO'd < 20 years ago
            // Set the labels (x-axis) and datasets (y-axis)
            labels: stockData1.labels,
            datasets: [
                {
                    label: 'Equity',
                    data: stockData1.data,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                }]
        }
    }

    let options

    if (chartType === 'raw' || chartType === 'normalized') {
        options = {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom',
                },
                title: {
                    display: true,
                    text: chartType === 'raw' ? 'Raw Price Series' : 'Normalized Price Series',
                },
            },
        }
    } else if (chartType === 'spread') {
        options = {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom',
                },
                title: {
                    display: true,
                    text: 'Spread Price Series',
                },
            },
        }
    } else if (chartType === 'equity') {
        options = {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom',
                },
                title: {
                    display: true,
                    text: 'Portfolio Equity Curve - Scaled Weights',
                },
            },
        }
    }

    return <Line data={chartData} options={options} />
}

export default StockChart;