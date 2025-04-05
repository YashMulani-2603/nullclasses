import Home from './components/Home.jsx'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Index from './routes/Index.jsx'
import FinancialAnalyticsDashboard from './pages/Dashboard.jsx'
import StrategyChart from './python dataset/strategy-chart.jsx'
import EnhancedTradingNewsFeed from './pages/NewsUpdate.jsx'
import { SentimentChart } from './pages/SentimentChart.jsx'
import BacktestingDashboard from './python dataset/backtesting-component.jsx'
import CandlestickChart from './pages/CandleStickChart.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/signUp.jsx'
import Contact from './pages/Contact.jsx'
import CurrencyConverter from './pages/CurrencyConversion.jsx'
import AlgorithmicTradingBot from './pages/TradingBot.jsx'

function App() {
  return (
    <Router>
      <Routes>
        {/* Parent Route (Layout) */}
        <Route path="/" element={<Index />}>
          {/* Default (index) route */}
          <Route index element={<Home />} />
          <Route path="/dashboard" element={<FinancialAnalyticsDashboard />} />
          <Route path="/tradecraft" element={<StrategyChart />} />
          <Route path="/candlescan" element={<CandlestickChart />} />
          <Route path="/insighthub" element={<SentimentChart />} />
          <Route path="/backtest" element={<BacktestingDashboard />} />
          <Route path="/news" element={<EnhancedTradingNewsFeed />} />
          <Route path="/currency" element={<CurrencyConverter />} />
 <Route path="/trading" element={<AlgorithmicTradingBot />} />
        </Route>

        {/* Separate Routes (Outside Parent Layout) */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  )
}

export default App
