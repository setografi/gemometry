import React from "react";
import { useNavigate } from "react-router-dom";

const GameMenu = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  return (
    <div className="space-y-4">
      <button
        onClick={() => navigate("/")}
        className="w-full py-3 px-6 bg-purple-600 hover:bg-purple-700 rounded-lg font-bold"
      >
        Return to Home
      </button>
      <button
        onClick={() => window.location.reload()}
        className="w-full py-3 px-6 bg-blue-600 hover:bg-blue-700 rounded-lg font-bold"
      >
        Restart Game
      </button>
      <button
        onClick={onClose}
        className="w-full py-3 px-6 bg-gray-600 hover:bg-gray-700 rounded-lg font-bold"
      >
        Resume
      </button>
    </div>
  );
};

export default GameMenu;
