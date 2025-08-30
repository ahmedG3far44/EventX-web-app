/* eslint-disable react-refresh/only-export-components */
import type { EventFormData } from "@/components/EventForm";
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
  getEventsList: () => Promise<EventType | void>;
  createEvent: (newEvent: EventFormData) => Promise<EventType | void>;
  updateEventStatus: (
    id: string,
    newStatus: string
  ) => Promise<EventType | void>;
  deleteEventById: (id: string) => Promise<EventType | void>;
  eventDetails: EventType;
  loading: boolean;
  error: null | string;
}>({
  events: [],
  eventDetails: {
    _id: "",
    name: "",
    description: "",
    emoji: "",
    category: "",
    tags: [],
    availableSeats: 0,
    seatsAmount: 0,
    seatsMap: [[0, 0, 0, 0]],
    updatedAt: new Date(),
    createdAt: new Date(),
    datetime: new Date(),
    organizer: "",
    popularity: "High Popularity",
    revenue: 0,
    status: "active",
    ticketTypes: {
      available: 34,
      name: "",
      price: 40,
      _id: "",
    },
    venue: {
      address: {
        city: "",
        state: "",
        zipCode: "",
        street: "",
      },
      capacity: 0,
      name: "",
    },
  },
  getEventById: () => Promise.resolve(),
  getEventsList: () => Promise.resolve(),
  createEvent: () => Promise.resolve(),
  updateEventStatus: () => Promise.resolve(),
  deleteEventById: () => Promise.resolve(),
  loading: false,
  error: null,
});
const EventsProvider = ({ children }: { children: ReactNode }) => {
  const [events, setEvents] = useState<EventType[]>([]);
  const [eventDetails, setEventDetails] = useState<EventType>({
    _id: "",
    name: "",
    description: "",
    emoji: "",
    category: "",
    tags: [],
    availableSeats: 0,
    seatsAmount: 0,
    seatsMap: [[0, 0, 0, 0]],
    updatedAt: new Date(),
    createdAt: new Date(),
    datetime: new Date(),
    organizer: "",
    popularity: "High Popularity",
    revenue: 0,
    status: "active",
    ticketTypes: {
      available: 34,
      name: "",
      price: 40,
      _id: "",
    },
    venue: {
      address: {
        city: "",
        state: "",
        zipCode: "",
        street: "",
      },
      capacity: 0,
      name: "",
    },
  });

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

  const createEvent = async (newEvent: EventFormData) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${BASE_URL}/events`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer token`,
        },
        body: JSON.stringify(newEvent),
      });

      if (!response.ok) {
        throw new Error("connection error check your network !!");
      }

      const data = await response.json();

      console.log(data);
      alert("a new event created successfully");
    } catch (error) {
      console.log((error as Error).message);
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };
  const updateEventStatus = async (newStatus: string, eventId: string) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${BASE_URL}/events/${eventId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer token`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error("connection error check your network !!");
      }

      const data = await response.json();

      console.log(data);
      alert("event status was updated successfully");
    } catch (error) {
      console.log((error as Error).message);
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };
  const deleteEventById = async (eventId: string) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${BASE_URL}/events/${eventId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("connection error check your network !!");
      }

      const data = await response.json();

      console.log(data);
      alert("event  was deleted successfully");
    } catch (error) {
      console.log((error as Error).message);
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
      value={{
        events,
        eventDetails,
        getEventsList,
        getEventById,
        createEvent,
        updateEventStatus,
        deleteEventById,
        loading,
        error,
      }}
    >
      {children}
    </EventsContext.Provider>
  );
};

export default EventsProvider;

export const useEvents = () => useContext(EventsContext);
