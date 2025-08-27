import EventCard from "./EventCard";
import type { EventType } from "@/lib/types";

const EventsList = ({ events }: { events: EventType[] }) => {
  return (
    <div className="w-full  mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-2 place-items-center place-content-center grid-flow-row">
      {events.map((event) => {
        return <EventCard key={event._id} event={event} />;
      })}
    </div>
  );
};

export default EventsList;
