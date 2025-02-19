import React from "react";
import Button from "../common/Button";

const GameModes = ({ onClose, onStartGame }) => {
  const modes = [
    { id: "story", name: "Story Mode", available: false },
    { id: "time", name: "Time Attack Mode", available: false },
    { id: "endless", name: "Endless Mode", available: true },
    { id: "challenge", name: "Challenge Mode", available: false },
  ];

  return (
    <div className="relative">
      <Button onClick={onClose} />
      <div className="grid gap-4 mt-6">
        {modes.map((mode) => (
          <button
            key={mode.id}
            onClick={() =>
              mode.available && mode.id === "endless" && onStartGame()
            }
            className={`p-4 rounded-lg text-left transition-all ${
              mode.available
                ? "bg-purple-600 hover:bg-purple-700 text-white"
                : "bg-gray-700 text-gray-400 cursor-not-allowed"
            }`}
          >
            <div className="font-bold text-lg">{mode.name}</div>
            {!mode.available && <div className="text-sm">Coming Soon</div>}
          </button>
        ))}
      </div>
    </div>
  );
};

export default GameModes;
