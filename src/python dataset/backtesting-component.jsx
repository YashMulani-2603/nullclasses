import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

// Simulating Python functions (normally these would be backend API calls)
const generateHistoricalData = () => {
  // Simplified version of Python's generate_historical_stock_data
  const data = [];
  let price = 100;
  
  for (let i = 0; i < 365; i++) {
    const change = (Math.random() * 0.04) - 0.02;  // +/- 2% daily change
    price *= (1 + change);
    
    data.push({
      date: new Date(2023, 0, i + 1).toISOString().split('T')[0],
      close: Number(price.toFixed(2))
    });
  }
  
  return data;
};

const simpleMovingAverageStrategy = (data) => {
  const shortWindow = 10;
  const longWindow = 50;
  const initialCapital = 10000;
  
  // Calculate moving averages
  const processedData = data.map((d, i) => {
    const shortMA = i >= shortWindow 
      ? data.slice(i - shortWindow + 1, i + 1).reduce((sum, val) => sum + val.close, 0) / shortWindow
      : null;
    
    const longMA = i >= longWindow
      ? data.slice(i - longWindow + 1, i + 1).reduce((sum, val) => sum + val.close, 0) / longWindow
      : null;
    
    return { ...d, shortMA, longMA };
  });
  
  // Backtesting logic
  let capital = initialCapital;
  let shares = 0;
  let position = 0;
  const trades = [];
  
  processedData.forEach((day, i) => {
    if (day.shortMA && day.longMA) {
      if (day.shortMA > day.longMA && position === 0) {
        // Buy signal
        shares = Math.floor(capital / day.close);
        capital -= shares * day.close;
        position = 1;
        trades.push({ type: 'BUY', price: day.close, shares });
      } else if (day.shortMA < day.longMA && position === 1) {
        // Sell signal
        capital += shares * day.close;
        position = 0;
        trades.push({ type: 'SELL', price: day.close, shares });
      }
    }
  });
  
  // Liquidate final position
  if (position === 1) {
    capital += shares * processedData[processedData.length - 1].close;
  }
  
  return {
    finalCapital: Number(capital.toFixed(2)),
    totalReturnPercent: Number(((capital - initialCapital) / initialCapital * 100).toFixed(2)),
    trades,
    data: processedData
  };
};

const BacktestingDashboard = () => {
  const [historicalData, setHistoricalData] = useState(null);
  const [backtestResults, setBacktestResults] = useState(null);

  const handleGenerateData = () => {
    const data = generateHistoricalData();
    setHistoricalData(data);
  };

  const handleBacktest = () => {
    if (historicalData) {
      const results = simpleMovingAverageStrategy(historicalData);
      setBacktestResults(results);
    }
  };

  return (
    <Card className="w-full max-w-6xl mx-auto rounded-none">
      <CardHeader>
        <CardTitle className="text-4xl font-bold">Trading Strategy Backtesting</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-4 mb-4">
          <Button onClick={handleGenerateData}>Generate Historical Data</Button>
          <Button 
            onClick={handleBacktest} 
            disabled={!historicalData}
          >
            Run Backtest
          </Button>
        </div>

        {historicalData && (
          <div className="mt-4">
            <LineChart width={800} height={400} data={historicalData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="close" stroke="#8884d8" name="Stock Price" />
            </LineChart>
          </div>
        )}

        {backtestResults && (
          <div className="mt-4 grid grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Backtest Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Initial Capital: $10,000</p>
                <p>Final Capital: ${backtestResults.finalCapital}</p>
                <p>Total Return: {backtestResults.totalReturnPercent}%</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Trade History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="max-h-64 overflow-auto">
                  {backtestResults.trades.map((trade, index) => (
                    <div key={index} className="mb-2 p-2 border rounded">
                      <p>{trade.type} {trade.shares} shares at ${trade.price}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BacktestingDashboard;