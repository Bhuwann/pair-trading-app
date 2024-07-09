/**
 * Normalizes an array of prices to a 0-1 scale.
 * @param {number[]} prices - An array of price values.
 * @returns {number[]} An array of normalized prices.
 */
export const normalize = (prices) => {
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    return prices.map(price => (price - min) / (max - min));
};

/**
 * Transforms raw stock data into a format suitable for charting.
 * @param {Object} data - Raw stock data.
 * @returns {Object} An object with labels (dates) and data (closing prices).
 */
export const transformData = (data) => {
    if (!data || !data.data) return { labels: [], data: [] };

    const dates = Object.keys(data.data);
    const prices = dates.map(date => parseFloat(data.data[date]['4. close']));

    return { labels: dates, data: prices };
};

/**
 * Calculates the Euclidean difference between two normalized stock price series.
 * @param {Object} data1 - First stock data object.
 * @param {Object} data2 - Second stock data object.
 * @returns {string} The Euclidean difference, rounded to 2 decimal places.
 */
export const calculateEuclideanDifference = (data1, data2) => {
    if (!data1 || !data1.data || !data2 || !data2.data) {
        console.error('Invalid data provided to calculateEuclideanDifference');
        return '0.00';
    }

    const dates1 = Object.keys(data1.data);
    const dates2 = Object.keys(data2.data);

    const prices1 = dates1.map(date => parseFloat(data1.data[date]['4. close']));
    const prices2 = dates2.map(date => parseFloat(data2.data[date]['4. close']));

    const startIndex = Math.abs(prices1.length - prices2.length);
    const minLength = Math.min(prices1.length, prices2.length);

    const normPrices1 = normalize(prices1);
    const normPrices2 = normalize(prices2);

    let sumSquaredDiff = 0;
    for (let i = startIndex; i < minLength; i++) {
        sumSquaredDiff += (normPrices1[i] - normPrices2[i]) ** 2;
    }

    return sumSquaredDiff.toFixed(2);
};

/**
 * Transforms and normalizes stock data.
 * @param {Object} data - Raw stock data.
 * @returns {Object} Transformed and normalized data.
 */
export const transformDataNormalize = (data) => {
    const workingData = transformData(data);
    workingData.data = normalize(workingData.data);
    return workingData;
};

/**
 * Calculates basic statistical measures for a dataset.
 * @param {number[]} data - Array of numerical data.
 * @returns {Object} Object containing mean, variance, and standard deviation.
 */
export const calculateStats = (data) => {
    const n = data.length;
    const mean = data.reduce((a, b) => a + b) / n;
    const variance = data.reduce((a, b) => a + (b - mean) ** 2, 0) / (n - 1);
    const std = Math.sqrt(variance);

    return { mean, variance, std };
};

/**
 * Calculates the difference between two data series.
 * @param {number[]} data1 - First data series.
 * @param {number[]} data2 - Second data series.
 * @returns {number[]} Array of differences.
 */
export const differenceSeries = (data1, data2) => {
    const minLength = Math.min(data1.length, data2.length);
    return Array.from({ length: minLength }, (_, i) => data1[i] - data2[i]);
};

/**
 * Calculates the standard deviation of the spread between two stocks.
 * @param {Object} data1 - First stock data.
 * @param {Object} data2 - Second stock data.
 * @returns {number} Standard deviation of the spread.
 */
export const spreadStd = (data1, data2) => {
    const transformed1 = transformData(data1).data;
    const transformed2 = transformData(data2).data;
    const diff = differenceSeries(transformed1, transformed2);
    return calculateStats(diff).std;
};

/**
 * Generates Z-scores for a series of data.
 * @param {number[]} series - Array of numerical data.
 * @returns {number[]} Array of Z-scores.
 */
export const generateZscoreSeries = (series) => {
    const { mean, std } = calculateStats(series);
    return series.map(value => (value - mean) / std);
};

/**
 * Generates trading signals based on Z-scores.
 * @param {number[]} zscoreSeries - Array of Z-scores.
 * @returns {Object} Object containing buy, sell, and exit signals.
 */
export const generateSignals = (zscoreSeries) => {
    const { std } = calculateStats(zscoreSeries);
    return {
        buySignals: zscoreSeries.map(z => z < -std * 0.75),
        sellSignals: zscoreSeries.map(z => z > std * 0.75),
        exitSignals: zscoreSeries.map(z => Math.abs(z) < std * 0.25)
    };
};

/**
 * Performs a backtest on a pair trading strategy.
 * @param {Object} data1 - First stock data.
 * @param {Object} data2 - Second stock data.
 * @returns {number[]} Array of cumulative profits and losses.
 */
export const backtest = (data1, data2) => {
    const S1 = transformDataNormalize(data1).data;
    const S2 = transformDataNormalize(data2).data;

    const spreadSeries = differenceSeries(S1, S2);
    const zscores = generateZscoreSeries(spreadSeries);
    const { buySignals, sellSignals, exitSignals } = generateSignals(zscores);

    let money = 0;
    let position = 0;
    const pnl = [];

    for (let i = 0; i < S1.length; i++) {
        if (buySignals[i] && position === 0) {
            position = 1;
            money -= S1[i] - S2[i];
        } else if (sellSignals[i] && position === 0) {
            position = -1;
            money += S1[i] - S2[i];
        } else if (exitSignals[i] && position !== 0) {
            money += position * (S1[i] - S2[i]);
            position = 0;
        }
        pnl.push(money);
    }

    return pnl;
};
