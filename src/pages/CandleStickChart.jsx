import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";
import Papa from "papaparse"; 

const CandlestickChart = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    // Fetch and parse CSV data
    const fetchData = async () => {
      const url = "https://raw.githubusercontent.com/plotly/datasets/master/finance-charts-apple.csv";

      // Fetch the CSV file
      const response = await fetch(url);
      const csvData = await response.text();

      // Parse the CSV data
      Papa.parse(csvData, {
        header: true,
        dynamicTyping: true,
        complete: (result) => {
          const data = result.data;
          
          // Prepare candlestick data
          const candlestickData = [
            {
              x: data.map((row) => row.Date),
              open: data.map((row) => row["AAPL.Open"]),
              high: data.map((row) => row["AAPL.High"]),
              low: data.map((row) => row["AAPL.Low"]),
              close: data.map((row) => row["AAPL.Close"]),
              type: "candlestick",
              xaxis: "x",
              yaxis: "y",
              name: "AAPL Stock Price",
            },
          ];
          setChartData(candlestickData);
        },
      });
    };

    fetchData();
  }, []);

  return (
    <div className="p-4">
      <h3>Apple Stock Candlestick Chart</h3>
      {chartData.length > 0 ? (
        <Plot
          data={chartData}
          layout={{
            width: 1024,
            height: 480,
            title: "AAPL Stock Price (Candlestick)",
            xaxis: { title: "Date" },
            yaxis: { title: "Price (USD)" },
          }}
        />
      ) : (
        <p>Loading chart data...</p>
      )}
    </div>
  );
};

export default CandlestickChart;
