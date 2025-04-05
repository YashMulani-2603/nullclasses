import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const CurrencyConverter = () => {
  // Sample asset data
  const assets = [
    { name: 'Stock Portfolio', valueUSD: 15000 },
    { name: 'Real Estate', valueUSD: 250000 },
    { name: 'Cryptocurrency', valueUSD: 8500 },
    { name: 'Cash Savings', valueUSD: 20000 },
    { name: 'Bonds', valueUSD: 12000 },
  ];

  // Currency conversion rates (as of March 2025)
  const conversionRates = {
    USD: 1,
    EUR: 0.93,
    GBP: 0.79,
    JPY: 151.24,
    CAD: 1.36,
  };

  // State for selected currency
  const [selectedCurrency, setSelectedCurrency] = useState('USD');

  // Format currency based on selected currency
  const formatCurrency = (amount, currency) => {
    const convertedAmount = amount * conversionRates[currency];

    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    return formatter.format(convertedAmount);
  };

  // Calculate total assets value
  const totalAssetsUSD = assets.reduce((total, asset) => total + asset.valueUSD, 0);

  return (
    <Card className="w-full max-w-xl mx-auto p-4 bg-white shadow-lg rounded-lg">
      <CardHeader className="pb-2">
        <CardTitle className="text-2xl font-bold">Asset Convertor</CardTitle>
        <div className="flex items-center mt-2">
          <span className="mr-2 text-sm">Currency Type:</span>
          <select
            value={selectedCurrency}
            onChange={(e) => setSelectedCurrency(e.target.value)}
            className="px-2 py-1 text-sm border rounded-md"
          >
            <option value="USD">USD ($)</option>
            <option value="EUR">EUR (€)</option>
            <option value="GBP">GBP (£)</option>
            <option value="JPY">JPY (¥)</option>
            <option value="CAD">CAD (C$)</option>
          </select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {assets.map((asset, index) => (
            <div key={index} className="flex justify-between p-2 border-b">
              <span className="font-medium">{asset.name}</span>
              <span className="font-mono">{formatCurrency(asset.valueUSD, selectedCurrency)}</span>
            </div>
          ))}

          {/* Total Assets */}
          <div className="flex justify-between p-2 pt-4 border-t-2 border-black">
            <span className="font-bold">Total Assets</span>
            <span className="font-bold font-mono">{formatCurrency(totalAssetsUSD, selectedCurrency)}</span>
          </div>

          {/* Exchange Rate Info */}
          <div className="mt-4 text-sm text-gray-500">
            <p>Exchange rates as of March 2025</p>
            <p>
              USD: $1.00 | EUR: €{conversionRates.EUR} | GBP: £{conversionRates.GBP} | JPY: ¥
              {conversionRates.JPY} | CAD: C${conversionRates.CAD}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CurrencyConverter;
