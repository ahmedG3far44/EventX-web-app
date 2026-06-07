import Seats from "@/components/ui/Seats";
import ShowEventDetails from "@/components/ui/ShowEventDetails";
import Spinner from "@/components/ui/Spinner";
import { useEvents } from "@/contexts/EventsProvider";
import { LucideX } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { useParams } from "react-router-dom";
import type { EventType } from "@/lib/types";

const EventDetailsPage = () => {
  const { id } = useParams();
  const [isOpen, setOpen] = useState(false);
  const { getEventById, loading, error, eventDetails } = useEvents();
  useEffect(() => {
    getEventById(id as string);
  }, [id]);
  if (loading)
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-zinc-50">
        <div className="flex flex-col justify-center items-center gap-8">
          <h4>loading...</h4>
          <Spinner />
        </div>
      </div>
    );
  if (error) return <div className="text-red-500">{error}</div>;
  return (
    <div className="min-h-screen w-full">
      <div className="relative">
        {eventDetails && (
          <ShowEventDetails
            isOpen={isOpen}
            setOpen={setOpen}
            event={eventDetails}
          />
        )}
        {isOpen && (
          <PopupWrapper setOpen={setOpen}>
            <Seats eventDetails={eventDetails as EventType} />
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
}) {
  return (
    <div className="fixed inset-0 bg-black/80 z-40 flex items-start justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="relative w-full max-w-4xl mt-4 sm:mt-8 mb-4 sm:mb-8">
        <button
          onClick={() => setOpen(false)}
          className="p-1.5 rounded-full bg-white/80 hover:bg-white absolute right-2 top-2 cursor-pointer transition-colors z-50 shadow-md"
        >
          <LucideX size={18} />
        </button>
        {children}
      </div>
    </div>
  );
}
