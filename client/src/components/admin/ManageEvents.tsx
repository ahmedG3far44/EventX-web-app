import React, { useState, useMemo } from "react";
import { Search, Filter, Calendar, Plus, TrendingUp } from "lucide-react";
import EventCard from "../ui/EventCard";
import { useEvents } from "@/contexts/EventsProvider";
import type { EventType } from "@/lib/types";
import { Link } from "react-router-dom";

const ManageEvents: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("status");
  const [selectedDate, setSelectedDate] = useState("");
  console.log(selectedDate, setSelectedDate);
  // Sample data based on your interface
  const { events } = useEvents();

  console.log(events, "event mange s");

  // Filter and search events
  const filteredEvents = useMemo(() => {
    return events.filter((event: EventType) =>
      event.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [events, searchTerm]);

  // Group events by status
  const groupedEvents = useMemo(() => {
    const grouped = {
      upcoming: filteredEvents.filter(
        (event) => event.status === "upcoming"
      ) as EventType[],
      canceled: filteredEvents.filter(
        (event) => event.status === "canceled"
      ) as EventType[],
      pending: filteredEvents.filter(
        (event) => event.status === "pending"
      ) as EventType[],
      closed: filteredEvents.filter(
        (event) => event.status === "closed"
      ) as EventType[],
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
        return <div className="w-3 h-3 bg-orange-500 rounded-full"></div>;
      case "canceled":
        return <div className="w-3 h-3 bg-red-500 rounded-full"></div>;
      default:
        return <div className="w-3 h-3 bg-gray-500 rounded-full"></div>;
    }
  };

  const StatusSection: React.FC<{
    status: "upcoming" | "pending" | "closed" | "canceled";
    events: EventType[];
  }> = ({ status, events }) => {
    const statusLabels = {
      upcoming: "Up-Coming Events",
      pending: "Pending Events",
      closed: "Closed Events",
      canceled: "Canceled Events",
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
            <EventCard key={event._id} event={event} isAdmin={true} />
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
              <Link
                to={"/dashboard/add"}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-4 h-4 mr-2" />
                New Event
              </Link>
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
          <StatusSection status="canceled" events={groupedEvents.canceled} />
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
