import Spinner from "@/components/ui/Spinner";
import { useEvents } from "@/contexts/EventsProvider";
import EventSearchFilter from "@/components/ui/EventSearchFilter";
import Header from "@/components/ui/header";
import DemoCredentialsPopup from "@/components/ui/DemoCredentialsPopup";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { env } from "configs/env";
import { AlertCircle, RefreshCw } from "lucide-react";
import { useEffect } from "react";

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
      <div className="w-full min-h-screen flex items-center justify-center">
        <Spinner />
      </div>
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
            <CardTitle className="text-xl">No events found</CardTitle>
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
    <div className="w-3/4 m-auto flex flex-col gap-8 space-y-8">
      <Header />
      <EventSearchFilter />
      <DemoCredentialsPopup />
    </div>
  );
};

export default EventsPage;
