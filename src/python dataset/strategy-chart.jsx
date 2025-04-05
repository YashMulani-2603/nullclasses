import React, { useState, useEffect } from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const StrategyChart = () => {
  const [chartData, setChartData] = useState([]);
  const [indicators, setIndicators] = useState([]);
  const [strategyParams, setStrategyParams] = useState({
    type: 'moving_average',
    shortWindow: 50,
    longWindow: 200,
    rsiWindow: 14,
    overboughtThreshold: 70,
    oversoldThreshold: 30
  });

  // Generate synthetic price data
  const generatePriceData = () => {
    const data = [];
    let price = 100;
    
    for (let i = 0; i < 365; i++) {
      const change = (Math.random() * 0.02) - 0.01;  // +/- 1% daily change
      price *= (1 + change);
      
      data.push({
        date: new Date(2023, 0, i + 1).toLocaleDateString(),
        price: Number(price.toFixed(2))
      });
    }
    
    return data;
  };

  // Calculate indicators
  const calculateIndicators = (priceData) => {
    const indicators = [];
    
    // Simple Moving Averages
    const shortMA = calculateMovingAverage(priceData, strategyParams.shortWindow);
    const longMA = calculateMovingAverage(priceData, strategyParams.longWindow);
    
    // RSI
    const rsi = calculateRSI(priceData, strategyParams.rsiWindow);
    
    // Bollinger Bands
    const { middleBand, upperBand, lowerBand } = calculateBollingerBands(priceData);
    
    // Combine indicators
    indicators.push(
      { name: `${strategyParams.shortWindow}-day MA`, data: shortMA },
      { name: `${strategyParams.longWindow}-day MA`, data: longMA },
      { name: 'RSI', data: rsi },
      { name: 'Bollinger Middle', data: middleBand },
      { name: 'Bollinger Upper', data: upperBand },
      { name: 'Bollinger Lower', data: lowerBand }
    );
    
    return indicators;
  };

  // Helper functions to mimic Python calculations
  const calculateMovingAverage = (priceData, window) => {
    return priceData.map((_, index) => {
      if (index < window - 1) return null;
      const subset = priceData.slice(index - window + 1, index + 1);
      const avg = subset.reduce((sum, item) => sum + item.price, 0) / window;
      return Number(avg.toFixed(2));
    });
  };

  const calculateRSI = (priceData, window) => {
    const gains = [];
    const losses = [];
    
    for (let i = 1; i < priceData.length; i++) {
      const change = priceData[i].price - priceData[i-1].price;
      gains.push(change > 0 ? change : 0);
      losses.push(change < 0 ? -change : 0);
    }
    
    const avgGain = calculateAverage(gains.slice(0, window));
    const avgLoss = calculateAverage(losses.slice(0, window));
    
    const rsi = avgLoss === 0 
      ? 100 
      : 100 - (100 / (1 + (avgGain / avgLoss)));
    
    return priceData.map(() => Number(rsi.toFixed(2)));
  };

  const calculateAverage = (arr) => {
    return arr.reduce((sum, val) => sum + val, 0) / arr.length;
  };

  const calculateBollingerBands = (priceData, window = 20, numStd = 2) => {
    const prices = priceData.map(item => item.price);
    
    const middleBand = calculateMovingAverage(priceData, window);
    
    const stdDevs = prices.map((_, index) => {
      if (index < window - 1) return null;
      const subset = prices.slice(index - window + 1, index + 1);
      const mean = subset.reduce((sum, val) => sum + val, 0) / window;
      const variance = subset.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / window;
      return Math.sqrt(variance);
    });
    
    const upperBand = middleBand.map((mb, index) => 
      mb ? Number((mb + (stdDevs[index] * numStd)).toFixed(2)) : null
    );
    
    const lowerBand = middleBand.map((mb, index) => 
      mb ? Number((mb - (stdDevs[index] * numStd)).toFixed(2)) : null
    );
    
    return { middleBand, upperBand, lowerBand };
  };

  // Recalculate when strategy parameters change
  useEffect(() => {
    const priceData = generatePriceData();
    const calculatedIndicators = calculateIndicators(priceData);
    
    // Combine price data with indicators
    const combinedData = priceData.map((item, index) => {
      const indicatorValues = {};
      calculatedIndicators.forEach(indicator => {
        indicatorValues[indicator.name] = indicator.data[index];
      });
      
      return {
        ...item,
        ...indicatorValues
      };
    });
    
    setChartData(combinedData);
    setIndicators(calculatedIndicators.map(i => i.name));
  }, [strategyParams]);

  const handleStrategyChange = (field, value) => {
    setStrategyParams(prev => ({
      ...prev,
      [field]: Number(value)
    }));
  };

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardHeader>
        <CardTitle>Customizable Trading Indicators</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <Label>Strategy Type</Label>
            <Select 
              value={strategyParams.type}
              onValueChange={(value) => handleStrategyChange('type', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Strategy" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="moving_average">Moving Average</SelectItem>
                <SelectItem value="rsi">RSI</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {strategyParams.type === 'moving_average' && (
            <>
              <div>
                <Label>Short Window</Label>
                <Input 
                  type="number" 
                  value={strategyParams.shortWindow}
                  onChange={(e) => handleStrategyChange('shortWindow', e.target.value)}
                />
              </div>
              <div>
                <Label>Long Window</Label>
                <Input 
                  type="number" 
                  value={strategyParams.longWindow}
                  onChange={(e) => handleStrategyChange('longWindow', e.target.value)}
                />
              </div>
            </>
          )}
          
          {strategyParams.type === 'rsi' && (
            <>
              <div>
                <Label>RSI Window</Label>
                <Input 
                  type="number" 
                  value={strategyParams.rsiWindow}
                  onChange={(e) => handleStrategyChange('rsiWindow', e.target.value)}
                />
              </div>
              <div>
                <Label>Overbought Threshold</Label>
                <Input 
                  type="number" 
                  value={strategyParams.overboughtThreshold}
                  onChange={(e) => handleStrategyChange('overboughtThreshold', e.target.value)}
                />
              </div>
              <div>
                <Label>Oversold Threshold</Label>
                <Input 
                  type="number" 
                  value={strategyParams.oversoldThreshold}
                  onChange={(e) => handleStrategyChange('oversoldThreshold', e.target.value)}
                />
              </div>
            </>
          )}
        </div>

        <ResponsiveContainer width="100%" height={500}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            
            {/* Price Line */}
            <Line 
              type="monotone" 
              dataKey="price" 
              stroke="#8884d8" 
              name="Price" 
            />
            
            {/* Indicator Lines */}
            {indicators.map((indicator, index) => (
              <Line
                key={indicator}
                type="monotone"
                dataKey={indicator}
                stroke={`hsl(${index * 60}, 70%, 50%)`}
                name={indicator}
                dot={false}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default StrategyChart;