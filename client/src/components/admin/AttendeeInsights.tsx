
import { Search, Filter, Users, Instagram, Facebook, Twitter, QrCode, ArrowLeft } from 'lucide-react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';

// interface AttendeeInsightsProps {}

const AttendeeInsights = () => {
  // Age distribution data
  const ageData = [
    { day: '01', age18_24: 25, age25_34: 30, age35_44: 20, age45plus: 18 },
    { day: '02', age18_24: 31, age25_34: 25, age35_44: 25, age45plus: 22 },
    { day: '03', age18_24: 28, age25_34: 32, age35_44: 18, age45plus: 19 },
    { day: '04', age18_24: 35, age25_34: 28, age35_44: 22, age45plus: 20 },
    { day: '05', age18_24: 29, age25_34: 26, age35_44: 28, age45plus: 24 },
    { day: '06', age18_24: 25, age25_34: 29, age35_44: 25, age45plus: 21 },
    { day: '07', age18_24: 30, age25_34: 31, age35_44: 20, age45plus: 25 },
    { day: '08', age18_24: 26, age25_34: 33, age35_44: 24, age45plus: 22 },
    { day: '09', age18_24: 32, age25_34: 31, age35_44: 26, age45plus: 28 },
    { day: '10', age18_24: 22, age25_34: 29, age35_44: 32, age45plus: 25 },
    { day: '11', age18_24: 28, age25_34: 26, age35_44: 29, age45plus: 30 },
    { day: '12', age18_24: 29, age25_34: 24, age35_44: 26, age45plus: 24 },
    { day: '13', age18_24: 33, age25_34: 30, age35_44: 28, age45plus: 26 },
    { day: '14', age18_24: 26, age25_34: 33, age35_44: 30, age45plus: 22 },
    { day: '15', age18_24: 30, age25_34: 28, age35_44: 25, age45plus: 28 }
  ];

  // Interests pie chart data
  const interestsData = [
    { name: 'Live Music', value: 50, percentage: '34.5%', color: '#3B82F6' },
    { name: 'Innovation', value: 35, percentage: '24.1%', color: '#10B981' },
    { name: 'EDM Music', value: 25, percentage: '17.2%', color: '#F59E0B' },
    { name: 'Food Festivals', value: 35, percentage: '24.1%', color: '#EF4444' }
  ];

  // Locations bar chart data
  const locationsBarData = [
    { name: 'Colombo', value: 227, color: '#3B82F6', percentage: '36.9%' },
    { name: 'Kandy', value: 123, color: '#EF4444', percentage: '20.0%' },
    { name: 'Galle', value: 143, color: '#EC4899', percentage: '23.3%' },
    { name: 'Jaffna', value: 70, color: '#F59E0B', percentage: '11.4%' },
    { name: 'International', value: 52, color: '#10B981', percentage: '8.5%' }
  ];

  // Social media engagement data
  const socialMediaData = [
    { platform: 'Instagram Mentions', count: 5200, icon: Instagram, color: 'text-pink-500' },
    { platform: 'Facebook Shares', count: 3800, icon: Facebook, color: 'text-blue-600' },
    { platform: 'Twitter Tweets', count: 1200, icon: Twitter, color: 'text-sky-500' },
    { platform: 'Event Check-ins', count: 9500, icon: QrCode, color: 'text-gray-600' }
  ];

  // Location table data
  const locationTableData = [
    { location: 'Colombo', count: 227, color: 'bg-blue-500' },
    { location: 'Kandy', count: 123, color: 'bg-red-500' },
    { location: 'Galle', count: 143, color: 'bg-pink-500' },
    { location: 'Jaffna', count: 70, color: 'bg-yellow-500' },
    { location: 'International', count: 52, color: 'bg-green-500' }
  ];

//   const CustomBarShape = (props: any) => {
//     const { fill, ...rest } = props;
//     return <Bar {...rest} fill={props.payload.color} radius={[4, 4, 0, 0]} />;
//   };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <ArrowLeft size={20} />
            </button>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">
                Attendee Insights - Colombo Music Festival 2025
              </h1>
              <div className="text-sm text-gray-600 mt-1 space-y-1">
                <div>Event Venue: Viharamahadevi Open Air Theater, Colombo</div>
                <div>Event Date: April 12, 2025</div>
                <div>Event Time: 6:00PM - 10:30PM</div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg">
              <Users size={16} className="text-gray-600" />
              <span className="text-sm font-medium">Attendees: 523</span>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Filter size={16} />
              <span>Filter</span>
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Attendee Age Chart */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">ATTENDEE AGE</h2>
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
            
            {/* Age Distribution Visualization */}
            <div className="relative h-64">
              <div className="flex justify-between items-end h-full px-4">
                {ageData.map((day) => (
                  <div key={day.day} className="flex flex-col items-center relative" style={{ width: '6%' }}>
                    {/* Stacked dots visualization */}
                    <div className="flex flex-col-reverse gap-1 mb-2">
                      {/* 18-24 age group */}
                      {Array.from({ length: Math.ceil(day.age18_24 / 5) }).map((_, i) => (
                        <div key={`18-24-${i}`} className="w-3 h-3 rounded-full bg-blue-500"></div>
                      ))}
                      {/* 25-34 age group */}
                      {Array.from({ length: Math.ceil(day.age25_34 / 5) }).map((_, i) => (
                        <div key={`25-34-${i}`} className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      ))}
                      {/* 35-44 age group */}
                      {Array.from({ length: Math.ceil(day.age35_44 / 5) }).map((_, i) => (
                        <div key={`35-44-${i}`} className="w-3 h-3 rounded-full bg-red-500"></div>
                      ))}
                      {/* 45+ age group */}
                      {Array.from({ length: Math.ceil(day.age45plus / 5) }).map((_, i) => (
                        <div key={`45plus-${i}`} className="w-3 h-3 rounded-full bg-green-500"></div>
                      ))}
                    </div>
                    <span className="text-xs text-gray-500">{day.day}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Attendee Interests */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">ATTENDEE INTERESTS</h2>
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

            {/* Attendee Locations Bar Chart */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">ATTENDEE LOCATIONS</h2>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={locationsBarData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <XAxis dataKey="name" axisLine={false} tickLine={false} />
                    <YAxis axisLine={false} tickLine={false} domain={[0, 300]} />
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

        {/* Right Column */}
        <div className="space-y-6">
          {/* Engagement & Social Media Reach */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Engagement & Social Media Reach</h2>
            <p className="text-sm text-gray-600 mb-6">How attendees engaged with the event</p>
            
            <div className="space-y-4">
              {socialMediaData.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <item.icon size={20} className={item.color} />
                    <span className="text-sm font-medium">{item.platform}</span>
                  </div>
                  <span className="text-sm font-bold text-blue-600">
                    {item.count.toLocaleString()}
                  </span>
                </div>
              ))}
              <div className="text-xs text-gray-500 mt-2">
                (QR scans)
              </div>
            </div>
            
            <div className="mt-6 pt-4 border-t">
              <div className="text-center">
                <span className="text-sm text-gray-600">TOTAL COUNT: </span>
                <span className="text-sm font-bold text-blue-600">19700</span>
              </div>
            </div>
          </div>

          {/* Attendee Locations Table */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">ATTENDEE LOCATIONS</h2>
            
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
                <div key={index} className="grid grid-cols-2 border-t border-gray-200">
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