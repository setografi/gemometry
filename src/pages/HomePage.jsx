import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Popup from "../components/common/Popup";
import GameModes from "../components/game/GameModes";
import HighScores from "../components/game/HighScores";
import Settings from "../components/game/Settings";
import About from "../components/game/About";

const HomePage = () => {
  const navigate = useNavigate();
  const [activePopup, setActivePopup] = useState(null);

  const closePopup = () => setActivePopup(null);
  const startGame = () => navigate("/game");

  return (
    <div className="relative max-h-screen bg-primary-900 overflow-hidden">
      {/* Content */}
      <div className="relative h-screen flex flex-col z-10">
        <div className="flex-grow flex flex-col items-center justify-center text-center">
          {/* Title */}
          <div className="flex flex-col space-y-2 mb-10">
            <h2 className="text-4xl text-neutral-white">Gemo and</h2>
            <h2 className="text-4xl text-neutral-white">The Astro Code</h2>
          </div>

          {/* Menu Buttons */}
          <div className="flex flex-col space-y-2 w-full max-w-xs">
            <button
              onClick={() => setActivePopup("play")}
              className="text-neutral-white text-xl hover:text-primary-400 duration-300 transition-all"
            >
              Play
            </button>
            <button
              onClick={() => setActivePopup("highscore")}
              className="text-neutral-white text-xl hover:text-primary-400 duration-300 transition-all"
            >
              High Score
            </button>
            <button
              onClick={() => setActivePopup("settings")}
              className="text-neutral-white text-xl hover:text-primary-400 duration-300 transition-all"
            >
              Settings
            </button>
            <button
              onClick={() => setActivePopup("about")}
              className="text-neutral-white text-xl hover:text-primary-400 duration-300 transition-all"
            >
              About
            </button>
          </div>
        </div>
      </div>

      {/* Popups */}
      <Popup
        isOpen={activePopup === "play"}
        onClose={closePopup}
        title="Select Game Mode"
      >
        <GameModes onClose={closePopup} onStartGame={startGame} />
      </Popup>

      <Popup
        isOpen={activePopup === "highscore"}
        onClose={closePopup}
        title="High Scores"
      >
        <HighScores onClose={closePopup} />
      </Popup>

      <Popup
        isOpen={activePopup === "settings"}
        onClose={closePopup}
        title="Settings"
      >
        <Settings onClose={closePopup} />
      </Popup>

      <Popup
        isOpen={activePopup === "about"}
        onClose={closePopup}
        title="About"
      >
        <About onClose={closePopup} />
      </Popup>
    </div>
  );
};

export default HomePage;
