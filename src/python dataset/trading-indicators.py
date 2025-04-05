import numpy as np
import pandas as pd

class TradingIndicators:
    @staticmethod
    def simple_moving_average(data, window=20):
        """
        Calculate Simple Moving Average (SMA)
        
        Args:
        - data: Pandas Series of price data
        - window: Moving average window size
        
        Returns:
        - Pandas Series with moving average
        """
        return data.rolling(window=window).mean()
    
    @staticmethod
    def exponential_moving_average(data, window=20):
        """
        Calculate Exponential Moving Average (EMA)
        
        Args:
        - data: Pandas Series of price data
        - window: Moving average window size
        
        Returns:
        - Pandas Series with exponential moving average
        """
        return data.ewm(span=window, adjust=False).mean()
    
    @staticmethod
    def bollinger_bands(data, window=20, num_std=2):
        """
        Calculate Bollinger Bands
        
        Args:
        - data: Pandas Series of price data
        - window: Moving average window size
        - num_std: Number of standard deviations
        
        Returns:
        - Tuple of (middle band, upper band, lower band)
        """
        middle_band = data.rolling(window=window).mean()
        std_dev = data.rolling(window=window).std()
        
        upper_band = middle_band + (std_dev * num_std)
        lower_band = middle_band - (std_dev * num_std)
        
        return middle_band, upper_band, lower_band
    
    @staticmethod
    def relative_strength_index(data, window=14):
        """
        Calculate Relative Strength Index (RSI)
        
        Args:
        - data: Pandas Series of price data
        - window: RSI calculation window
        
        Returns:
        - Pandas Series with RSI values
        """
        delta = data.diff()
        
        # Separate gains and losses
        gain = delta.clip(lower=0)
        loss = -delta.clip(upper=0)
        
        # Calculate average gains and losses
        avg_gain = gain.rolling(window=window).mean()
        avg_loss = loss.rolling(window=window).mean()
        
        # Calculate relative strength
        rs = avg_gain / avg_loss
        
        # Calculate RSI
        rsi = 100 - (100 / (1 + rs))
        
        return rsi
    
    @staticmethod
    def macd(data, fast_period=12, slow_period=26, signal_period=9):
        """
        Calculate Moving Average Convergence Divergence (MACD)
        
        Args:
        - data: Pandas Series of price data
        - fast_period: Fast EMA period
        - slow_period: Slow EMA period
        - signal_period: Signal line period
        
        Returns:
        - Tuple of (MACD line, Signal line, Histogram)
        """
        fast_ema = data.ewm(span=fast_period, adjust=False).mean()
        slow_ema = data.ewm(span=slow_period, adjust=False).mean()
        
        macd_line = fast_ema - slow_ema
        signal_line = macd_line.ewm(span=signal_period, adjust=False).mean()
        histogram = macd_line - signal_line
        
        return macd_line, signal_line, histogram

class TradingStrategy:
    @staticmethod
    def moving_average_crossover(
        price_data, 
        short_window=50, 
        long_window=200
    ):
        """
        Moving Average Crossover Strategy
        
        Args:
        - price_data: Pandas Series of price data
        - short_window: Short-term moving average window
        - long_window: Long-term moving average window
        
        Returns:
        - Dictionary with trading signals
        """
        # Calculate moving averages
        short_ma = TradingIndicators.simple_moving_average(
            price_data, 
            window=short_window
        )
        long_ma = TradingIndicators.simple_moving_average(
            price_data, 
            window=long_window
        )
        
        # Generate signals
        signals = pd.DataFrame(index=price_data.index)
        signals['price'] = price_data
        signals['short_ma'] = short_ma
        signals['long_ma'] = long_ma
        
        # Buy/Sell signals
        signals['signal'] = 0
        signals.loc[signals['short_ma'] > signals['long_ma'], 'signal'] = 1
        signals.loc[signals['short_ma'] < signals['long_ma'], 'signal'] = -1
        
        return signals
    
    @staticmethod
    def rsi_strategy(
        price_data, 
        rsi_window=14, 
        overbought=70, 
        oversold=30
    ):
        """
        RSI Trading Strategy
        
        Args:
        - price_data: Pandas Series of price data
        - rsi_window: RSI calculation window
        - overbought: Overbought threshold
        - oversold: Oversold threshold
        
        Returns:
        - Dictionary with trading signals
        """
        # Calculate RSI
        rsi = TradingIndicators.relative_strength_index(
            price_data, 
            window=rsi_window
        )
        
        # Generate signals
        signals = pd.DataFrame(index=price_data.index)
        signals['price'] = price_data
        signals['rsi'] = rsi
        
        # Buy/Sell signals
        signals['signal'] = 0
        signals.loc[rsi <= oversold, 'signal'] = 1   # Buy signal
        signals.loc[rsi >= overbought, 'signal'] = -1  # Sell signal
        
        return signals