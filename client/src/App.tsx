import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/login";
import Home from "./pages/home";
import SignupPage from "./pages/signup";
import DashboardPage from "./pages/dashboard";
import EventDetailsPage from "./pages/event-details";
import EventsPage from "./pages/events";
import PaymentPage from "./pages/payment";
import NotFoundPage from "./pages/error";
import ManageEvents from "./components/admin/ManageEvents";
import EventDetails from "./components/admin/EventDetails";
import Insights from "./components/admin/Insights";
import AnalyticsReports from "./components/admin/AnalyticsReports";
import ManageUsers from "./components/admin/ManageUsers";
import BookingTickets from "./components/admin/BookingTickets";
import AttendeeInsights from "./components/admin/AttendeeInsights";
import EventCategories from "./components/admin/EventCategories";
import MyTickets from "./components/ui/MyTickets";
import PaymentSuccessPage from "./pages/success";
import EventForm from "./components/EventForm";
import ProtectedRoute from "./components/ui/ProtectedRoute";
import ProtectedUserRoutes from "./components/ui/ProtectedUserRoutes";
import TicketPage from "./pages/ticket";

const App = () => {
  return (
    <div className="w-full overflow-x-hidden min-h-screen">
      <BrowserRouter>
        <Routes>
          <Route index path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          <Route path="/" element={<ProtectedUserRoutes />}>
            <Route path="/events" element={<EventsPage />} />
            <Route path="/event/:id" element={<EventDetailsPage />} />
            <Route path="/checkout/:eventId" element={<PaymentPage />} />
            <Route path="/success" element={<PaymentSuccessPage />} />
            <Route path="/tickets" element={<MyTickets />} />
            <Route path="/tickets/:ticketId" element={<TicketPage  />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />

          <Route path="/" element={<ProtectedRoute admin={true} />}>
            <Route path="dashboard" element={<DashboardPage />}>
              <Route path="add" element={<EventForm />} />
              <Route path="insights" element={<Insights />} />
              <Route path="manage-events" element={<ManageEvents />} />
              <Route path="manage-events/:id" element={<EventDetails />} />
              <Route
                path="attendee-insights/:id"
                element={<AttendeeInsights />}
              />
              <Route path="manage-users" element={<ManageUsers />} />
              <Route path="analytics-reports" element={<AnalyticsReports />} />
              <Route path="booking-tickets" element={<BookingTickets />} />
              <Route path="event-categories" element={<EventCategories />} />
            </Route>
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
