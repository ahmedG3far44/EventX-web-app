import Spinner from "@/components/ui/Spinner";
import { useEvents } from "@/contexts/EventsProvider";
import EventSearchFilter from "@/components/ui/EventSearchFilter";
import Header from "@/components/ui/header";
import DemoCredentialsPopup from "@/components/ui/DemoCredentialsPopup";
import { env } from "configs/env";
import { useEffect } from "react";

const BASE_URL = env.BASE_URL;

const SEED_KEY = "eventx_seed_triggered";

export type EventStatusType =
  | "active"
  | "published"
  | "draft"
  | "upcoming"
  | "canceled";
const EventsPage = () => {
  const { loading, error } = useEvents();

  useEffect(() => {
    const seeded = localStorage.getItem(SEED_KEY);
    if (!seeded) {
      fetch(`${BASE_URL}/auth/seed`, { method: "POST" })
        .then(() => localStorage.setItem(SEED_KEY, "true"))
        .catch(() => {});
    }
  }, []);

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
      <DemoCredentialsPopup />
    </div>
  );
};

export default EventsPage;
