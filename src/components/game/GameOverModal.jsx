import React from "react";

export function GameOverModal({ score, onRestart }) {
  return (
    <div className="absolute inset-0 bg-primary-900 bg-opacity-50 flex items-center justify-center z-20">
      <div className="bg-primary-900 bg-opacity-10 backdrop-blur-md rounded-lg p-10 max-w-sm w-full text-center shadow-lg border border-primary-200 border-opacity-20">
        <h2 className="text-4xl text-neutral-white mb-4">Game Over!</h2>
        <p className="text-neutral-white text-base mb-6">
          Final Score: {score}
        </p>
        <button
          className="bg-neutral-white text-primary-900 text-base px-6 py-3 rounded hover:bg-primary-200 transition duration-300"
          onClick={onRestart}
        >
          Play Again
        </button>
      </div>
    </div>
  );
}
