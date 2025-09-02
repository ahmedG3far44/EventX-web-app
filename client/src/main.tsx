import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import AuthProvider from "./contexts/AuthProvider.tsx";
import EventsProvider from "./contexts/EventsProvider.tsx";
import BookingTicketsProvider from "./contexts/BookingTicketsProvider.tsx";
import AnalyticsProvider from "./contexts/AnalyticsProvider.tsx";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <EventsProvider>
        <BookingTicketsProvider>
          <AnalyticsProvider>
            <App />
          </AnalyticsProvider>
        </BookingTicketsProvider>
      </EventsProvider>
    </AuthProvider>
  </StrictMode>
);
