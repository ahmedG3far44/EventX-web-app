import React, { useState, useMemo } from "react";
import {
  Search,
  Filter,
  Calendar,
  Plus,
  TrendingUp,
} from "lucide-react";
import EventCard from "../ui/EventCard";

export interface Event {
  id: string;
  title: string;
  venue: string;
  date: string;
  time: string;
  price: number;
  sold: number;
  capacity: number;
  status: "upcoming" | "pending" | "closed";
  revenue: number;
}

const ManageEvents: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("status");
  const [selectedDate, setSelectedDate] = useState("");
  console.log(selectedDate, setSelectedDate);
  // Sample data based on your interface
  const events: Event[] = [
    {
      id: "1",
      title: "Colombo Music Festival",
      venue: "Open Air Theater, Colombo",
      date: "12 April 2025",
      time: "09:00PM to 11:30PM",
      price: 5000,
      sold: 2500,
      capacity: 1800,
      status: "upcoming",
      revenue: 5000000,
    },
    {
      id: "2",
      title: "Lanka Supercar Show",
      venue: "Lanka Supercar Show",
      date: "15 April 2025",
      time: "09:00PM to 11:30PM",
      price: 3000,
      sold: 2500,
      capacity: 0,
      status: "pending",
      revenue: 3000000,
    },
    {
      id: "3",
      title: "Rock & Roll Night",
      venue: "Open Air Theater, Colombo",
      date: "03 March 2025",
      time: "09:00PM to 11:30PM",
      price: 3000,
      sold: 1500,
      capacity: 1500,
      status: "closed",
      revenue: 3000000,
    },
    {
      id: "4",
      title: "Galle Literary Fair",
      venue: "Open Air Theater, Galle",
      date: "14 April 2025",
      time: "09:00AM to 12:00PM",
      price: 2000,
      sold: 1500,
      capacity: 600,
      status: "upcoming",
      revenue: 2000000,
    },
    {
      id: "5",
      title: "Kandy Art Exhibition",
      venue: "Open Air Theater, Colombo",
      date: "19 April 2025",
      time: "09:00PM to 11:30PM",
      price: 4000,
      sold: 750,
      capacity: 0,
      status: "pending",
      revenue: 4000000,
    },
    {
      id: "6",
      title: "Sri Lanka Food Fest",
      venue: "Open Air Theater, Colombo",
      date: "02 March 2025",
      time: "09:00PM to 11:30PM",
      price: 2000,
      sold: 700,
      capacity: 600,
      status: "closed",
      revenue: 2000000,
    },
    {
      id: "7",
      title: "Tech Lanka Expo 2025",
      venue: "Open Air Theater, Colombo",
      date: "18 April 2025",
      time: "10:00AM to 01:30PM",
      price: 1000,
      sold: 800,
      capacity: 400,
      status: "upcoming",
      revenue: 1000000,
    },
    {
      id: "8",
      title: "New Year's Eve Fireworks",
      venue: "Open Air Theater, Colombo",
      date: "24 April 2025",
      time: "09:00PM to 11:30PM",
      price: 1500,
      sold: 1500,
      capacity: 0,
      status: "pending",
      revenue: 1500000,
    },
    {
      id: "9",
      title: "Colombo Music Festival",
      venue: "Open Air Theater, Colombo",
      date: "24 February 2025",
      time: "09:00PM to 11:30PM",
      price: 5000,
      sold: 1500,
      capacity: 1100,
      status: "closed",
      revenue: 5000000,
    },
  ];

  // Filter and search events
  const filteredEvents = useMemo(() => {
    return events.filter((event) =>
      event.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  // Group events by status
  const groupedEvents = useMemo(() => {
    const grouped = {
      upcoming: filteredEvents.filter((event) => event.status === "upcoming"),
      pending: filteredEvents.filter((event) => event.status === "pending"),
      closed: filteredEvents.filter((event) => event.status === "closed"),
    };
    return grouped;
  }, [filteredEvents]);

//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case "upcoming":
//         return "text-blue-600 bg-blue-50 border-blue-200";
//       case "pending":
//         return "text-green-600 bg-green-50 border-green-200";
//       case "closed":
//         return "text-red-600 bg-red-50 border-red-200";
//       default:
//         return "text-gray-600 bg-gray-50 border-gray-200";
//     }
//   };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "upcoming":
        return <div className="w-3 h-3 bg-blue-500 rounded-full"></div>;
      case "pending":
        return <div className="w-3 h-3 bg-green-500 rounded-full"></div>;
      case "closed":
        return <div className="w-3 h-3 bg-red-500 rounded-full"></div>;
      default:
        return <div className="w-3 h-3 bg-gray-500 rounded-full"></div>;
    }
  };




  const StatusSection: React.FC<{
    status: "upcoming" | "pending" | "closed";
    events: Event[];
  }> = ({ status, events }) => {
    const statusLabels = {
      upcoming: "Up-Coming Events",
      pending: "Pending Events",
      closed: "Closed Events",
    };

    return (
      <div className="mb-8">
        <div className="flex items-center mb-4">
          {getStatusIcon(status)}
          <h2 className="ml-3 text-lg font-semibold text-gray-900">
            {statusLabels[status]}
          </h2>
          <span className="ml-2 px-2 py-1 bg-gray-100 text-gray-600 text-sm rounded-full">
            {events.length}
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
        {events.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No {status} events found
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 lg:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">
            Event Management Section
          </h1>

          {/* Controls */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Plus className="w-4 h-4 mr-2" />
                New Event
              </button>
              <button className="inline-flex items-center px-4 py-2 bg-orange-100 text-orange-600 rounded-lg hover:bg-orange-200 transition-colors">
                <TrendingUp className="w-4 h-4 mr-2" />
                Attendee Insights
              </button>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full sm:w-64"
                />
              </div>

              <div className="flex gap-2">
                <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </button>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="status">Sort By: Status</option>
                  <option value="date">Sort By: Date</option>
                  <option value="name">Sort By: Name</option>
                </select>

                <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <Calendar className="w-4 h-4 mr-2" />
                  Pick Date
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Events Sections */}
        <div className="space-y-8">
          <StatusSection status="upcoming" events={groupedEvents.upcoming} />
          <StatusSection status="pending" events={groupedEvents.pending} />
          <StatusSection status="closed" events={groupedEvents.closed} />
        </div>

        {/* No results */}
        {filteredEvents.length === 0 && searchTerm && (
          <div className="text-center py-12">
            <div className="text-gray-500 mb-2">
              No events found for "{searchTerm}"
            </div>
            <button
              onClick={() => setSearchTerm("")}
              className="text-blue-600 hover:text-blue-800 transition-colors"
            >
              Clear search
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageEvents;
