import Spinner from "@/components/ui/Spinner";
import { useEvents } from "@/contexts/EventsProvider";
import EventSearchFilter from "@/components/ui/EventSearchFilter";
import Header from "@/components/ui/header";

export type EventStatusType =
  | "active"
  | "published"
  | "draft"
  | "upcoming"
  | "canceled";
const EventsPage = () => {
  const { loading, error } = useEvents();
  if (loading)
    return (
      <div className="w-full min-h-screen flex items-center justify-center ">
        <Spinner />
      </div>
    );
  if (error) return <div className="text-red-500 p-2 rounded-md">{error}</div>;
  return (
    <div className="w-3/4 m-auto flex flex-col gap-8 space-y-8">
      <Header />
      <EventSearchFilter />
    </div>
  );
};

export default EventsPage;
