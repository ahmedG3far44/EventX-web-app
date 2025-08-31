import EventCard from "./EventCard";
import type { EventType } from "@/lib/types";

const  EventsList = ({ events }: { events: EventType[] }) => {
  return (
    <div className="p-4 lg:p-8 grid place-items-center  grid-cols-1  md:grid-cols-2 max-xl:grid-cols-4 gap-2">
      {events.map((event) => {
        return <EventCard key={event._id} event={event} />;
      })}
    </div>
  );
};

export default EventsList;
