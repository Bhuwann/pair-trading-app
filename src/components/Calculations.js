export const normalize = (prices) => {
    let min = Math.min(...prices)
    let max = Math.max(...prices)

    return prices.map(price => ((price - min)/(max - min)))
}

export const transformData = (data) => {
    if (!data) return { labels: [], data: [] }

    // Extract dates as labels, except the first object which holds the ticker
    let dates = Object.keys(data.data)
    // dates.reverse()
    const prices = dates.map(date => parseFloat(data.data[date]['4. close']))

    return {
        labels: dates,
        data: prices,
    }
}

export const calculateEuclideanDifference = (data1, data2) => {
    let dates1 = Object.keys(data1.data)
    let dates2 = Object.keys(data2.data)

    // dates1.reverse()
    // dates2.reverse()

    let prices1 = dates1.map(date => parseFloat(data1.data[date]['4. close']))
    let prices2 = dates2.map(date => parseFloat(data2.data[date]['4. close']))


    let startIndex = Math.abs(prices1.length - prices2.length)
    let minLength = Math.min(prices1.length, prices2.length)

    let normPrices1 = normalize(prices1)
    let normPrices2 = normalize(prices2)

    let acc = 0
    for (let i = startIndex; i < minLength; i++) {
        acc += (normPrices1[i] - normPrices2[i]) ** 2
    }

    return acc.toFixed(2)
}

export const transformDataNormalize = (data) => {
    let workingData = transformData(data)
    workingData.data = normalize(workingData.data)
    return workingData
}

export const calculateStats = (data) => {
    const n = data.length;
    const mean = data.reduce((a, b) => a + b) / n;
    const variance = data.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / (n-1);
    const std =  Math.sqrt(variance);

    return {mean: mean, variance: variance, std: std}
}

export const differenceSeries = (data1, data2) => {
    let diff = [];
    let minLength = Math.min(data1.length, data2.length);
    for (let i = 0; i < minLength; i++) {
        diff.push(data1[i] - data2[i]);
    }
    return diff;
}

export const spreadStd = (data1, data2) => {
    let transformedAndNormalized1 = transformData(data1);
    let transformedAndNormalized2 = transformData(data2);

    return (calculateStats(differenceSeries(transformedAndNormalized1, transformedAndNormalized2))).std;
}

export const generateZscoreSeries = (series) => {
    let mean = calculateStats(series).mean
    let std = calculateStats(series).std

    return series.map(value => (value-mean / std))
}

export const generateSignals = (zscoreSeries) => {
    let buySignals = zscoreSeries.map(z => z < -calculateStats(zscoreSeries).std * 0.75);
    let sellSignals = zscoreSeries.map(z => z > calculateStats(zscoreSeries).std * 0.75);
    let exitSignals = zscoreSeries.map(z => z > -calculateStats(zscoreSeries).std * 0.25 && z < calculateStats(zscoreSeries).std * 0.25);

    return { buySignals, sellSignals, exitSignals };
}

export const backtest = (data1, data2) => {
    let S1 = transformDataNormalize(data1).data
    let S2 = transformDataNormalize(data2).data

    let spreadSeries = differenceSeries(S1, S2)
    let zscores = generateZscoreSeries(spreadSeries)
    let signals = generateSignals(zscores);

    let buySignals = signals.buySignals
    let sellSignals = signals.sellSignals
    let exitSignals = signals.exitSignals

    let test = buySignals.map(signal => (signal === true) ? 0.5 : 0)
    let test2 = sellSignals.map(signal => (signal === true) ? 0.5 : 0)
    let test3 = exitSignals.map(signal => (signal === true) ? 0.5 : 0)


    let money = 0;
    let position = 0;
    let pnl = [];

    for (let i = 0; i < S1.length; i++) {
        if (buySignals[i] && position === 0) {
            position = 1;
            money -= S1[i] - S2[i];
        } else if (sellSignals[i] && position === 0) {
            position = -1;
            money += S1[i] - S2[i];
        } else if (exitSignals[i] && position !== 0) {
            if (position === 1) {
                money += S1[i] - S2[i];
            } else if (position === -1) {
                money -= S1[i] - S2[i];
            }
            position = 0;
        }
        pnl.push(money);
    }

    return pnl;
}
