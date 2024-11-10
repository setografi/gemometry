import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";

import HomePage from "./pages/HomePage";
import GamePage from "./pages/GamePage";
import Navbar from "./components/layouts/Navbar";

function App() {
  return (
    <Router>
      {/* future={{ v7_startTransition: true, v7_relativeSplatPath: true }} */}
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/start" element={<GamePage />} />
      </Routes>
    </Router>
  );
}

export default App;
