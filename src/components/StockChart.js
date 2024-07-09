import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import '../App.css';
import { calculateStats, differenceSeries, transformData, transformDataNormalize } from "./Calculations.js";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

/**
 * StockChart component for rendering different types of stock charts
 * @param {Object} data1 - Data for the first stock
 * @param {Object} data2 - Data for the second stock
 * @param {string} chartType - Type of chart to render ('raw', 'normalized', 'spread', or 'equity')
 * @param {number} risk - Risk factor (currently unused)
 * @param {Array} equitySeries - Equity data series for 'equity' chart type
 */
const StockChart = ({ data1, data2, chartType, risk = 0, equitySeries = null }) => {
    // Prepare stock data based on chart type
    const prepareStockData = () => {
        switch (chartType) {
            case 'raw':
                return [transformData(data1), transformData(data2)];
            case 'normalized':
                return [transformDataNormalize(data1), transformDataNormalize(data2)];
            case 'spread':
                return [{
                    labels: transformData(data1).labels,
                    data: differenceSeries(transformDataNormalize(data1).data, transformDataNormalize(data2).data)
                }];
            case 'equity':
                return [{
                    labels: transformData(data1).labels,
                    data: equitySeries
                }];
            default:
                return [];
        }
    };

    const [stockData1, stockData2] = prepareStockData();

    // Prepare chart data based on chart type
    const prepareChartData = () => {
        if (chartType === 'raw' || chartType === 'normalized') {
            return {
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
            };
        } else if (chartType === 'spread') {
            const spreadStats = calculateStats(stockData1.data);
            return {
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
                        data: Array(stockData1.labels.length).fill(spreadStats.std),
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
                        data: Array(stockData1.labels.length).fill(-spreadStats.std),
                        borderColor: 'rgb(255,0,0)',
                        backgroundColor: 'rgba(255,0,0,0.2)',
                    }
                ]
            };
        } else if (chartType === 'equity') {
            return {
                labels: stockData1.labels,
                datasets: [
                    {
                        label: 'Equity',
                        data: stockData1.data,
                        borderColor: 'rgba(75, 192, 192, 1)',
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    }
                ]
            };
        }
    };

    const chartData = prepareChartData();

    // Prepare chart options based on chart type
    const prepareChartOptions = () => {
        const baseOptions = {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom',
                },
                title: {
                    display: true,
                    text: '',
                },
            },
        };

        switch (chartType) {
            case 'raw':
                baseOptions.plugins.title.text = 'Raw Price Series';
                break;
            case 'normalized':
                baseOptions.plugins.title.text = 'Normalized Price Series';
                break;
            case 'spread':
                baseOptions.plugins.title.text = 'Spread Price Series';
                break;
            case 'equity':
                baseOptions.plugins.title.text = 'Portfolio Equity Curve - Scaled Weights';
                break;
        }

        return baseOptions;
    };

    const options = prepareChartOptions();

    return <Line data={chartData} options={options} />;
};

export default StockChart;