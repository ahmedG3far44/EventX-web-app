import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import AuthProvider from "./contexts/AuthProvider.tsx";
import EventsProvider from "./contexts/EventsProvider.tsx";
import App from "./App.tsx";
import "./index.css";
import BookingTicketsProvider from "./contexts/BookingTicketsProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <EventsProvider>
        <BookingTicketsProvider>
          <App />
        </BookingTicketsProvider>
      </EventsProvider>
    </AuthProvider>
  </StrictMode>
);
