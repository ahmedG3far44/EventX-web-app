import { Button } from "@/components/ui/button";
import EventsList from "@/components/ui/EventsList";
import { useEvents } from "@/contexts/EventsProvider";
import type { EventType } from "@/lib/types";
import { useEffect, useState } from "react";

export type EventStatusType =
  | "active"
  | "published"
  | "draft"
  | "upcoming"
  | "canceled";
const EventsPage = () => {
  const { events, loading, error } = useEvents();

  const [filteredEvents, setFilteredEvents] = useState<EventType[]>([]);
  const [search, setSearch] = useState<undefined | string>(undefined);
  const [eventStatus, setEventStatus] = useState<EventStatusType>();

  const handleSearch = () => {
    const filtered = events.filter((event) =>
      event.name
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
      <>
        {filteredEvents.length <= 0 ? (
          <EventsList events={events} />
        ) : (
          <EventsList events={filteredEvents} />
        )}
      </>
    </div>
  );
};

export default EventsPage;
