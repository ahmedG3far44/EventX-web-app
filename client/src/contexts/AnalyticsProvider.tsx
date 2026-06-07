/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { env } from "configs/env";
import { useAuth } from "./AuthProvider";
import { useParams } from "react-router-dom";

interface OverAllAnalysisType {
  overview: {
    totalEvents: number;
    totalTickets: number;
    totalRevenue: number;
    totalUsers: number;
  };
  topEventsByRevenue: TopEventsByRevenue[];
  ticketSalesData: string[];
  interestsData: InterestedData[];
  locationsBarData: InterestedData[];
  locationTableData: LocationTable[];
  socialMediaData: SocialMediaData[];
}

interface TopEventsByRevenue {
  _id: string;
  revenue: number;
  ticketsSold: number;
  name: string;
  category: string;
  datetime: Date;
}
interface InterestedData {
  name: string;
  value: number;
  percentage: string;
  color: string;
}
interface LocationTable {
  location: string;
  count: number;
  color: string;
}

interface SocialMediaData {
  platform: string;
  count: number;
  icon: string;
  color: string;
}

interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
}

interface Venue {
  address: Address;
  name: string;
  capacity: number;
  _id: string;
}

interface Event {
  id: string;
  name: string;
  category: string;
  datetime: string;
  venue?: Venue;
  totalSeats: number;
  availableSeats: number;
  occupancyRate: string;
}

interface Overview {
  totalTicketsSold: number;
  totalRevenue: number;
  averageTicketPrice: number;
}

interface SeatsAnalytics {
  totalSeats: number;
  soldSeats: number;
  availableSeats: number;
  occupancyPercentage: number;
}

interface TicketTypeData {
  type?: string;
  price?: number;
  sold?: number;
}

interface DailySale {
  date?: string;
  ticketsSold?: number;
  revenue?: number;
}

interface PaymentMethod {
  method?: string;
  count?: number;
  amount?: number;
}

interface EventAnalysisData {
  event: Event;
  overview: Overview;
  ticketTypesData: TicketTypeData[];
  dailySales: DailySale[];
  paymentMethods?: PaymentMethod[];
  seatsAnalytics: SeatsAnalytics;
}

interface TotalUsersAnalysis {
  totalUsers: number;
  usersByRole: [
    {
      _id: "USER" | "ADMIN";
      count: number;
    }
  ];
}

interface RevenueByPeriod {
  _id: string;
  revenue: number;
  tickets: number;
}

interface RevenueAnalysisData {
  revenueByPeriod: RevenueByPeriod[];
  revenueByCategory: RevenueByPeriod[];
}

export interface AnalyticsContextType {
  overAllAnalysis: OverAllAnalysisType;
  eventAnalysis: EventAnalysisData;
  revenueAnalysis: RevenueAnalysisData;
  usersAnalysis: TotalUsersAnalysis;
  loading: boolean;
  error: null | string;
}

const AnalyticsContext = createContext<AnalyticsContextType>({
  overAllAnalysis: {
    interestsData: [],
    locationsBarData: [],
    locationTableData: [],
    overview: {
      totalEvents: 0,
      totalRevenue: 0,
      totalTickets: 0,
      totalUsers: 0,
    },
    socialMediaData: [],
    ticketSalesData: [],
    topEventsByRevenue: [],
  },
  eventAnalysis: {
    dailySales: [],
    event: {
      id: "",
      name: "",
      category: "",
      datetime: "",
      availableSeats: 0,
      totalSeats: 0,
      occupancyRate: "",
    },
    overview: {
      averageTicketPrice: 0,
      totalRevenue: 0,
      totalTicketsSold: 0,
    },
    paymentMethods: [],
    seatsAnalytics: {
      availableSeats: 0,
      occupancyPercentage: 0,
      soldSeats: 0,
      totalSeats: 0,
    },
    ticketTypesData: [],
  },
  revenueAnalysis: {
    revenueByCategory: [],
    revenueByPeriod: [],
  },
  usersAnalysis: {
    totalUsers: 0,
    usersByRole: [
      {
        _id: "USER",
        count: 0,
      },
    ],
  },
  loading: false,
  error: null,
});

const BASE_URL = env.BASE_URL;

const AnalyticsProvider = ({ children }: { children: ReactNode }) => {
  const [overAllAnalysis, setOverAllAnalysis] = useState<OverAllAnalysisType>({
    interestsData: [],
    locationsBarData: [],
    locationTableData: [],
    overview: {
      totalEvents: 0,
      totalRevenue: 0,
      totalTickets: 0,
      totalUsers: 0,
    },
    socialMediaData: [],
    ticketSalesData: [],
    topEventsByRevenue: [],
  });
  const [eventAnalysis, setEventAnalysis] = useState<EventAnalysisData>({
    dailySales: [],
    event: {
      id: "",
      name: "",
      category: "",
      datetime: "",
      availableSeats: 0,
      totalSeats: 0,
      occupancyRate: "",
    },
    overview: {
      averageTicketPrice: 0,
      totalRevenue: 0,
      totalTicketsSold: 0,
    },
    paymentMethods: [],
    seatsAnalytics: {
      availableSeats: 0,
      occupancyPercentage: 0,
      soldSeats: 0,
      totalSeats: 0,
    },
    ticketTypesData: [],
  });
  const [revenueAnalysis, setRevenueAnalysis] = useState<RevenueAnalysisData>({
    revenueByCategory: [],
    revenueByPeriod: [],
  });
  const [usersAnalysis, setUsersAnalysis] = useState<TotalUsersAnalysis>({
    totalUsers: 0,
    usersByRole: [
      {
        _id: "USER",
        count: 0,
      },
    ],
  });

  const { token } = useAuth();
  const { eventId } = useParams();

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const getOverAllAnalysis = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${BASE_URL}/analytics/overall`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("can't get analysis data");
      }
      const data = await response.json();
      setOverAllAnalysis(data.data);
      return data.data;
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };
  const getEventAnalysis = async (eventId: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${BASE_URL}/analytics/event/${eventId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("can't get analysis data");
      }
      const data = await response.json();
      setEventAnalysis(data.data);
      return data.data;
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const getRevenueAnalysis = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${BASE_URL}/analytics/revenue`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("can't get analysis data");
      }
      const data = await response.json();
      setRevenueAnalysis(data.data);
      return data.data;
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };
  const getUsersAnalysis = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${BASE_URL}/analytics/users`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("can't get analysis data");
      }
      const data = await response.json();
      setUsersAnalysis(data.data);
      return data.data;
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (eventId) {
      getEventAnalysis(eventId as string);
    }
    getUsersAnalysis();
    getOverAllAnalysis();
    getRevenueAnalysis();
  }, [eventId]);

  return (
    <AnalyticsContext.Provider
      value={{
        overAllAnalysis,
        eventAnalysis,
        revenueAnalysis,
        usersAnalysis,
        error,
        loading,
      }}
    >
      {children}
    </AnalyticsContext.Provider>
  );
};

export default AnalyticsProvider;

export const useAnalytics = () => useContext(AnalyticsContext);
