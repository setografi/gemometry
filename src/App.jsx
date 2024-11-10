import React, { useState } from "react";
import "./App.css";

import BackgroundPage from "./components/common/BackgroundPage";
import HomePage from "./pages/HomePage";
import GamePage from "./pages/GamePage";
import HowPage from "./pages/HowPage";
import AboutPage from "./pages/AboutPage";

function App() {
  const [currentPage, setCurrentPage] = useState("home");

  return (
    <div className="relative w-full h-dvh flex justify-center items-center">
      <div className="absolute">
        <BackgroundPage />
      </div>

      {currentPage === "home" && <HomePage setCurrentPage={setCurrentPage} />}
      {currentPage === "start" && <GamePage setCurrentPage={setCurrentPage} />}
      {currentPage === "how-to-play" && (
        <HowPage setCurrentPage={setCurrentPage} />
      )}
      {currentPage === "about" && <AboutPage setCurrentPage={setCurrentPage} />}
    </div>
  );
}

export default App;
