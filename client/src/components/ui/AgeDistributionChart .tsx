import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";

interface AgeGroupData {
  name: string;
  count: number;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ value: number; payload: AgeGroupData }>;
  label?: string;
}

const initialData: AgeGroupData[] = [
  { name: "Under 18", count: 15 },
  { name: "18-24", count: 35 },
  { name: "25-34", count: 42 },
  { name: "35-44", count: 28 },
  { name: "45-54", count: 20 },
  { name: "55-64", count: 12 },
  { name: "65+", count: 8 },
];

const CustomTooltip: React.FC<CustomTooltipProps> = ({
  active,
  payload,
  label,
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-4 bg-white border border-gray-200 shadow-md rounded-lg">
        <p className="font-bold text-gray-800">{label}</p>
        <p className="text-blue-600">
          Attendees: <span className="font-semibold">{payload[0].value}</span>
        </p>
        <p className="text-gray-500 text-sm">
          {(
            (payload[0].value /
              initialData.reduce((sum, item) => sum + item.count, 0)) *
            100
          ).toFixed(1)}
          % of total
        </p>
      </div>
    );
  }
  return null;
};

const AgeDistributionChart: React.FC = () => {
  const [data] = useState<AgeGroupData[]>(initialData);
  //   const [newAgeGroup, setNewAgeGroup] = useState<string>("");
  //   const [newCount, setNewCount] = useState<string>("");

  const colors = [
    "#8884d8",
    "#83a6ed",
    "#8dd1e1",
    "#82ca9d",
    "#a4de6c",
    "#d0ed57",
    "#ffc658",
  ];

  return (
    <div className="mx-auto space-y-4 rounded-xl">
      <h1 className="text-start text-3xl font-bold text-gray-800 mb-2">
        Event Attendees Age Distribution
      </h1>
      <p className="text-start text-gray-600 mb-8">
        Distribution of attendees across different age groups
      </p>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-2/3">
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 70,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="name"
                  angle={-45}
                  textAnchor="end"
                  height={60}
                />
                <YAxis
                  label={{
                    value: "Number of Attendees",
                    angle: -90,
                    position: "insideLeft",
                    offset: -10,
                  }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend verticalAlign="top" height={36} />
                <Bar name="Age Groups" dataKey="count">
                  {data.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={colors[index % colors.length]}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgeDistributionChart;
