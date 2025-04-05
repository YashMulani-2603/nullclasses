"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import BacktestingDashboard from "@/python dataset/backtesting-component"
const chartData = [
  { date: "2024-04-01", positive: 222,negative: 150,neutral: 150 },
  { date: "2024-04-02", positive: 97, negative: 180,neutral: 150 },
  { date: "2024-04-03", positive: 167, negative: 120 ,neutral: 150},
  { date: "2024-04-04", positive: 242, negative: 260,neutral: 150 },
  { date: "2024-04-05", positive: 373, negative: 290,neutral: 150 },
  { date: "2024-04-06", positive: 301, negative: 340,neutral: 150 },
  { date: "2024-04-07", positive: 245, negative: 180,neutral: 150 },
  { date: "2024-04-08", positive: 409, negative: 320,neutral: 150 },
  { date: "2024-04-09", positive: 59, negative: 110,neutral: 150 },
  { date: "2024-04-10", positive: 261, negative: 190,neutral: 150 },
  { date: "2024-04-11", positive: 327, negative: 350,neutral: 150 },
  { date: "2024-04-12", positive: 292, negative: 210,neutral: 150  },
  { date: "2024-04-13", positive: 342, negative: 380,neutral: 150  },
  { date: "2024-04-14", positive: 137, negative: 220,neutral: 150  },
  { date: "2024-04-15", positive: 120, negative: 170,neutral: 150  },
  { date: "2024-04-16", positive: 138, negative: 190,neutral: 150  },
  { date: "2024-04-17", positive: 446, negative: 360,neutral: 150  },
  { date: "2024-04-18", positive: 364, negative: 410,neutral: 150  },
  { date: "2024-04-19", positive: 243, negative: 180,neutral: 150  },
  { date: "2024-04-20", positive: 89, negative: 150,neutral: 150 },
  { date: "2024-04-21", positive: 137, negative: 200,neutral: 150 },
  { date: "2024-04-22", positive: 224, negative: 170,neutral: 150 },
  { date: "2024-04-23", positive: 138, negative: 230,neutral: 150 },
  { date: "2024-04-24", positive: 387, negative: 290,neutral: 150 },
  { date: "2024-04-25", positive: 215, negative: 250,neutral: 150 },
  { date: "2024-04-26", positive: 75, negative: 130,neutral: 150 },
  { date: "2024-04-27", positive: 383, negative: 420,neutral: 150 },
  { date: "2024-04-28", positive: 122, negative: 180,neutral: 150 },
  { date: "2024-04-29", positive: 315, negative: 240,neutral: 150 },
  { date: "2024-04-30", positive: 454, negative: 380,neutral: 150 },
  { date: "2024-05-01", positive: 165, negative: 220,neutral: 150 },
  { date: "2024-05-02", positive: 293, negative: 310,neutral: 150 },
  { date: "2024-05-03", positive: 247, negative: 190,neutral: 150 },
  { date: "2024-05-04", positive: 385, negative: 420,neutral: 150 },
  { date: "2024-05-05", positive: 481, negative: 390,neutral: 150 },
  { date: "2024-05-06", positive: 498, negative: 520,neutral: 150 },
  { date: "2024-05-07", positive: 388, negative: 300,neutral: 150 },
  { date: "2024-05-08", positive: 149, negative: 210,neutral: 150 },
  { date: "2024-05-09", positive: 227, negative: 180,neutral: 150 },
  { date: "2024-05-10", positive: 293, negative: 330,neutral: 150 },
  { date: "2024-05-11", positive: 335, negative: 270,neutral: 150 },
  { date: "2024-05-12", positive: 197, negative: 240,neutral: 150 },
  { date: "2024-05-13", positive: 197, negative: 160,neutral: 150 },
  { date: "2024-05-14", positive: 448, negative: 490,neutral: 150 },
  { date: "2024-05-15", positive: 473, negative: 380,neutral: 150 },
  { date: "2024-05-16", positive: 338, negative: 400,neutral: 150 },
  { date: "2024-05-17", positive: 499, negative: 420,neutral: 150 },
  { date: "2024-05-18", positive: 315, negative: 350,neutral: 150 },
  { date: "2024-05-19", positive: 235, negative: 180,neutral: 150 },
  { date: "2024-05-20", positive: 177, negative: 230,neutral: 150 },
  { date: "2024-05-21", positive: 82, negative: 140,neutral: 150 },
  { date: "2024-05-22", positive: 81, negative: 120,neutral: 150 },
  { date: "2024-05-23", positive: 252, negative: 290,neutral: 150 },
  { date: "2024-05-24", positive: 294, negative: 220,neutral: 150 },
  { date: "2024-05-25", positive: 201, negative: 250,neutral: 150 },
  { date: "2024-05-26", positive: 213, negative: 170,neutral: 150 },
  { date: "2024-05-27", positive: 420, negative: 460,neutral: 150 },
  { date: "2024-05-28", positive: 233, negative: 190,neutral: 150 },
  { date: "2024-05-29", positive: 78, negative: 130 ,neutral: 150},
  { date: "2024-05-30", positive: 340, negative: 280,neutral: 150 },
  { date: "2024-05-31", positive: 178, negative: 230,neutral: 150 },
  { date: "2024-06-01", positive: 178, negative: 200,neutral: 150 },
  { date: "2024-06-02", positive: 470, negative: 410,neutral: 150 },
  { date: "2024-06-03", positive: 103, negative: 160,neutral: 150 },
  { date: "2024-06-04", positive: 439, negative: 380,neutral: 150 },
  { date: "2024-06-05", positive: 88, negative: 140 ,neutral: 150},
  { date: "2024-06-06", positive: 294, negative: 250,neutral: 150 },
  { date: "2024-06-07", positive: 323, negative: 370,neutral: 150 },
  { date: "2024-06-08", positive: 385, negative: 320,neutral: 150 },
  { date: "2024-06-09", positive: 438, negative: 480,neutral: 150 },
  { date: "2024-06-10", positive: 155, negative: 200,neutral: 150 },
  { date: "2024-06-11", positive: 92, negative: 150 ,neutral: 150},
  { date: "2024-06-12", positive: 492, negative: 420,neutral: 150 },
  { date: "2024-06-13", positive: 81, negative: 130 ,neutral: 150},
  { date: "2024-06-14", positive: 426, negative: 380,neutral: 150 },
  { date: "2024-06-15", positive: 307, negative: 350,neutral: 150 },
  { date: "2024-06-16", positive: 371, negative: 310,neutral: 150 },
  { date: "2024-06-17", positive: 475, negative: 520,neutral: 150 },
  { date: "2024-06-18", positive: 107, negative: 170,neutral: 150 },
  { date: "2024-06-19", positive: 341, negative: 290,neutral: 150 },
  { date: "2024-06-20", positive: 408, negative: 450,neutral: 150 },
  { date: "2024-06-21", positive: 169, negative: 210,neutral: 150 },
  { date: "2024-06-22", positive: 317, negative: 270,neutral: 150 },
  { date: "2024-06-23", positive: 480, negative: 530,neutral: 150 },
  { date: "2024-06-24", positive: 132, negative: 180,neutral: 150 },
  { date: "2024-06-25", positive: 141, negative: 190,neutral: 150 },
  { date: "2024-06-26", positive: 434, negative: 380,neutral: 150 },
  { date: "2024-06-27", positive: 448, negative: 490,neutral: 150 },
  { date: "2024-06-28", positive: 149, negative: 200,neutral: 150 },
  { date: "2024-06-29", positive: 103, negative: 160,neutral: 150 },
  { date: "2024-06-30", positive: 446, negative: 400,neutral: 150 },
]

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  positive: {
    label: "positive",
    color: "hsl(var(--chart-1))",
  },
  negative: {
    label: "negative",
    color: "hsl(var(--chart-2))",
  },
  neutral: {
    label: "neutral",
    color: "hsl(var(--chart-3))",
  },
} 

