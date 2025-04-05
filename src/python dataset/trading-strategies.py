class TradingStrategy:
    def __init__(self, initial_capital=10000):
        self.initial_capital = initial_capital
        self.current_capital = initial_capital
        self.trades = []
    
    def simple_moving_average_strategy(self, data, short_window=10, long_window=50):
        """
        Basic Moving Average Crossover Strategy
        
        Args:
        - data: DataFrame with historical stock prices
        - short_window: Short-term moving average window
        - long_window: Long-term moving average window
        
        Returns:
        - Performance metrics dictionary
        """
        data['short_ma'] = data['close'].rolling(window=short_window).mean()
        data['long_ma'] = data['close'].rolling(window=long_window).mean()
        
        # Initialize trading variables
        position = 0
        capital = self.initial_capital
        shares = 0
        trade_history = []
        
        for i in range(long_window, len(data)):
            # Generate buy/sell signals
            if data['short_ma'][i] > data['long_ma'][i] and position == 0:
                # Buy signal
                shares = capital // data['close'][i]
                trade_value = shares * data['close'][i]
                capital -= trade_value
                position = 1
                trade_history.append({
                    'date': data['date'][i],
                    'type': 'BUY',
                    'price': data['close'][i],
                    'shares': shares
                })
            
            elif data['short_ma'][i] < data['long_ma'][i] and position == 1:
                # Sell signal
                sell_value = shares * data['close'][i]
                capital += sell_value
                position = 0
                trade_history.append({
                    'date': data['date'][i],
                    'type': 'SELL',
                    'price': data['close'][i],
                    'shares': shares
                })
        
        # Final position liquidation
        if position == 1:
            capital += shares * data['close'].iloc[-1]
        
        return {
            'final_capital': capital,
            'total_return_percent': ((capital - self.initial_capital) / self.initial_capital) * 100,
            'trades': trade_history
        }