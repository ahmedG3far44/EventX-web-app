import Seats from "@/components/ui/Seats";
import ShowEventDetails from "@/components/ui/ShowEventDetails";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useEvents } from "@/contexts/EventsProvider";
import { X, AlertCircle, RefreshCw } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { useParams } from "react-router-dom";
import type { EventType } from "@/lib/types";

const SkeletonDetail = () => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 animate-pulse">
    <div className="rounded-xl border border-gray-100 bg-white p-6">
      <div className="flex items-center gap-4">
        <div className="h-9 w-20 bg-gray-100 rounded-lg" />
        <div className="h-10 w-10 bg-gray-100 rounded-lg" />
        <div className="space-y-2">
          <div className="h-6 bg-gray-100 rounded w-64" />
          <div className="h-4 bg-gray-50 rounded w-32" />
        </div>
      </div>
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        {[1, 2].map((i) => (
          <div key={i} className="rounded-xl border border-gray-100 bg-white p-6 space-y-4">
            <div className="h-5 bg-gray-100 rounded w-40" />
            <div className="h-4 bg-gray-50 rounded w-full" />
            <div className="grid grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((j) => (
                <div key={j} className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-50 rounded-lg" />
                  <div className="space-y-1.5">
                    <div className="h-4 bg-gray-100 rounded w-28" />
                    <div className="h-3 bg-gray-50 rounded w-16" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="space-y-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="rounded-xl border border-gray-100 bg-white p-6 space-y-3">
            <div className="h-5 bg-gray-100 rounded w-24" />
            <div className="h-4 bg-gray-50 rounded w-full" />
            <div className="h-4 bg-gray-50 rounded w-3/4" />
          </div>
        ))}
      </div>
    </div>
  </div>
);

const EventDetailsPage = () => {
  const { id } = useParams();
  const [isOpen, setOpen] = useState(false);
  const { getEventById, loading, error, eventDetails } = useEvents();
  useEffect(() => {
    getEventById(id as string);
  }, [id]);
  if (loading)
    return (
        <SkeletonDetail />
    );
  if (error)
    return (
        <div className="min-h-[60vh] flex items-center justify-center p-4">
          <Card className="max-w-md w-full text-center">
            <CardHeader>
              <div className="flex justify-center mb-2">
                <div className="rounded-full bg-red-100 p-3">
                  <AlertCircle className="h-8 w-8 text-red-500" />
                </div>
              </div>
              <CardTitle className="text-xl">Failed to load event</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">{error}</p>
            </CardContent>
            <CardFooter className="justify-center pb-6">
              <Button onClick={() => getEventById(id as string)} className="gap-2">
                <RefreshCw className="h-4 w-4" />
                Try again
              </Button>
            </CardFooter>
          </Card>
        </div>
    );
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
      </main>
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
          className="p-2 rounded-full bg-white/90 hover:bg-white absolute right-3 top-3 cursor-pointer transition-all z-50 shadow-md hover:shadow-lg"
          aria-label="Close booking popup"
        >
          <X size={18} />
        </button>
        {children}
      </div>
    </div>
  );
}
