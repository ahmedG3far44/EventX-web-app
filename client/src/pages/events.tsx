import { useEffect } from "react";
import { useEvents } from "@/contexts/EventsProvider";
import EventSearchFilter from "@/components/ui/EventSearchFilter";
import Header from "@/components/ui/header";
import DemoCredentialsPopup from "@/components/ui/DemoCredentialsPopup";
import { Button } from "@/components/ui/button";
import { env } from "configs/env";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertCircle, RefreshCw } from "lucide-react";

const SkeletonCard = () => (
  <div className="rounded-xl border border-gray-100 p-5 bg-white animate-pulse">
    <div className="flex items-start gap-3 mb-4">
      <div className="w-9 h-9 rounded-lg bg-gray-100 shrink-0" />
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-gray-100 rounded w-3/4" />
        <div className="h-3 bg-gray-50 rounded w-1/4" />
      </div>
    </div>
    <div className="space-y-2.5 mb-4">
      <div className="h-3.5 bg-gray-50 rounded w-2/3" />
      <div className="h-3.5 bg-gray-50 rounded w-1/2" />
    </div>
    <div className="mb-3">
      <div className="h-1.5 bg-gray-50 rounded-full w-full" />
    </div>
    <div className="flex items-center justify-between pt-3 border-t border-gray-50">
      <div className="h-4 bg-gray-100 rounded w-24" />
      <div className="w-8 h-8 bg-gray-50 rounded-full" />
    </div>
  </div>
);

const BASE_URL = env.BASE_URL;

const SEED_KEY = "eventx_seed_triggered";

const EventsPage = () => {
  const { loading, error, getEventsList } = useEvents();

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
      <>
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-6">
            <div className="h-11 bg-gray-50 rounded-lg w-full mb-4 animate-pulse" />
            <div className="flex gap-2 mb-6">
              <div className="h-8 bg-gray-50 rounded-md w-20 animate-pulse" />
              <div className="h-8 bg-gray-50 rounded-md w-24 animate-pulse" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        </main>
      </>
    );
  if (error)
    return (
      <div className="w-full min-h-screen flex items-center justify-center p-4">
        <Card className="max-w-md w-full text-center">
          <CardHeader>
            <div className="flex justify-center mb-2">
              <div className="rounded-full bg-red-100 p-3">
                <AlertCircle className="h-8 w-8 text-red-500" />
              </div>
            </div>
            <CardTitle className="text-xl">Failed to load events</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm">
              We couldn't load the events. Please check your connection and try
              again.
            </p>
          </CardContent>
          <CardFooter className="justify-center pb-6">
            <Button onClick={getEventsList} className="gap-2">
              <RefreshCw className="h-4 w-4" />
              Try again
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  return (
    <>
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-8 space-y-8">
        <EventSearchFilter />
        <DemoCredentialsPopup />
      </main>
    </>
  );
};

export default EventsPage;
