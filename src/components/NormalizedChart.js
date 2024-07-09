// This component is a graph of the two stocks' normalized prices

import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const NormalizedChart = ({ data1, data2 }) => {
    // Transform stock data into a format suitable for Chart.js
    const transformData = (data) => {
        if (!data) return { labels: [], data: [] }

        // Extract dates as labels, except the first object which holds the ticker
        let dates = Object.keys(data)
        dates = dates.slice(1)
        dates.reverse()
        let prices = dates.map(date => parseFloat(data[date]['Close/Last'].replace('$', '')))

        // Normalize all prices using ((price - min)/(max - min)) where max and min are defined in the time series domain
        let max = prices[0]
        let min = prices[0]
        for (let i = 0; i < prices.length; i++) {
            if (prices[i] > max) {
                max = prices[i];
            }
            if (prices[i] < min) {
                min = prices[i]
            }
        }

        prices = prices.map(price => ((price - min)/(max - min)))

        return {
            labels: dates,
            data: prices,
        }
    }

    const stockData1 = transformData(data1)
    const stockData2 = transformData(data2)

    const chartData = {
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
            }
        ]
    };

    // Set features of chart
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom',
            },
            title: {
                display: true,
                text: 'Normalized Price Comparison',
            },
        },
    }

    return <Line data={chartData} options={options} />
}

export default NormalizedChart;