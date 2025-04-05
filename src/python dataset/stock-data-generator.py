import numpy as np
import pandas as pd

def generate_historical_stock_data(start_price=100, days=365, volatility=0.02):
    """
    Generate synthetic stock price data with random walk
    
    Parameters:
    - start_price: Initial stock price
    - days: Number of trading days
    - volatility: Daily price volatility
    
    Returns:
    - pandas DataFrame with date, open, high, low, close prices
    """
    np.random.seed(42)  # For reproducibility
    
    # Generate daily returns
    daily_returns = np.random.normal(0, volatility, days)
    
    # Calculate price series
    price_series = [start_price]
    for return_val in daily_returns:
        price_series.append(price_series[-1] * (1 + return_val))
    
    # Create DataFrame
    dates = pd.date_range(start='2023-01-01', periods=days)
    df = pd.DataFrame({
        'date': dates,
        'open': price_series[:-1],
        'close': price_series[1:],
        'high': [p * 1.01 for p in price_series[1:]],
        'low': [p * 0.99 for p in price_series[1:]]
    })
    
    return df