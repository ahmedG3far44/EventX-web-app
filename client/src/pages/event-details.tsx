import EventCard from "@/components/ui/EventCard";
import SeatBooking from "@/components/ui/SeatBooking";

import { useEvents } from "@/contexts/EventsProvider";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const EventDetailsPage = () => {
  const { id } = useParams();

  const { getEventById, loading, error, eventDetails } = useEvents();
  useEffect(() => {
    getEventById(id as string);
  }, [id]);

  if (loading) return <div>loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  return (
    <div className="flex min-h-screen justify-center gap-10 items-center w-3/4 m-auto">
      <div className="flex items-center justify-center gap-4">
        {eventDetails && <EventCard {...eventDetails} />}{" "}
        <div>
          <SeatBooking />
        </div>
      </div>
    </div>
  );
};

export default EventDetailsPage;
