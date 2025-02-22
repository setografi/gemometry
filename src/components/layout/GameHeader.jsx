import React from "react";

function ScoreDisplay({ score, highScore }) {
  return (
    <div className="flex flex-row space-x-6">
      <h3 className="text-base md:text-xl text-neutral-white">
        Score: {score}
      </h3>
      <h3 className="text-base md:text-xl text-neutral-white">
        High Score: {highScore}
      </h3>
    </div>
  );
}

function PowerUpDisplay({ activePowerUps, powerUpTimers }) {
  return (
    <div className="flex flex-col space-y-2">
      {Array.from(activePowerUps).map(([type, powerUp]) => (
        <div key={type} className="flex flex-col text-accent-amber text-end">
          <h3 className="text-base md:text-xl" style={{ color: powerUp.color }}>
            {powerUp.displayName}
          </h3>
          <p className="text-base md:text-xl">
            Time Left: {((powerUpTimers.get(type) || 0) / 1000).toFixed(1)}s
          </p>
        </div>
      ))}
    </div>
  );
}

export function GameHeader({
  score,
  highScore,
  activePowerUps,
  powerUpTimers,
}) {
  return (
    <div className="absolute top-4 w-full flex flex-row justify-end px-6 z-10">
      <div className="flex flex-col space-y-2">
        <ScoreDisplay score={score} highScore={highScore} />
        <PowerUpDisplay
          activePowerUps={activePowerUps}
          powerUpTimers={powerUpTimers}
        />
      </div>
    </div>
  );
}
