import Seats from "@/components/ui/Seats";
import ShowEventDetails from "@/components/ui/ShowEventDetails";

import { useEvents } from "@/contexts/EventsProvider";
import type { EventType } from "@/lib/types";
import { LucideX } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
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
        {isOpen && (
          <PopupWrapper setOpen={setOpen}>
            <Seats
              seatsMap={eventDetails?.seatsMap as number[][]}
              event={eventDetails as EventType}
              editState={false}
            />
          </PopupWrapper>
        )}
      </div>
    </div>
  );
};

export default EventDetailsPage;

function PopupWrapper({
  children,
  setOpen,
}: {
  children: ReactNode;
  setOpen: (open: boolean) => void;
  isOpen?: boolean;
}) {
  return (
    <div className="fixed left-0 top-0 w-full min-h-screen bg-black/90 z-40">
      <div className="fixed right-0 top-0 h-full  z-50">
        <span
          role="button"
          onClick={() => setOpen(false)}
          className="p-2 rounded-full bg-zinc-200 absolute left-5 top-5 cursor-pointer hover:bg-zinc-100 duration-300 "
        >
          <LucideX size={20} />
        </span>

        {children}
      </div>
    </div>
  );
}
