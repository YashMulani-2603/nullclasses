import React, { useState, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

// Utility functions for financial calculations
const calculateMovingAverage = (data, period = 5) => {
  return data.map((_, index) => {
    const start = Math.max(0, index - period + 1);
    const subset = data.slice(start, index + 1);
    const avg = subset.reduce((sum, item) => sum + item.close, 0) / subset.length;
    return { ...data[index], movingAverage: avg };
  });
};

const calculateRSI = (data, period = 14) => {
  const rsiData = data.map((_, index) => {
    if (index < period) return { ...data[index], rsi: null };
    
    const subset = data.slice(index - period + 1, index + 1);
    const changes = subset.map((curr, i) => 
      i > 0 ? curr.close - subset[i-1].close : 0
    );
    
    const gains = changes.filter(change => change > 0).reduce((a, b) => a + b, 0) / period;
    const losses = Math.abs(changes.filter(change => change < 0).reduce((a, b) => a + b, 0) / period);
    
    const rs = losses === 0 ? 100 : gains / losses;
    const rsi = 100 - (100 / (1 + rs));
    
    return { ...data[index], rsi };
  });
  
  return rsiData;
};

const calculateVolatility = (data, period = 20) => {
  return data.map((_, index) => {
    if (index < period) return { ...data[index], volatility: null };
    
    const subset = data.slice(index - period + 1, index + 1);
    const returns = subset.map((item, i) => 
      i > 0 ? (item.close - subset[i-1].close) / subset[i-1].close : 0
    );
    
    const variance = returns.reduce((sum, ret) => sum + Math.pow(ret, 2), 0) / period;
    const volatility = Math.sqrt(variance) * 100; // Annualized percentage
    
    return { ...data[index], volatility };
  });
};

const FinancialAnalyticsDashboard = () => {
  // Sample financial data
  const [data] = useState(() => {
    return Array.from({ length: 100 }, (_, i) => ({
      name: `Day ${i+1}`,
      close: 100 + Math.sin(i * 0.1) * 20 + Math.random() * 10
    }));
  });

  // Metric visibility state
  const [showMetrics, setShowMetrics] = useState({
    price: true,
    movingAverage: true,
    rsi: true,
    volatility: true
  });

  // Calculate advanced metrics
  const processedData = useMemo(() => {
    let result = [...data];
    result = calculateMovingAverage(result);
    result = calculateRSI(result);
    result = calculateVolatility(result);
    return result;
  }, [data]);

  // Check if we have valid data for the dashboard
  const lastDataPoint = processedData[processedData.length - 1] || { close: 0, movingAverage: 0, rsi: 0, volatility: 0 };

  return (
    <div className="container mx-auto p-4 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Financial Analytics Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4 mb-4">
            {Object.keys(showMetrics).map((metric) => (
              <div key={metric} className="flex items-center space-x-2">
                <Switch
                  id={`toggle-${metric}`}
                  checked={showMetrics[metric]}
                  onCheckedChange={() => setShowMetrics(prev => ({
                    ...prev,
                    [metric]: !prev[metric]
                  }))}
                />
                <Label htmlFor={`toggle-${metric}`}>
                  {metric.charAt(0).toUpperCase() + metric.slice(1)}
                </Label>
              </div>
            ))}
          </div>

          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={processedData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis yAxisId="left" />
              {(showMetrics.rsi || showMetrics.volatility) && (
                <YAxis yAxisId="right" orientation="right" domain={[0, 100]} />
              )}
              <Tooltip />
              <Legend />
              
              {showMetrics.price && (
                <Line 
                  type="monotone" 
                  dataKey="close" 
                  stroke="#8884d8" 
                  name="Price" 
                  yAxisId="left"
                  connectNulls
                />
              )}
              
              {showMetrics.movingAverage && (
                <Line 
                  type="monotone" 
                  dataKey="movingAverage" 
                  stroke="#82ca9d" 
                  name="Moving Average" 
                  yAxisId="left"
                  connectNulls
                />
              )}
              
              {showMetrics.rsi && (
                <Line 
                  type="monotone" 
                  dataKey="rsi" 
                  stroke="#ffc658" 
                  name="RSI" 
                  yAxisId="right"
                  connectNulls
                />
              )}
              
              {showMetrics.volatility && (
                <Line 
                  type="monotone" 
                  dataKey="volatility" 
                  stroke="#ff7300" 
                  name="Volatility" 
                  yAxisId="right"
                  connectNulls
                />
              )}
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Key Financial Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold mb-2">Last Data Point</h3>
              <p>Price: {lastDataPoint.close?.toFixed(2) || 'N/A'}</p>
              <p>Moving Average: {lastDataPoint.movingAverage?.toFixed(2) || 'N/A'}</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Technical Indicators</h3>
              <p>RSI: {lastDataPoint.rsi?.toFixed(2) || 'N/A'}</p>
              <p>Volatility: {lastDataPoint.volatility?.toFixed(2) || 'N/A'}%</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FinancialAnalyticsDashboard;