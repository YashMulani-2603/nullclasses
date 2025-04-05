import { useState, useEffect } from 'react';

const EnhancedTradingNewsFeed = () => {
  const [newsItems, setNewsItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Large pool of pre-set news articles for random selection
  const newsPool = [
    // Market Movements
    {
      id: 1,
      title: "S&P 500 Climbs 1.2% on Strong Economic Data",
      summary: "Better-than-expected employment figures boosted investor confidence, sending major indices higher.",
      source: "Market Watch",
      category: "Market Movement"
    },
    {
      id: 2,
      title: "Nasdaq Falls Following Tech Sector Earnings Miss",
      summary: "Major tech companies reported lower-than-expected quarterly results, triggering a sector-wide selloff.",
      source: "CNBC",
      category: "Market Movement"
    },
    {
      id: 3,
      title: "European Markets Rally as ECB Holds Rates Steady",
      summary: "The Euro Stoxx 50 gained 0.8% after the European Central Bank maintained current interest rate levels.",
      source: "Financial Times",
      category: "Market Movement"
    },
    // Technical Analysis
    {
      id: 4,
      title: "TSLA Forms Golden Cross Pattern, Signaling Bullish Trend",
      summary: "Technical analysts note the 50-day moving average crossed above the 200-day MA, a traditionally bullish signal.",
      source: "Trading View",
      category: "Technical Analysis"
    },
    {
      id: 5,
      title: "Bitcoin Approaches Key Resistance Level at $96,500",
      summary: "Crypto traders watch closely as BTC tests a critical technical level that could determine the next major move.",
      source: "CoinDesk",
      category: "Technical Analysis"
    },
    {
      id: 6,
      title: "Dollar Index Forms Head and Shoulders Pattern",
      summary: "Currency traders identify bearish reversal pattern forming in the USD index against major currencies.",
      source: "Forex Live",
      category: "Technical Analysis"
    },
    // Economic Indicators
    {
      id: 7,
      title: "Inflation Rate Drops to 2.3%, Boosting Market Sentiment",
      summary: "Latest CPI figures show inflation continuing to cool, increasing likelihood of rate cuts.",
      source: "Bloomberg",
      category: "Economic Indicator"
    },
    {
      id: 8,
      title: "Fed Minutes Reveal Split Opinion on Rate Path",
      summary: "FOMC meeting notes show disagreement among members about the timing of potential rate adjustments.",
      source: "Reuters",
      category: "Economic Indicator"
    },
    {
      id: 9,
      title: "Manufacturing PMI Beats Expectations, Signals Expansion",
      summary: "The latest Purchasing Managers' Index came in at 53.2, indicating continued manufacturing sector growth.",
      source: "Economic Times",
      category: "Economic Indicator"
    },
    // Sector Performance
    {
      id: 10,
      title: "Energy Sector Outperforms as Oil Tops $95/barrel",
      summary: "Rising global tensions and supply constraints push crude prices higher, benefiting energy stocks.",
      source: "Oil Price",
      category: "Sector News"
    },
    {
      id: 11,
      title: "Healthcare Stocks Slump on Regulatory Concerns",
      summary: "Proposed pharmaceutical pricing legislation weighed heavily on healthcare companies.",
      source: "Health Investor",
      category: "Sector News"
    },
    {
      id: 12,
      title: "Financial Stocks Rally as Yield Curve Steepens",
      summary: "Banks and financial institutions benefit from widening spread between short and long-term rates.",
      source: "Financial News",
      category: "Sector News"
    },
    // Trading Strategies
    {
      id: 13,
      title: "Volatility Trading Strategy Gains Popularity Amid Uncertain Markets",
      summary: "Traders increasingly adopt VIX-based strategies to capitalize on market swings during earnings season.",
      source: "Strategy Insider",
      category: "Trading Strategy"
    },
    {
      id: 14,
      title: "Momentum Trading Delivers Strong Q1 Returns, Study Shows",
      summary: "Research indicates momentum-based strategies outperformed value investing in the first quarter.",
      source: "Trading Journal",
      category: "Trading Strategy"
    },
    {
      id: 15,
      title: "Pairs Trading Strategy Effective in Current Sector Rotation",
      summary: "Market neutral approach helps traders capitalize on relative performance during sector shifts.",
      source: "Hedge Weekly",
      category: "Trading Strategy"
    },
    // Company News
    {
      id: 16,
      title: "Apple Announces $50B Stock Buyback Program",
      summary: "Tech giant's board approves massive share repurchase plan, sending stock up 3% in after-hours trading.",
      source: "Tech Investor",
      category: "Company News"
    },
    {
      id: 17,
      title: "Amazon Expands Cloud Services with $5B Investment",
      summary: "E-commerce leader announces major AWS infrastructure expansion targeting AI capabilities.",
      source: "Cloud News",
      category: "Company News"
    },
    {
      id: 18,
      title: "Tesla Beats Delivery Estimates, Shares Jump 5%",
      summary: "EV manufacturer reports quarterly deliveries exceeding analyst expectations by 12%.",
      source: "Auto Sector News",
      category: "Company News"
    },
    // Commodity Markets
    {
      id: 19,
      title: "Gold Surges to Record High on Geopolitical Tensions",
      summary: "Safe-haven demand pushes precious metal above $2,900/oz as global uncertainties increase.",
      source: "Precious Metals Digest",
      category: "Commodities"
    },
    {
      id: 20,
      title: "Natural Gas Prices Plummet 8% on Mild Weather Forecast",
      summary: "Futures contracts drop as meteorologists predict warmer-than-average temperatures reducing heating demand.",
      source: "Energy Report",
      category: "Commodities"
    }
  ];

  // Get random subset of news articles
  const getRandomNews = () => {
    // Shuffle array using Fisher-Yates algorithm
    const shuffled = [...newsPool];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    
    // Take first 5-8 articles (random number)
    const count = Math.floor(Math.random() * 4) + 5; // 5-8 articles
    
    // Add timestamp to make them look recent
    return shuffled.slice(0, count).map((article, index) => {
      // Create timestamps within the last 24 hours
      const hoursAgo = Math.floor(Math.random() * 24);
      const minutesAgo = Math.floor(Math.random() * 60);
      const timestamp = new Date();
      timestamp.setHours(timestamp.getHours() - hoursAgo);
      timestamp.setMinutes(timestamp.getMinutes() - minutesAgo);
      
      return {
        ...article,
        uniqueId: `${article.id}-${Date.now()}-${index}`, // Ensure uniqueness for React keys
        timestamp: timestamp.toISOString()
      };
    });
  };

  // Simulating news updates every 30 seconds
  useEffect(() => {
    // Initial load
    setNewsItems(getRandomNews());
    setLoading(false);
    
    // Update every 30 seconds
    const updateInterval = setInterval(() => {
      setLoading(true);
      
      // Short loading delay for visual feedback (500ms)
      setTimeout(() => {
        setNewsItems(getRandomNews());
        setLastUpdated(new Date());
        setLoading(false);
      }, 500);
    }, 30000); // 30 seconds
    
    return () => clearInterval(updateInterval);
  }, []);

  // Format timestamp to readable format
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Calculate time since last update
  const getTimeSinceUpdate = () => {
    const seconds = Math.floor((new Date() - lastUpdated) / 1000);
    return `${seconds}s ago`;
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-white shadow-md rounded-lg overflow-hidden mt-8">
      <div className="bg-gray-800 text-white px-4 py-3 flex justify-between items-center">
        <h2 className="text-lg font-semibold">Live Market News</h2>
        <div className="flex items-center space-x-2">
          <span className="text-xs text-gray-300">Updated: {getTimeSinceUpdate()}</span>
          <div className={`w-2 h-2 rounded-full ${loading ? 'bg-yellow-400' : 'bg-green-400'}`}></div>
        </div>
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center h-20 bg-gray-50">
          <div className="animate-pulse flex space-x-2">
            <div className="h-2 w-2 bg-blue-400 rounded-full"></div>
            <div className="h-2 w-2 bg-blue-400 rounded-full"></div>
            <div className="h-2 w-2 bg-blue-400 rounded-full"></div>
          </div>
        </div>
      ) : null}
      
      <div className="divide-y divide-gray-200">
        {newsItems.map((item) => (
          <div key={item.uniqueId} className="p-4 hover:bg-gray-50 transition">
            <div className="flex justify-between items-start">
              <h3 className="font-medium text-blue-800">{item.title}</h3>
              <span className={`text-xs rounded px-2 py-1 ${getCategoryColor(item.category)}`}>
                {item.category}
              </span>
            </div>
            <p className="text-sm text-gray-600 mt-1">{item.summary}</p>
            <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
              <span>{item.source}</span>
              <span>{formatDate(item.timestamp)}</span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="bg-gray-100 px-4 py-2 text-xs text-gray-500 flex justify-between">
        <span>Next update in {30 - Math.floor((new Date() - lastUpdated) / 1000)}s</span>
        <span>Powered by Trading News API</span>
      </div>
    </div>
  );
};

// Helper function to get category colors
const getCategoryColor = (category) => {
  switch (category) {
    case "Market Movement":
      return "bg-blue-100 text-blue-800";
    case "Technical Analysis":
      return "bg-purple-100 text-purple-800";
    case "Economic Indicator":
      return "bg-green-100 text-green-800";
    case "Sector News":
      return "bg-yellow-100 text-yellow-800";
    case "Trading Strategy":
      return "bg-indigo-100 text-indigo-800";
    case "Company News":
      return "bg-red-100 text-red-800";
    case "Commodities":
      return "bg-amber-100 text-amber-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export default EnhancedTradingNewsFeed;