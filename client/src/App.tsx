import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/login";
import Home from "./pages/home";
import SignupPage from "./pages/signup";
import DashboardPage from "./pages/dashboard";
import EventDetailsPage from "./pages/event-details";
import EventsPage from "./pages/events";
import PaymentPage from "./pages/payment";
import NotFoundPage from "./pages/error";
import MyTickets from "./components/ui/MyTickets";
import PaymentSuccessPage from "./pages/success";
// import Users from "./components/ui/Users";
// import EventForm from "./components/EventForm";

const App = () => {
  return (
    <div className="w-full overflow-x-hidden min-h-screen">
      <BrowserRouter>
        <Routes>
          <Route index path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/event/:id" element={<EventDetailsPage />} />
          <Route path="/event/:eventId/payment" element={<PaymentPage />} />
          <Route path="/success" element={<PaymentSuccessPage />} />
          <Route path="/tickets" element={<MyTickets />} />
          <Route path="*" element={<NotFoundPage />} />

          <Route path="dashboard" element={<DashboardPage />}>
            <Route path="add" element={<h1>Add Quick Event Form</h1>} />
            <Route
              path="insights"
              element={<h1>Dashboard Insights: revenue</h1>}
            />
            <Route path="events" element={<h1>All Event Insights</h1>}>
              <Route path=":id" element={<h1>Single Event Insights</h1>} />
            </Route>
            <Route
              path="manage-events"
              element={
                <h1>Change Events Status active | canceled | upcoming</h1>
              }
            />
            <Route
              path="categories"
              element={<h1>Categories List / add </h1>}
            />
            <Route path="users" element={<h1>Manage Users</h1>} />
            <Route path="reports" element={<h1>Download a reports</h1>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
