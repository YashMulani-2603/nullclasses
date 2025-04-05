import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowUp, ArrowDown, X } from 'lucide-react';

const StockWatchlist = () => {
  const [stocks, setStocks] = useState([
    { symbol: 'AAPL', price: 175.23, change: 2.45, changePercent: 1.42 },
    { symbol: 'GOOGLE', price: 126.57, change: -1.23, changePercent: -0.96 },
    { symbol: 'MSFT', price: 340.12, change: 3.76, changePercent: 1.12 },
 { symbol: 'SPX', price: 175.23, change: 2.45, changePercent: 1.42 },
    { symbol: 'NDQ', price: 126.57, change: -1.23, changePercent: -0.96 },
    { symbol: 'DJI', price: 340.12, change: 3.76, changePercent: 1.12 },
 { symbol: 'VIX', price: 175.23, change: 2.45, changePercent: 1.42 },
    { symbol: 'TSLA', price: 126.57, change: -1.23, changePercent: -0.96 },
    { symbol: 'NFLX', price: 340.12, change: 3.76, changePercent: 1.12 },
 { symbol: 'USOIL', price: 175.23, change: 2.45, changePercent: 1.42 },
    { symbol: 'GOLD', price: 126.57, change: -1.23, changePercent: -0.96 },
    { symbol: 'SILVER', price: 340.12, change: 3.76, changePercent: 1.12 },
 { symbol: 'EURU', price: 175.23, change: 2.45, changePercent: 1.42 },
    { symbol: 'GBPU', price: 126.57, change: -1.23, changePercent: -0.96 },
    { symbol: 'USDJP', price: 340.12, change: 3.76, changePercent: 1.12 },
 { symbol: 'BTCUSD', price: 175.23, change: 2.45, changePercent: 1.42 },
    { symbol: 'ETHUSD', price: 126.57, change: -1.23, changePercent: -0.96 },
  
  ]);

  const [newStock, setNewStock] = useState('');

  const handleAddStock = () => {
    if (newStock.trim()) {
      // In a real app, you'd fetch actual stock data
      const mockStock = {
        symbol: newStock.toUpperCase(),
        price: Math.random() * 500,
        change: Math.random() * 10 * (Math.random() > 0.5 ? 1 : -1),
        changePercent: (Math.random() * 5 * (Math.random() > 0.5 ? 1 : -1)).toFixed(2)
      };
      
      setStocks([...stocks, mockStock]);
      setNewStock('');
    }
  };

  const handleRemoveStock = (symbolToRemove) => {
    setStocks(stocks.filter(stock => stock.symbol !== symbolToRemove));
  };

  return (
    <Card className="w-[25%] fixed right-0 top-0 h-screen overflow-auto rounded-none  bg-(--color-slate-100)">
      <CardHeader>
        <CardTitle className="flex justify-between items-center space-x-2">
          Watchlist
          <div className="flex items-center space-x-2">
            <Input 
              placeholder="Add stock" 
              value={newStock}
              onChange={(e) => setNewStock(e.target.value)}
              className="w-32"
            />
            <Button 
              variant="outline" 
              size="icon" 
              onClick={handleAddStock}
              disabled={!newStock.trim()}
            >
              +
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {stocks.map((stock) => (
            <div 
              key={stock.symbol} 
              className="flex justify-between items-center p-2 border rounded-lg"
            >
              <div>
                <div className="font-bold">{stock.symbol}</div>
                <div className="text-sm text-gray-500">
                  ${stock.price.toFixed(2)}
                </div>
              </div>
              <div className="flex items-center">
                <div className={`flex items-center mr-2 ${stock.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {stock.change >= 0 ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
                  {Math.abs(stock.change).toFixed(2)} ({Math.abs(stock.changePercent)}%)
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => handleRemoveStock(stock.symbol)}
                >
                  <X size={16} />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default StockWatchlist;