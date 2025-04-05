import numpy as np
import pandas as pd

class MultiAssetDataGenerator:
    @staticmethod
    def generate_asset_data(
        asset_type='stock', 
        start_price=100, 
        days=365, 
        volatility=0.02, 
        trend=0.0,
        name=None
    ):
        """
        Generate synthetic financial data for different asset types
        
        Parameters:
        - asset_type: Type of asset (stock, crypto, bond, commodity)
        - start_price: Initial price
        - days: Number of trading days
        - volatility: Daily price volatility
        - trend: Overall price trend (positive or negative)
        - name: Optional custom asset name
        
        Returns:
        - pandas DataFrame with price data
        """
        np.random.seed(hash(name) % 2**32 if name else None)
        
        # Asset-specific volatility and trend adjustments
        asset_profiles = {
            'stock': {'base_volatility': 0.02, 'base_trend': 0.0002},
            'crypto': {'base_volatility': 0.05, 'base_trend': 0.0005},
            'bond': {'base_volatility': 0.005, 'base_trend': 0.00005},
            'commodity': {'base_volatility': 0.03, 'base_trend': 0.0001}
        }
        
        profile = asset_profiles.get(asset_type, asset_profiles['stock'])
        
        # Adjust volatility and trend
        daily_volatility = volatility or profile['base_volatility']
        daily_trend = trend or profile['base_trend']
        
        # Generate daily returns
        daily_returns = np.random.normal(
            daily_trend, 
            daily_volatility, 
            days
        )
        
        # Calculate price series
        price_series = [start_price]
        for return_val in daily_returns:
            price_series.append(price_series[-1] * (1 + return_val))
        
        # Create DataFrame
        dates = pd.date_range(start='2023-01-01', periods=days)
        df = pd.DataFrame({
            'date': dates,
            'price': price_series[1:],
            'asset_type': asset_type,
            'name': name or f"{asset_type.capitalize()} Asset"
        })
        
        return df

    @staticmethod
    def generate_multi_asset_dataset(num_assets=4):
        """
        Generate a comprehensive multi-asset dataset
        
        Parameters:
        - num_assets: Number of assets to generate
        
        Returns:
        - Combined DataFrame with multiple assets
        """
        asset_types = ['stock', 'crypto', 'bond', 'commodity']
        
        # Ensure we don't exceed available asset types
        num_assets = min(num_assets, len(asset_types))
        
        datasets = []
        for i in range(num_assets):
            asset_type = asset_types[i]
            asset_name = f"{asset_type.capitalize()} Asset {i+1}"
            
            # Varied starting conditions
            start_price = np.random.uniform(50, 200)
            volatility = np.random.uniform(0.01, 0.05)
            trend = np.random.uniform(-0.0005, 0.0005)
            
            asset_data = MultiAssetDataGenerator.generate_asset_data(
                asset_type=asset_type,
                start_price=start_price,
                volatility=volatility,
                trend=trend,
                name=asset_name
            )
            
            datasets.append(asset_data)
        
        # Combine datasets
        combined_data = pd.concat(datasets, ignore_index=True)
        
        return combined_data