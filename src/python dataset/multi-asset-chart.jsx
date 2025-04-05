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
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';

// Asset color mapping
const ASSET_COLORS = {
  'Stock Asset 1': '#1E90FF',    // Dodger Blue
  'Crypto Asset 1': '#FFD700',   // Gold
  'Bond Asset 1': '#8A2BE2',     // Blue Violet
  'Commodity Asset 1': '#FF6347',// Tomato
};

const MultiAssetChart = () => {
  const [chartData, setChartData] = useState([]);
  const [displayedAssets, setDisplayedAssets] = useState([]);
  const [chartType, setChartType] = useState('normalized');

  // Data generation function (mimicking Python's generator)
  const generateMultiAssetData = () => {
    const assets = [
      { name: 'Stock Asset 1', type: 'stock', start: 100, volatility: 0.02 },
      { name: 'Crypto Asset 1', type: 'crypto', start: 50, volatility: 0.05 },
      { name: 'Bond Asset 1', type: 'bond', start: 200, volatility: 0.01 },
      { name: 'Commodity Asset 1', type: 'commodity', start: 75, volatility: 0.03 }
    ];

    const days = 365;
    const combinedData = {};

    assets.forEach(asset => {
      let price = asset.start;
      const assetData = [];

      for (let i = 0; i < days; i++) {
        const change = (Math.random() * asset.volatility * 2) - asset.volatility;
        price *= (1 + change);

        // Initialize or push to combined data
        if (!combinedData[i]) {
          combinedData[i] = { date: new Date(2023, 0, i + 1).toLocaleDateString() };
        }
        combinedData[i][asset.name] = Number(price.toFixed(2));
      }
    });

    return Object.values(combinedData);
  };

  // Normalize data to start at 100
  const normalizeData = (data) => {
    if (data.length === 0) return [];

    const normalizedData = data.map(day => {
      const normalizedDay = { date: day.date };
      
      Object.keys(day)
        .filter(key => key !== 'date')
        .forEach(assetName => {
          const firstDayPrice = data[0][assetName];
          normalizedDay[assetName] = firstDayPrice 
            ? Number(((day[assetName] / firstDayPrice) * 100).toFixed(2)) 
            : null;
        });
      
      return normalizedDay;
    });

    return normalizedData;
  };

  useEffect(() => {
    const data = generateMultiAssetData();
    const normalizedData = normalizeData(data);
    setChartData(chartType === 'normalized' ? normalizedData : data);
    
    // Default to displaying all assets
    const allAssets = Object.keys(data[0])
      .filter(key => key !== 'date');
    setDisplayedAssets(allAssets);
  }, [chartType]);

  const toggleAsset = (asset) => {
    setDisplayedAssets(prev => 
      prev.includes(asset)
        ? prev.filter(a => a !== asset)
        : [...prev, asset]
    );
  };

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardHeader>
        <CardTitle>Multi-Asset Comparison Chart</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-4 mb-4">
          <Select 
            value={chartType} 
            onValueChange={setChartType}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Chart Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="normalized">Normalized View</SelectItem>
              <SelectItem value="absolute">Absolute Prices</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex space-x-2">
            {Object.keys(ASSET_COLORS).map(asset => (
              <Button
                key={asset}
                variant={displayedAssets.includes(asset) ? 'default' : 'outline'}
                onClick={() => toggleAsset(asset)}
                style={{ 
                  backgroundColor: displayedAssets.includes(asset) 
                    ? ASSET_COLORS[asset] 
                    : 'transparent' 
                }}
              >
                {asset}
              </Button>
            ))}
          </div>
        </div>

        <ResponsiveContainer width="100%" height={500}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis 
              label={{ 
                value: chartType === 'normalized' ? 'Relative Performance (%)' : 'Price', 
                angle: -90, 
                position: 'insideLeft' 
              }} 
            />
            <Tooltip />
            <Legend />

            {displayedAssets.map(asset => (
              <Line
                key={asset}
                type="monotone"
                dataKey={asset}
                stroke={ASSET_COLORS[asset]}
                strokeWidth={2}
                dot={false}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>

        <div className="mt-4 text-sm text-gray-600">
          <p>
            {chartType === 'normalized' 
              ? 'Normalized View: All assets start at 100% for easy comparison' 
              : 'Absolute Prices: Showing actual price movements'}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default MultiAssetChart;