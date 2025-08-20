/* eslint-disable react-refresh/only-export-components */
import type { EventType } from "@/lib/types";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

const BASE_URL = import.meta.env.VITE_BASE_URL as string;

const EventsContext = createContext<{
  events: EventType[];
  getEventById: (id: string) => Promise<EventType | void>;
  eventDetails: EventType | null;
  loading: boolean;
  error: null | string;
}>({
  events: [],
  eventDetails: null,
  getEventById: () => Promise.resolve(),
  loading: false,
  error: null,
});
const EventsProvider = ({ children }: { children: ReactNode }) => {
  const [events, setEvents] = useState<EventType[]>([]);
  const [eventDetails, setEventDetails] = useState<EventType | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const getEventsList = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${BASE_URL}/events`);

      if (!response.ok) {
        throw new Error("connection error check your network !!");
      }

      const data = await response.json();

      console.log(data.data);
      setEvents(data.data);

      return data;
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };
  const getEventById = async (id: string) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${BASE_URL}/events/${id}`);

      if (!response.ok) {
        throw new Error("connection error check your network !!");
      }

      const data = await response.json();

      console.log(data.data);
      setEventDetails(data.data);

      return data.data;
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getEventsList();
  }, []);
  return (
    <EventsContext.Provider
      value={{ events, eventDetails, getEventById, loading, error }}
    >
      {children}
    </EventsContext.Provider>
  );
};

export default EventsProvider;

export const useEvents = () => useContext(EventsContext);
