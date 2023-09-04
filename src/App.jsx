import { Route, Routes } from "react-router";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";

import Pomodoro from "./pages/timer/Pomodoro";
import Stopwatch from "./pages/timer/Stopwatch";
import Home from "./pages/home/Home";

import Sidebar from "./components/sidebar/Sidebar";

import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Insights from "./pages/insights/Insights";

function App() {
  const isPomodoro = useSelector((state) => state.tasks.isPomodoro);
  return (
    <div className="app">
      <nav className="logo">
        <img src="/public/F.png" alt="logo" />
        <h2>Focus Flow</h2>
      </nav>
      <div className="main">
        <Sidebar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/insights" element={<Insights />} />
          <Route
            path="/timer/:id"
            element={isPomodoro ? <Pomodoro /> : <Stopwatch />}
          />
        </Routes>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default App;
