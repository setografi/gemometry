import React from "react";
import { useNavigate } from "react-router-dom";

const GameMenu = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  return (
    <div className="w-full flex flex-col items-start space-y-2">
      <button
        onClick={onClose}
        className="text-neutral-white text-base hover:text-primary-400 duration-300 transition-all"
      >
        Continue
      </button>

      <button
        onClick={() => window.location.reload()}
        className="text-neutral-white text-base hover:text-primary-400 duration-300 transition-all"
      >
        Restart Game
      </button>

      <button
        onClick={() => navigate("/")}
        className="text-neutral-white text-base hover:text-primary-400 duration-300 transition-all"
      >
        Return to Home
      </button>
    </div>
  );
};

export default GameMenu;
