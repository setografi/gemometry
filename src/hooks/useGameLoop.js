import { useEffect, useRef } from "react";
import { useGameStore } from "../utils/store/gameStore";
import { checkCollision } from "../utils/systems/Collision";

export function useGameLoop(
  dimensions,
  foodSystem,
  powerUpSystem,
  scoringSystem
) {
  const { gameState, updateGameState, updateScore, updateHighScore } =
    useGameStore();
  const gridSize = 20;

  useEffect(() => {
    if (dimensions.width === 0 || gameState.isGameOver) return;

    const gameLoop = setInterval(() => {
      updateGameState((prev) => {
        if (prev.isGameOver) {
          clearInterval(gameLoop);
          return prev;
        }

        const newHead = {
          x:
            (prev.snake[0].x + prev.direction.x * gridSize + dimensions.width) %
            dimensions.width,
          y:
            (prev.snake[0].y +
              prev.direction.y * gridSize +
              dimensions.height) %
            dimensions.height,
        };

        if (!prev.isGhostMode && checkCollision(newHead, prev.snake)) {
          return { ...prev, isGameOver: true };
        }

        const ateFood =
          prev.food && newHead.x === prev.food.x && newHead.y === prev.food.y;
        if (ateFood) {
          const points = prev.food.points * prev.scoreMultiplier;
          const newScore = scoringSystem.current.addScore(points);
          updateScore(newScore);
          updateHighScore(scoringSystem.current.getHighScore());

          const newSnake = [newHead, ...prev.snake];
          const newFood = foodSystem.current.generateFood(
            dimensions.width,
            dimensions.height,
            newSnake
          );
          const newPowerUp = powerUpSystem.current.generatePowerUp(
            dimensions.width,
            dimensions.height,
            newSnake
          );

          return {
            ...prev,
            snake: newSnake,
            food: newFood,
            powerUp: newPowerUp || prev.powerUp,
          };
        }

        const newSnake = [newHead, ...prev.snake.slice(0, -1)];
        return { ...prev, snake: newSnake };
      });
    }, gameState.updateInterval);

    return () => clearInterval(gameLoop);
  }, [dimensions, gameState.isGameOver, gameState.updateInterval]);
}
