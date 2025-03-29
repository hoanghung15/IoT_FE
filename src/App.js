import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import Activity from "./pages/activity";
import Sensor from "./pages/sensor";
import Profile from "./pages/profile";
import Header from "./components/header";

function App() {
  return (
    <BrowserRouter>
      <div className="App bg-[#F7F7F7] py-[4px]">
        <Header />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/activity" element={<Activity />} />
          <Route path="/sensor" element={<Sensor />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
