import {
  Users,
  Instagram,
  Facebook,
  Twitter,
  QrCode,
  ArrowLeft,
} from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";
import AgeDistributionChart from "../ui/AgeDistributionChart ";
import { useNavigate, useParams } from "react-router-dom";

import { useEvents } from "@/contexts/EventsProvider";
import { useEffect, useState } from "react";
import { useAnalytics } from "@/contexts/AnalyticsProvider";

const AttendeeInsights = () => {
  const { eventDetails, getEventById } = useEvents();
  const { overAllAnalysis } = useAnalytics();

  const params = useParams();
  const eventId = params?.id as string;

  const [interestsData, setInterestsData] = useState(
    overAllAnalysis.locationsBarData
  );


  const [locationsBarData, setLocationsBarData] = useState(
    overAllAnalysis.locationsBarData
  );


  const socialMediaData = [
    {
      platform: "Instagram Mentions",
      count: 5200,
      icon: Instagram,
      color: "text-pink-500",
    },
    {
      platform: "Facebook Shares",
      count: 3800,
      icon: Facebook,
      color: "text-blue-600",
    },
    {
      platform: "Twitter Tweets",
      count: 1200,
      icon: Twitter,
      color: "text-sky-500",
    },
    {
      platform: "Event Check-ins",
      count: 9500,
      icon: QrCode,
      color: "text-gray-600",
    },
  ];

  const navigate = useNavigate();

  
  const locationTableData = overAllAnalysis.locationTableData;

  useEffect(() => {
    getEventById(eventId);
    setInterestsData(overAllAnalysis.interestsData);
    setLocationsBarData(overAllAnalysis.locationsBarData);
  }, [eventId]);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {eventDetails && (
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate(-1)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <ArrowLeft size={20} />
              </button>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">
                  {eventDetails?.name}
                </h1>
                <div className="text-sm text-gray-600 mt-1 space-y-1">
                  <div>
                    Event Venue: {eventDetails?.venue.address.state},{" "}
                    {eventDetails?.venue.address.city},{" "}
                    {eventDetails?.venue.address.street}{" "}
                  </div>
                  <div>
                    Event Date:{" "}
                    {new Date(eventDetails?.datetime).toLocaleDateString()}
                  </div>
                  <div>
                    Event Time:{" "}
                    {new Date(eventDetails?.datetime).toLocaleTimeString()}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg">
                <Users size={16} className="text-gray-600" />
                <span className="text-sm font-medium">
                  Attendees:{" "}
                  {eventDetails?.seatsAmount - eventDetails?.availableSeats}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              ATTENDEE AGE
            </h2>
            <div className="flex items-center gap-6 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                <span className="text-sm text-gray-600">18 - 24</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <span className="text-sm text-gray-600">25 - 34</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <span className="text-sm text-gray-600">35 - 44</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-sm text-gray-600">45 +</span>
              </div>
            </div>


            <AgeDistributionChart />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                ATTENDEE INTERESTS
              </h2>
              <div className="relative h-48 mb-4">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={interestsData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      dataKey="value"
                    >
                      {interestsData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                    <span className="text-sm">Live Music 🎵</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">50</div>
                    <div className="text-xs text-gray-500">34.5%</div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="text-sm">Innovation 🚀</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">35</div>
                    <div className="text-xs text-gray-500">24.1%</div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <span className="text-sm">EDM Music 🎧</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">25</div>
                    <div className="text-xs text-gray-500">17.2%</div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <span className="text-sm">Food Festivals 🍕</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">35</div>
                    <div className="text-xs text-gray-500">24.1%</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                ATTENDEE LOCATIONS
              </h2>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={locationsBarData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <XAxis dataKey="name" axisLine={false} tickLine={false} />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      domain={[0, 300]}
                    />
                    <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                      {locationsBarData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 flex justify-between text-xs text-gray-500">
                {locationsBarData.map((item) => (
                  <div key={item.name} className="text-center">
                    <div className="font-medium text-black">{item.value}</div>
                    <div>{item.percentage}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        
        <div className="space-y-6">
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              Engagement & Social Media Reach
            </h2>
            <p className="text-sm text-gray-600 mb-6">
              How attendees engaged with the event
            </p>

            <div className="space-y-4">
              {socialMediaData.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <item.icon size={20} className={item.color} />
                    <span className="text-sm font-medium">{item.platform}</span>
                  </div>
                  <span className="text-sm font-bold text-blue-600">
                    {item.count.toLocaleString()}
                  </span>
                </div>
              ))}
              <div className="text-xs text-gray-500 mt-2">(QR scans)</div>
            </div>

            <div className="mt-6 pt-4 border-t">
              <div className="text-center">
                <span className="text-sm text-gray-600">TOTAL COUNT: </span>
                <span className="text-sm font-bold text-blue-600">19700</span>
              </div>
            </div>
          </div>

          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              ATTENDEE LOCATIONS
            </h2>

            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <div className="grid grid-cols-2 bg-gray-50">
                <div className="px-4 py-3 text-sm font-medium text-center border-r border-gray-200">
                  Location
                </div>
                <div className="px-4 py-3 text-sm font-medium text-center">
                  Count
                </div>
              </div>

              {locationTableData.map((item, index) => (
                <div
                  key={index}
                  className="grid grid-cols-2 border-t border-gray-200"
                >
                  <div className="px-4 py-3 text-sm border-r border-gray-200">
                    {item.location}
                  </div>
                  <div className="px-4 py-3 text-sm text-center flex items-center justify-center gap-2">
                    <span>{item.count}</span>
                    <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendeeInsights;
