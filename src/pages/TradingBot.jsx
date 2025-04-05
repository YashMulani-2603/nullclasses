import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine } from 'recharts';

const AlgorithmicTradingBot = () => {
  // State for the trading bot
  const [isRunning, setIsRunning] = useState(false);
  const [marketData, setMarketData] = useState([]);
  const [trades, setTrades] = useState([]);
  const [botBalance, setBotBalance] = useState(10000); // Starting with $10,000
  const [assetHolding, setAssetHolding] = useState(0);
  const [profitLoss, setProfitLoss] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  
  // Bot parameters
  const botParams = {
    buyThreshold: 0.98, // Buy when price is 2% below moving average
    sellThreshold: 1.03, // Sell when price is 3% above moving average
    movingAveragePeriod: 10,
    initialPrice: 100,
    volatility: 0.015,
    tradeAmount: 1, // Unit to buy/sell per trade
  };
  
  // Generate next price based on random walk with drift
  const generateNextPrice = (lastPrice) => {
    const randomFactor = 1 + (Math.random() - 0.5) * botParams.volatility;
    // Slight upward bias (0.001)
    return lastPrice * randomFactor * 1.001;
  };
  
  // Calculate moving average
  const calculateMovingAverage = (data, period) => {
    if (data.length < period) return data.length > 0 ? data[data.length - 1].price : botParams.initialPrice;
    
    const relevantData = data.slice(data.length - period);
    const sum = relevantData.reduce((acc, point) => acc + point.price, 0);
    return sum / period;
  };
  
  // Trade logic
  const executeTradingLogic = () => {
    if (marketData.length === 0) return;
    
    const currentPrice = marketData[marketData.length - 1].price;
    const movingAverage = calculateMovingAverage(marketData, botParams.movingAveragePeriod);
    const priceToMAveRatio = currentPrice / movingAverage;
    
    // Buy signal: price below moving average by threshold
    if (priceToMAveRatio < botParams.buyThreshold && botBalance >= currentPrice * botParams.tradeAmount) {
      const tradeAmount = botParams.tradeAmount;
      const cost = currentPrice * tradeAmount;
      setBotBalance(prevBalance => prevBalance - cost);
      setAssetHolding(prevHolding => prevHolding + tradeAmount);
      
      const newTrade = {
        time: timeElapsed,
        type: 'BUY',
        price: currentPrice,
        amount: tradeAmount,
        total: cost,
        balance: botBalance - cost,
        holdings: assetHolding + tradeAmount
      };
      
      setTrades(prevTrades => [...prevTrades, newTrade]);
    }
    // Sell signal: price above moving average by threshold
    else if (priceToMAveRatio > botParams.sellThreshold && assetHolding >= botParams.tradeAmount) {
      const tradeAmount = botParams.tradeAmount;
      const revenue = currentPrice * tradeAmount;
      setBotBalance(prevBalance => prevBalance + revenue);
      setAssetHolding(prevHolding => prevHolding - tradeAmount);
      
      const newTrade = {
        time: timeElapsed,
        type: 'SELL',
        price: currentPrice,
        amount: tradeAmount,
        total: revenue,
        balance: botBalance + revenue,
        holdings: assetHolding - tradeAmount
      };
      
      setTrades(prevTrades => [...prevTrades, newTrade]);
    }
  };
  
  // Update market data and bot logic
  useEffect(() => {
    if (!isRunning) return;
    
    const interval = setInterval(() => {
      // Generate new market data
      setMarketData(prevData => {
        const lastPrice = prevData.length > 0 ? prevData[prevData.length - 1].price : botParams.initialPrice;
        const newPrice = generateNextPrice(lastPrice);
        const newDataPoint = {
          time: timeElapsed,
          price: newPrice,
          movingAverage: calculateMovingAverage([...prevData, { price: newPrice }], botParams.movingAveragePeriod)
        };
        return [...prevData, newDataPoint];
      });
      
      // Increment simulation time
      setTimeElapsed(prevTime => prevTime + 1);
      
    }, 1000); // Update every second
    
    return () => clearInterval(interval);
  }, [isRunning, timeElapsed]);
  
  // Execute trading logic after market data updates
  useEffect(() => {
    if (isRunning && marketData.length > 0) {
      executeTradingLogic();
    }
  }, [marketData, isRunning]);
  
  // Calculate total portfolio value and P&L
  useEffect(() => {
    if (marketData.length > 0) {
      const currentPrice = marketData[marketData.length - 1].price;
      const assetValue = assetHolding * currentPrice;
      const totalValue = botBalance + assetValue;
      setProfitLoss(totalValue - 10000); // Compared to initial $10,000
    }
  }, [marketData, botBalance, assetHolding]);
  
  // Format currency
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(value);
  };
  
  // Get the chart data (limited to last 50 points for better visibility)
  const chartData = marketData.slice(-50);
  
  // Limit trade history to last 5 trades
  const recentTrades = trades.slice(-5).reverse();
  
  return (
    <Card className="w-full max-w-5xl m-4 ">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Algorithmic Trading Bot Simulation</span>
          <Button 
            onClick={() => setIsRunning(!isRunning)}
            className={isRunning ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"}
          >
            {isRunning ? "Stop Bot" : "Start Bot"}
          </Button>
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="p-4 border rounded-md bg-gray-50">
            <h3 className="text-lg font-semibold mb-2">Bot Performance</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Portfolio Value</p>
                <p className="text-lg font-medium">
                  {marketData.length > 0 
                    ? formatCurrency(botBalance + assetHolding * marketData[marketData.length - 1].price)
                    : formatCurrency(10000)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Profit/Loss</p>
                <p className={`text-lg font-medium ${profitLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {formatCurrency(profitLoss)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Cash Balance</p>
                <p className="text-lg font-medium">{formatCurrency(botBalance)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Holdings</p>
                <p className="text-lg font-medium">{assetHolding.toFixed(2)} units</p>
              </div>
            </div>
          </div>
          
          <div className="p-4 border rounded-md bg-gray-50">
            <h3 className="text-lg font-semibold mb-2">Bot Strategy</h3>
            <div className="text-sm">
              <p><span className="font-medium">Algorithm:</span> Moving Average Crossover</p>
              <p><span className="font-medium">Buy Signal:</span> Price falls {((1 - botParams.buyThreshold) * 100).toFixed(1)}% below MA</p>
              <p><span className="font-medium">Sell Signal:</span> Price rises {((botParams.sellThreshold - 1) * 100).toFixed(1)}% above MA</p>
              <p><span className="font-medium">Period:</span> {botParams.movingAveragePeriod} time units</p>
              <p><span className="font-medium">Trade Size:</span> {botParams.tradeAmount} units per trade</p>
            </div>
          </div>
        </div>
        
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Market Data & Trading Signals</h3>
          <div className="w-full h-64">
            {chartData.length > 0 && (
              <LineChart width={800} height={250} data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" label={{ value: "Time", position: "insideBottomRight", offset: -10 }} />
                <YAxis domain={['auto', 'auto']} />
                <Tooltip formatter={(value) => ['$' + value.toFixed(2)]} />
                <Legend />
                <Line type="monotone" dataKey="price" stroke="#8884d8" name="Price" dot={false} activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="movingAverage" stroke="#82ca9d" name="Moving Avg" dot={false} />
                {recentTrades.filter(trade => chartData.some(point => point.time === trade.time)).map((trade, index) => (
                  <ReferenceLine 
                    key={index}
                    x={trade.time}
                    stroke={trade.type === 'BUY' ? 'green' : 'red'}
                    strokeDasharray="3 3"
                    label={{ value: trade.type, position: 'top', fill: trade.type === 'BUY' ? 'green' : 'red' }}
                  />
                ))}
              </LineChart>
            )}
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-2">Recent Trades</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full border">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2 border">Time</th>
                  <th className="p-2 border">Type</th>
                  <th className="p-2 border">Price</th>
                  <th className="p-2 border">Amount</th>
                  <th className="p-2 border">Total</th>
                </tr>
              </thead>
              <tbody>
                {recentTrades.length > 0 ? (
                  recentTrades.map((trade, index) => (
                    <tr key={index} className={trade.type === 'BUY' ? 'bg-green-50' : 'bg-red-50'}>
                      <td className="p-2 border text-center">T+{trade.time}</td>
                      <td className="p-2 border text-center font-medium">
                        <span className={trade.type === 'BUY' ? 'text-green-600' : 'text-red-600'}>
                          {trade.type}
                        </span>
                      </td>
                      <td className="p-2 border text-right">{formatCurrency(trade.price)}</td>
                      <td className="p-2 border text-right">{trade.amount.toFixed(2)}</td>
                      <td className="p-2 border text-right">{formatCurrency(trade.total)}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="p-4 text-center text-gray-500">No trades executed yet</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AlgorithmicTradingBot;
