import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PublicHome from "./pages/PublicHome";
import EventPage from "./pages/EventPage";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import RegisterChurch from "./pages/RegisterChurch";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PublicHome />} />

        <Route path="/e/:slug" element={<EventPage />} />

        <Route path="/login" element={<Login />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
        <Route path="/register" element={<RegisterChurch />} />
      </Routes>
    </Router>
  );
}

export default App;
