import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/login";
import Home from "./pages/home";

const App = () => {
  return (
    <div className="bg-zinc-950 text-white min-h-screen">
      <BrowserRouter>
        <Routes>
          <Route index path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<></>} />
          <Route path="/" element={<></>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
