import React, { useState } from "react";
import {
  Users,
  Calendar,
  DollarSign,
  ChevronDown,
  Filter,
  Bell,
  Search,
  User,
  ChevronRight,
  MoreHorizontal,
} from "lucide-react";
import Seats from "../ui/Seats";
import { useAnalytics } from "@/contexts/AnalyticsProvider";

interface Event {
  id: number;
  name: string;
  date: string;
  image: string;
  bgColor: string;
}

const Insights: React.FC = () => {
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);
  const [hoveredSegment, setHoveredSegment] = useState<number | null>(null);

  const { overAllAnalysis } = useAnalytics();

  console.log(overAllAnalysis);

  const upcomingEvents: Event[] = [
    {
      id: 1,
      name: "Cynosure Festival",
      date: "24 March 2025",
      image: "🎭",
      bgColor: "bg-indigo-600",
    },
    {
      id: 2,
      name: "Nightor Festival",
      date: "30 March 2025",
      image: "🌙",
      bgColor: "bg-purple-600",
    },
    {
      id: 3,
      name: "Cyndrax Festival",
      date: "03 April 2025",
      image: "🎪",
      bgColor: "bg-green-600",
    },
    {
      id: 4,
      name: "Hyper Festival",
      date: "10 April 2025",
      image: "⚡",
      bgColor: "bg-blue-600",
    },
    {
      id: 5,
      name: "EDM Festival",
      date: "15 April 2025",
      image: "🎵",
      bgColor: "bg-red-600",
    },
  ];

  // Line chart data
  const chartData = [
    { x: 50, y: 180, value: 35000, change: -17.3 },
    { x: 120, y: 120, value: 48000, change: -27.7 },
    { x: 190, y: 200, value: 22000, change: -10.9 },
    { x: 260, y: 80, value: 46000, change: 22.7 },
    { x: 330, y: 140, value: 28000, change: 13.5 },
    { x: 400, y: 160, value: 24500, change: 11.1 },
  ];

  // Generate SVG path for line chart
  const generatePath = (data: typeof chartData) => {
    return data.reduce((path, point, index) => {
      const command = index === 0 ? "M" : "L";
      return `${path} ${command} ${point.x} ${point.y}`;
    }, "");
  };

  // Custom Line Chart Component
  const LineChart = () => (
    <div className="h-64 relative bg-white">
      <svg width="450" height="240" className="w-full h-full">
        {/* Chart line */}
        <path
          d={generatePath(chartData)}
          fill="none"
          stroke="#ef4444"
          strokeWidth="2"
          className="drop-shadow-sm"
        />

        {/* Data points */}
        {chartData.map((point, index) => (
          <g key={index}>
            <circle
              cx={point.x}
              cy={point.y}
              r={hoveredPoint === index ? "6" : "4"}
              fill="#ef4444"
              stroke="#ffffff"
              strokeWidth="2"
              className="cursor-pointer transition-all duration-200 drop-shadow-sm"
              onMouseEnter={() => setHoveredPoint(index)}
              onMouseLeave={() => setHoveredPoint(null)}
            />
            {/* Data labels */}
            <g className="text-xs">
              <text
                x={point.x}
                y={point.y - 20}
                textAnchor="middle"
                className="fill-gray-600 font-medium"
              >
                {point.value.toLocaleString()}
              </text>
              <text
                x={point.x}
                y={point.y - 8}
                textAnchor="middle"
                className={`text-xs font-medium ${
                  point.change > 0 ? "fill-green-500" : "fill-red-500"
                }`}
              >
                {point.change > 0 ? "+" : ""}
                {point.change}%
              </text>
            </g>
          </g>
        ))}

        {/* Tooltip */}
        {hoveredPoint !== null && (
          <g>
            <rect
              x={chartData[hoveredPoint].x - 40}
              y={chartData[hoveredPoint].y - 50}
              width="80"
              height="30"
              rx="4"
              fill="rgba(0, 0, 0, 0.8)"
            />
            <text
              x={chartData[hoveredPoint].x}
              y={chartData[hoveredPoint].y - 35}
              textAnchor="middle"
              className="fill-white text-xs font-medium"
            >
              {chartData[hoveredPoint].value.toLocaleString()} LKR
            </text>
          </g>
        )}
      </svg>
    </div>
  );

  // Custom Doughnut Chart Component
  const DoughnutChart = () => {
    const data = [
      { name: "Event A", value: 450, color: "#7c3aed", percentage: 29.4 },
      { name: "Event B", value: 290, color: "#ef4444", percentage: 19.0 },
      { name: "Event C", value: 170, color: "#f59e0b", percentage: 11.1 },
      { name: "Event D", value: 370, color: "#10b981", percentage: 24.2 },
      { name: "Event E", value: 250, color: "#3b82f6", percentage: 16.3 },
    ];

    const total = data.reduce((sum, item) => sum + item.value, 0);
    let cumulativePercentage = 0;

    const radius = 80;
    const innerRadius = 60;
    const centerX = 100;
    const centerY = 100;

    const createArcPath = (
      startAngle: number,
      endAngle: number,
      outerR: number,
      innerR: number
    ) => {
      const start = polarToCartesian(centerX, centerY, outerR, endAngle);
      const end = polarToCartesian(centerX, centerY, outerR, startAngle);
      const innerStart = polarToCartesian(centerX, centerY, innerR, endAngle);
      const innerEnd = polarToCartesian(centerX, centerY, innerR, startAngle);

      const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

      return [
        "M",
        start.x,
        start.y,
        "A",
        outerR,
        outerR,
        0,
        largeArcFlag,
        0,
        end.x,
        end.y,
        "L",
        innerEnd.x,
        innerEnd.y,
        "A",
        innerR,
        innerR,
        0,
        largeArcFlag,
        1,
        innerStart.x,
        innerStart.y,
        "Z",
      ].join(" ");
    };

    const polarToCartesian = (
      centerX: number,
      centerY: number,
      radius: number,
      angleInDegrees: number
    ) => {
      const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
      return {
        x: centerX + radius * Math.cos(angleInRadians),
        y: centerY + radius * Math.sin(angleInRadians),
      };
    };

    return (
      <div className="relative h-48">
        <svg width="200" height="200" className="w-full h-full">
          {data.map((segment, index) => {
            const percentage = (segment.value / total) * 100;
            const startAngle = cumulativePercentage * 3.6;
            const endAngle = (cumulativePercentage + percentage) * 3.6;

            cumulativePercentage += percentage;

            return (
              <path
                key={index}
                d={createArcPath(startAngle, endAngle, radius, innerRadius)}
                fill={segment.color}
                className={`cursor-pointer transition-all duration-200 ${
                  hoveredSegment === index
                    ? "opacity-90 drop-shadow-lg"
                    : "opacity-100"
                }`}
                onMouseEnter={() => setHoveredSegment(index)}
                onMouseLeave={() => setHoveredSegment(null)}
              />
            );
          })}
        </svg>

        {/* Center text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">1,530</div>
            <div className="text-sm text-gray-500">Total</div>
          </div>
        </div>

        {/* Value labels around the chart */}
        <div className="absolute top-4 left-8 text-sm font-medium text-gray-700">
          250
        </div>
        <div className="absolute top-4 right-8 text-sm font-medium text-gray-700">
          170
        </div>
        <div className="absolute bottom-4 left-8 text-sm font-medium text-gray-700">
          450
          <br />
          <span className="text-xs text-gray-500">29.4%</span>
        </div>
        <div className="absolute bottom-4 right-8 text-sm font-medium text-gray-700">
          370
          <br />
          <span className="text-xs text-gray-500">24.2%</span>
        </div>
        <div className="absolute top-1/2 right-0 transform -translate-y-1/2 text-sm font-medium text-gray-700">
          290
          <br />
          <span className="text-xs text-gray-500">19.0%</span>
        </div>
      </div>
    );
  };

  // const randomEvent = Math.floor(Math.random() * events.length);

  // console.log(randomEvent, "random");

  // console.log(events);
  // useEffect(() => {
  //   getEventsList();
  // }, []);
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-gray-900 text-white">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                <User className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-lg font-semibold">
                  Welcome Rusiru De Silva
                </h1>
                <p className="text-sm text-gray-400">System Administrator</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search ..."
                  className="bg-white text-gray-900 pl-10 pr-4 py-2 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
                />
              </div>
              <button className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700">
                <Bell className="w-5 h-5" />
              </button>
              <button className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700">
                <MoreHorizontal className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="p-6 max-w-7xl mx-auto">
        {/* Stats Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          {/* Events Card */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">
                  EVENTS
                </p>
                <p className="text-2xl font-bold text-blue-600">
                  {overAllAnalysis.overview.totalEvents} Events
                </p>
              </div>
            </div>
          </div>

          {/* Bookings Card */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">
                  BOOKINGS
                </p>
                <p className="text-2xl font-bold text-orange-600">
                  {" "}
                  {overAllAnalysis.overview.totalTickets}{" "}
                </p>
              </div>
            </div>
          </div>

          {/* Revenue Card */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">
                  REVENUE
                </p>
                <p className="text-2xl font-bold text-green-600">
                  {overAllAnalysis.overview.totalRevenue} EGP
                </p>
              </div>
            </div>
          </div>

          {/* Upcoming Events Card */}
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                UPCOMING EVENTS
              </h3>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </div>
            <div className="space-y-3">
              {upcomingEvents.slice(0, 3).map((event) => (
                <div key={event.id} className="flex items-center space-x-3">
                  <div
                    className={`w-8 h-8 ${event.bgColor} rounded-full flex items-center justify-center text-white text-sm`}
                  >
                    {event.image}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-gray-900 truncate">
                      Event : {event.name}
                    </p>
                    <p className="text-xs text-gray-500">Date : {event.date}</p>
                  </div>
                </div>
              ))}
              <button className="text-xs text-blue-600 font-medium hover:text-blue-700">
                See All
              </button>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Net Sales Chart */}
          <div className="lg:col-span-2 bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <h2 className="text-lg font-semibold text-gray-900">
                  NET SALES
                </h2>
                <ChevronDown className="w-4 h-4 text-gray-500" />
              </div>
              <div className="flex items-center space-x-2 bg-gray-900 text-white px-3 py-1 rounded-md text-sm">
                <Filter className="w-4 h-4" />
                <span>Weekly</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Revenue</p>
                <p className="text-lg font-semibold text-gray-900">
                  159,500 LKR
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Tickets</p>
                <p className="text-lg font-semibold text-gray-900">
                  2438 tickets
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Events</p>
                <p className="text-lg font-semibold text-gray-900">32 Events</p>
              </div>
            </div>

            <LineChart />
          </div>

          {/* Customer Engagement */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">
              Customer
              <br />
              Engagement
            </h2>

            <DoughnutChart />

            <div className="space-y-2">
              {[
                { name: "Event A", color: "bg-purple-500" },
                { name: "Event B", color: "bg-red-500" },
                { name: "Event C", color: "bg-yellow-500" },
                { name: "Event D", color: "bg-green-500" },
                { name: "Event E", color: "bg-blue-500" },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-2 text-sm"
                >
                  <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                  <span className="text-gray-700">{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1  gap-6">
          <Seats
            editState={true}
            seatsMap={[
              [0, 0, 0, 0, 0],
              [0, 1, 0, 0, 0, 0],
              [0, 0, 0, 2, 2, 0],
              [0, 0, 1, 0, 0, 0, 0],
              [0, 1, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 2, 0, 0],
              [0, 0, 0, 0, 1, 1, 2, 0, 0],
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default Insights;