export function SentimentChart() {
  const [timeRange, setTimeRange] = React.useState("90d")

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date)
    const referenceDate = new Date("2024-06-30")
    let daysToSubtract = 90
    if (timeRange === "30d") {
      daysToSubtract = 30
    } else if (timeRange === "7d") {
      daysToSubtract = 7
    }
    const startDate = new Date(referenceDate)
    startDate.setDate(startDate.getDate() - daysToSubtract)
    return date >= startDate
  })

  return (

 <div className="space-y-6">
   <Card className="border-none rounded-none">
  <CardHeader className="flex items-center gap-2 space-y-0 py-5 sm:flex-row">
    <div className="grid flex-1 gap-1 text-center sm:text-left">
      <CardTitle className="text-xl font-semibold">Sentiment Analysis</CardTitle>
      <CardDescription>
        Showing the Analysis Graph for the last 3 months
      </CardDescription>
    </div>
    <Select value={timeRange} onValueChange={setTimeRange}>
      <SelectTrigger
        className="w-[160px] sm:ml-auto"
        aria-label="Select a value"
      >
        <SelectValue placeholder="Last 3 months" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="90d">Last 3 months</SelectItem>
        <SelectItem value="30d">Last 30 days</SelectItem>
        <SelectItem value="7d">Last 7 days</SelectItem>
      </SelectContent>
    </Select>
  </CardHeader>
  <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
    <ChartContainer
      config={chartConfig}
      className="aspect-auto h-[250px] w-full"
    >
      <AreaChart data={filteredData}>
        <defs>
          <linearGradient id="fillpositive" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="green" stopOpacity={0.8} />
            <stop offset="95%" stopColor="green" stopOpacity={0.1} />
          </linearGradient>

          <linearGradient id="fillnegative" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="red" stopOpacity={0.8} />
            <stop offset="95%" stopColor="red" stopOpacity={0.1} />
          </linearGradient>
          <linearGradient id="fillneutral" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="blue" stopOpacity={0.8} />
            <stop offset="90%" stopColor="blue" stopOpacity={0.1} />
          </linearGradient>
        </defs>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="date"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          minTickGap={32}
          tickFormatter={(value) => {
            const date = new Date(value);
            return date.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            });
          }}
        />
        <ChartTooltip
          cursor={false}
          content={
            <ChartTooltipContent
              labelFormatter={(value) => {
                return new Date(value).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
              indicator="dot"
            />
          }
        />
        <Area
          dataKey="negative"
          type="natural"
          fill="url(#fillnegative)"
          stroke=""
          stackId="a"
        />
        <Area
          dataKey="positive"
          type="natural"
          fill="url(#fillpositive)"
          stroke=""
          stackId="a"
        />
        <Area
          dataKey="neutral"
          type="natural"
          fill="url(#fillneutral)"
          stroke=""
          stackId="a"
        />
        <ChartLegend content={<ChartLegendContent />} />
      </AreaChart>
    </ChartContainer>
  </CardContent>
</Card>

 <BacktestingDashboard/>
</div>
   

  );
}
