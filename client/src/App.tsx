import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/login";
import Home from "./pages/home";
import SignupPage from "./pages/signup";
import DashboardPage from "./pages/dashboard";
import EventDetailsPage from "./pages/event-details";
import EventsPage from "./pages/events";
import Users from "./components/ui/Users";
import EventForm from "./components/EventForm";

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
          <Route path="dashboard" element={<DashboardPage />}>
            <Route path="users" element={<Users />} />
            <Route path="manage-events" element={<EventForm />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
