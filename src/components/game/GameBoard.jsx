import React from "react";
import Player from "../sprites/Player";
import Tileset from "../tilesets/Tileset";

export function GameBoard({
  canvasRef,
  gameState,
  dimensions,
  gridSize,
  isEating,
}) {
  return (
    <>
      <Tileset
        canvasRef={canvasRef}
        dimensions={dimensions}
        gridSize={gridSize}
      />
      <Player
        canvasRef={canvasRef}
        snake={gameState.snake}
        food={gameState.food}
        powerUp={gameState.powerUp}
        gridSize={gridSize}
        isEating={isEating}
      />
    </>
  );
}
