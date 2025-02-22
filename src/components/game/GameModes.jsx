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
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        {modes.map((mode) => (
          <button
            key={mode.id}
            onClick={() =>
              mode.available && mode.id === "endless" && onStartGame()
            }
            className={`p-4 rounded-lg text-left transition-all ${
              mode.available
                ? "bg-neutral-white text-primary-900 hover:bg-primary-200 duration-300 transition-all"
                : "bg-primary-700 text-neutral-white cursor-not-allowed"
            }`}
          >
            <div className="text-xl">{mode.name}</div>
            {!mode.available && <div className="text-base">Coming Soon</div>}
          </button>
        ))}
      </div>

      <div className="flex justify-end">
        <Button onClick={onClose} />
      </div>
    </div>
  );
};

export default GameModes;
