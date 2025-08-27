
import SeatBooking from "@/components/ui/SeatBooking";
import ShowEventDetails from "@/components/ui/ShowEventDetails";

import { useEvents } from "@/contexts/EventsProvider";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const EventDetailsPage = () => {
  const { id } = useParams();
  const [isOpen, setOpen] = useState(false);

  const { getEventById, loading, error, eventDetails } = useEvents();
  useEffect(() => {
    getEventById(id as string);
  }, [id]);

  if (loading) return <div>loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  return (
    <div className="flex min-h-screen justify-center gap-4 p-4 items-center m-auto">
      <div className="flex items-center justify-center gap-4 relative">
        {eventDetails && (
          <ShowEventDetails
            isOpen={isOpen}
            setOpen={setOpen}
            event={eventDetails}
          />
        )}{" "}
        <div>{isOpen && <SeatBooking setOpen={setOpen}/>}</div>
      </div>
    </div>
  );
};

export default EventDetailsPage;
