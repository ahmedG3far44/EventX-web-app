import { Button } from "@/components/ui/button";
import EventCard from "@/components/ui/EventCard";
import { useEvents } from "@/contexts/EventsProvider";
import type { EventType } from "@/lib/types";
import { useEffect, useState } from "react";

export type EventStatusType =
  | null
  | "active"
  | "published"
  | "draft"
  | "upcoming"
  | "canceled";
const EventsPage = () => {
  const { events, loading, error } = useEvents();

  const [filteredEvents, setFilteredEvents] = useState<EventType[]>([]);
  const [search, setSearch] = useState<undefined | string>(undefined);
  const [eventStatus, setEventStatus] = useState<EventStatusType>(null);

  const handleSearch = () => {
    const filtered = events.filter((event) =>
      event.title
        .toLowerCase()
        .includes(search ? search?.toLocaleLowerCase().toString() : "")
    );
    setFilteredEvents(filtered);
  };

  useEffect(() => {
    const handleFilterEvents = () => {
      const filteredEvent = events.filter(
        (event) => event.status.toLowerCase() === eventStatus?.toLowerCase()
      );
      setFilteredEvents(filteredEvent);
    };

    handleFilterEvents();
  }, [eventStatus]);

  console.log(eventStatus);

  if (loading) return <div>loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  return (
    <div className="w-3/4 m-auto">
      <div className="p-4 bg-zinc-50 flex justify-center items-center mb-20">
        <input
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 border bg-zinc-100 rounded-md gap-4 w-[400px] mr-4"
          type="search"
          placeholder="search events title"
        />
        <Button onClick={handleSearch}>Search</Button>
        <div>
          <select
            onChange={(e) => setEventStatus(e.target.value as EventStatusType)}
            className="appearance-none px-4 py-2 bg-zinc-100 border ml-40 cursor-pointer hover:bg-zinc-200 duration-300 rounded-md"
            name="event-status"
            id="event-status"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="active">Active</option>
            <option value="upcoming">Upcoming</option>
            <option value="canceled">canceled</option>
          </select>
        </div>
      </div>
      {/* {filteredEvents.length === 0 && (
        <div className="my-10 text-center">No items available in status {eventStatus}</div>
      )} */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid-flow-row place-content-center place-items-center gap-4">
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
