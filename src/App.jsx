import { Route, Routes } from "react-router";
import Home from "./pages/home/Home";
import Dashboard from "./pages/dashboard/Dashboard";
import Timer from "./pages/timer/Timer";
import "./App.css";
import Sidebar from "./components/sidebar/Sidebar";

function App() {
  return (
    <div className="app">
      <nav className="logo">
        <img src="F.png" alt="logo" />
        <h2>Focus Flow</h2>
      </nav>
      <div className="main">
        <Sidebar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/insights" element={<Dashboard />} />
          <Route path="/timer" element={<Timer />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
