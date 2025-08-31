import { useState, useMemo } from "react";
import {
  Search,
  Filter,
  X,
  Calendar,

  Users,
  Star,
  Tag,
} from "lucide-react";
import { useEvents } from "@/contexts/EventsProvider";
import type { EventType } from "@/lib/types";
import EventCard from "./EventCard";

interface FilterState {
  search: string;
  category: string;
  status: string;
  popularity: string;
  dateRange: string;
  availabilityFilter: string;
}

interface EventSearchFilterProps {
  onFilteredEvents?: (filteredEvents: EventType[]) => void;
}

export default function EventSearchFilter({
  onFilteredEvents = () => {},
}: EventSearchFilterProps) {
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    category: "",
    status: "",
    popularity: "",
    dateRange: "",
    availabilityFilter: "",
  });
  const { events } = useEvents();
  const [showFilters, setShowFilters] = useState(false);

  // Extract unique values for filter options
  const filterOptions = useMemo(() => {
    const categories = [...new Set(events.map((e) => e.category))];
    const statuses = [...new Set(events.map((e) => e.status))];
    const popularities = [...new Set(events.map((e) => e.popularity))];

    return { categories, statuses, popularities };
  }, [events]);

  // Filter logic
  const filteredEvents = useMemo(() => {
    const filtered: EventType[] = events.filter((event) => {
      // Search filter
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        const matchesSearch =
          event.name.toLowerCase().includes(searchTerm) ||
          event.description.toLowerCase().includes(searchTerm) ||
          event.organizer.toLowerCase().includes(searchTerm) ||
          event.tags.some((tag) => tag.toLowerCase().includes(searchTerm));

        if (!matchesSearch) return false;
      }

      // Category filter
      if (filters.category && event.category !== filters.category) return false;

      // Status filter
      if (filters.status && event.status !== filters.status) return false;

      // Popularity filter
      if (filters.popularity && event.popularity !== filters.popularity)
        return false;

      // City filter

      // Date range filter
      if (filters.dateRange) {
        const eventDate = new Date(event.datetime);
        const today = new Date();
        const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
        const nextMonth = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000);

        switch (filters.dateRange) {
          case "today":
            if (eventDate.toDateString() !== today.toDateString()) return false;
            break;
          case "week":
            if (eventDate < today || eventDate > nextWeek) return false;
            break;
          case "month":
            if (eventDate < today || eventDate > nextMonth) return false;
            break;
        }
      }

      // Availability filter
      if (filters.availabilityFilter) {
        const availabilityRatio = event.availableSeats / event.seatsAmount;
        switch (filters.availabilityFilter) {
          case "available":
            if (event.availableSeats === 0) return false;
            break;
          case "limited":
            if (availabilityRatio > 0.2) return false;
            break;
          case "sold-out":
            if (event.availableSeats > 0) return false;
            break;
        }
      }

      return true;
    });

    // Notify parent component
    onFilteredEvents(filtered);
    return filtered;
  }, [events, filters, onFilteredEvents]);

  const updateFilter = (key: keyof FilterState, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      search: "",
      category: "",
      status: "",
      popularity: "",
      dateRange: "",
      availabilityFilter: "",
    });
  };

  const activeFiltersCount = Object.values(filters).filter(
    (value) => value !== ""
  ).length;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
      {/* Search Bar */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <input
          type="text"
          placeholder="Search events by name, description, organizer, or tags..."
          value={filters.search}
          onChange={(e) => updateFilter("search", e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Filter Toggle */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
        >
          <Filter className="h-4 w-4" />
          <span>Filters</span>
          {activeFiltersCount > 0 && (
            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
              {activeFiltersCount}
            </span>
          )}
        </button>

        {activeFiltersCount > 0 && (
          <button
            onClick={clearFilters}
            className="flex items-center space-x-1 text-sm text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X className="h-4 w-4" />
            <span>Clear all</span>
          </button>
        )}
      </div>

      {/* Filter Panel */}
      {showFilters && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-md">
          {/* Category Filter */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <Tag className="h-4 w-4 mr-1" />
              Category
            </label>
            <select
              value={filters.category}
              onChange={(e) => updateFilter("category", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All categories</option>
              {filterOptions.categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <Users className="h-4 w-4 mr-1" />
              Status
            </label>
            <select
              value={filters.status}
              onChange={(e) => updateFilter("status", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All statuses</option>
              {filterOptions.statuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          {/* Popularity Filter */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <Star className="h-4 w-4 mr-1" />
              Popularity
            </label>
            <select
              value={filters.popularity}
              onChange={(e) => updateFilter("popularity", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All popularity levels</option>
              {filterOptions.popularities.map((popularity) => (
                <option key={popularity} value={popularity}>
                  {popularity}
                </option>
              ))}
            </select>
          </div>

          {/* Date Range Filter */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <Calendar className="h-4 w-4 mr-1" />
              Date Range
            </label>
            <select
              value={filters.dateRange}
              onChange={(e) => updateFilter("dateRange", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Any time</option>
              <option value="today">Today</option>
              <option value="week">Next 7 days</option>
              <option value="month">Next 30 days</option>
            </select>
          </div>

          {/* Availability Filter */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <Users className="h-4 w-4 mr-1" />
              Availability
            </label>
            <select
              value={filters.availabilityFilter}
              onChange={(e) =>
                updateFilter("availabilityFilter", e.target.value)
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Any availability</option>
              <option value="available">Available seats</option>
              <option value="limited">Limited seats (&lt;20%)</option>
              <option value="sold-out">Sold out</option>
            </select>
          </div>
        </div>
      )}

      {/* Results Summary */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
        <p className="text-sm text-gray-600">
          Showing {filteredEvents.length} of {events.length} events
        </p>

        {activeFiltersCount > 0 && (
          <div className="flex items-center space-x-2">
            <span className="text-xs text-gray-500">Active filters:</span>
            <div className="flex flex-wrap gap-1">
              {filters.search && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                  Search: "{filters.search}"
                  <button
                    onClick={() => updateFilter("search", "")}
                    className="ml-1 hover:text-blue-600"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}
              {filters.category && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                  {filters.category}
                  <button
                    onClick={() => updateFilter("category", "")}
                    className="ml-1 hover:text-green-600"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}

              {filters.status && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800">
                  {filters.status}
                  <button
                    onClick={() => updateFilter("status", "")}
                    className="ml-1 hover:text-yellow-600"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Sample Event Cards for Demo */}
      <div className="mt-6 space-y-4">
        {filteredEvents.map((event) => (
          <EventCard key={event._id} event={event} />
        ))}

        {filteredEvents.length === 0 && (
          <div className="text-center py-8">
            <div className="text-gray-400 mb-2">
              <Search className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">
              No events found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
