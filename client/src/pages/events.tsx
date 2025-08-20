import { Button } from "@/components/ui/button";
import EventCard from "@/components/ui/EventCard";
import { useEvents } from "@/contexts/EventsProvider";
import type { EventType } from "@/lib/types";
import { useState } from "react";

const EventsPage = () => {
  const { events, loading, error } = useEvents();

  const [filteredEvents, setFilteredEvents] = useState<EventType[]>([]);
  const [search, setSearch] = useState<undefined | string>(undefined);

  const handleSearch = () => {
    const filtered = events.filter((event) =>
      event.title
        .toLowerCase()
        .includes(search ? search?.toLocaleLowerCase().toString() : "")
    );
    setFilteredEvents(filtered);
  };

  if (loading) return <div>loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  return (
    <div>
      <div>
        <input
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 rounded-md"
          type="search"
        />
        <Button onClick={handleSearch}>Search</Button>
      </div>
      <div className="w-3/4 m-auto p-4 grid grid-cols-4 grid-flow-row gap-10 items-center">
        {filteredEvents.length <= 0 ? (
          <>
            {events.map((event) => {
              return <EventCard key={event._id} {...event} />;
            })}
          </>
        ) : (
          <>
            {filteredEvents.map((event) => {
              return <EventCard key={event._id} {...event} />;
            })}
          </>
        )}
      </div>
    </div>
  );
};

export default EventsPage;
