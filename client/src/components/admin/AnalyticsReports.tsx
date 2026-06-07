import { useAnalytics } from "@/contexts/AnalyticsProvider";
import Spinner from "@/components/ui/Spinner";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const AnalyticsReports = () => {
  const { overAllAnalysis, revenueAnalysis, loading, error } = useAnalytics();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-red-500">
        Error loading analytics: {error}
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Analytics Reports</h1>
        <p className="text-gray-500">Revenue and performance reports</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border p-6">
          <h2 className="text-lg font-semibold mb-4">Revenue by Period</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revenueAnalysis.revenueByPeriod as unknown as Record<string, unknown>[]}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="period" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="revenue" fill="#3B82F6" name="Revenue" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg border p-6">
          <h2 className="text-lg font-semibold mb-4">Revenue by Category</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={revenueAnalysis.revenueByCategory as unknown as Record<string, unknown>[]}
                dataKey="revenue"
                nameKey="_id"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {revenueAnalysis.revenueByCategory.map((_, index) => (
                  <Cell key={index} fill={["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"][index % 5]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg border p-6 lg:col-span-2">
          <h2 className="text-lg font-semibold mb-4">Top Events by Revenue</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-3">Event</th>
                  <th className="text-left py-2 px-3">Category</th>
                  <th className="text-right py-2 px-3">Tickets Sold</th>
                  <th className="text-right py-2 px-3">Revenue</th>
                </tr>
              </thead>
              <tbody>
                {overAllAnalysis.topEventsByRevenue.map((event, i) => (
                  <tr key={i} className="border-b hover:bg-gray-50">
                    <td className="py-2 px-3 font-medium">{event.name}</td>
                    <td className="py-2 px-3 text-gray-500">{event.category}</td>
                    <td className="py-2 px-3 text-right">{event.ticketsSold}</td>
                    <td className="py-2 px-3 text-right">${event.revenue.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsReports;