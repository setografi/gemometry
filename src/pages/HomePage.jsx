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
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Animated stars background */}
      <div className="absolute inset-0 bg-[radial-gradient(white,rgba(255,255,255,.2)_2px,transparent_40px)] bg-[length:50px_50px] animate-twinkle" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-8 flex flex-col min-h-screen">
        <div className="flex-grow flex flex-col items-center justify-center text-center">
          {/* Title */}
          <h1 className="text-6xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            Gemo and
          </h1>
          <h2 className="text-4xl font-bold mb-12 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
            The Astro Code
          </h2>

          {/* Menu Buttons */}
          <div className="space-y-4 w-full max-w-xs">
            <button
              onClick={() => setActivePopup("play")}
              className="w-full py-3 px-6 bg-purple-600 hover:bg-purple-700 rounded-lg font-bold transition-all transform hover:scale-105"
            >
              Play
            </button>
            <button
              onClick={() => setActivePopup("highscore")}
              className="w-full py-3 px-6 bg-blue-600 hover:bg-blue-700 rounded-lg font-bold transition-all transform hover:scale-105"
            >
              High Score
            </button>
            <button
              onClick={() => setActivePopup("settings")}
              className="w-full py-3 px-6 bg-indigo-600 hover:bg-indigo-700 rounded-lg font-bold transition-all transform hover:scale-105"
            >
              Settings
            </button>
            <button
              onClick={() => setActivePopup("about")}
              className="w-full py-3 px-6 bg-violet-600 hover:bg-violet-700 rounded-lg font-bold transition-all transform hover:scale-105"
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
