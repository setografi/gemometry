import { useState, useRef, useEffect } from "react";
import { useGameStore } from "../utils/store/gameStore";
import { useGameSystems } from "./useGameSystems";
import { useGameControls } from "./useGameControls";

export function useGameLogic() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEating, setIsEating] = useState(false);
  const gridSize = 20;

  const {
    gameState,
    score,
    highScore,
    updateGameState,
    updateScore,
    updateHighScore,
  } = useGameStore();

  const {
    scoringSystem,
    foodSystem,
    powerUpSystem,
    activePowerUps,
    powerUpTimers,
    updatePowerUpTimer,
    updateActivePowerUp,
  } = useGameSystems();

  const { handleKeyPress, handleVirtualPadInput } = useGameControls(
    gameState,
    updateGameState
  );

  // Initialize game dimensions and starting positions
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const width =
          Math.floor(containerRef.current.clientWidth / gridSize) * gridSize;
        const height =
          Math.floor(containerRef.current.clientHeight / gridSize) * gridSize;
        setDimensions({ width, height });

        if (gameState.snake[0].x === 0 && gameState.snake[0].y === 0) {
          const initialX = Math.floor(width / (2 * gridSize)) * gridSize;
          const initialY = Math.floor(height / (2 * gridSize)) * gridSize;
          const initialSnake = [{ x: initialX, y: initialY }];
          const initialFood = foodSystem.current.generateFood(
            width,
            height,
            initialSnake
          );

          updateGameState({
            snake: initialSnake,
            food: initialFood,
          });
        }
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const checkCollision = (head, snakeBody) => {
    if (gameState.isGhostMode) return false;

    return snakeBody.some((segment, index) => {
      if (index === 0) return false;
      return segment.x === head.x && segment.y === head.y;
    });
  };

  // Main game loop
  useEffect(() => {
    if (!canvasRef.current || dimensions.width === 0 || gameState.isGameOver)
      return;

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
          setIsEating(true);
          setTimeout(() => setIsEating(false), 200);

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

        const hitPowerUp =
          prev.powerUp &&
          newHead.x === prev.powerUp.x &&
          newHead.y === prev.powerUp.y;

        if (hitPowerUp) {
          const newGameState = powerUpSystem.current.activatePowerUp(
            prev.powerUp.type,
            prev
          );
          updateActivePowerUp(prev.powerUp.type, prev.powerUp);

          powerUpSystem.current.startPowerUpTimer(
            prev.powerUp.duration,
            updateGameState,
            updatePowerUpTimer,
            prev.powerUp.type,
            updateActivePowerUp
          );

          const newPowerUp = powerUpSystem.current.generatePowerUp(
            dimensions.width,
            dimensions.height,
            [newHead, ...prev.snake]
          );
          return { ...newGameState, powerUp: newPowerUp };
        }

        const newSnake = [newHead, ...prev.snake.slice(0, -1)];
        return { ...prev, snake: newSnake };
      });
    }, gameState.updateInterval);

    return () => clearInterval(gameLoop);
  }, [dimensions, gameState.isGameOver, gameState.updateInterval]);

  const handleRestart = () => {
    const initialX = Math.floor(dimensions.width / (2 * gridSize)) * gridSize;
    const initialY = Math.floor(dimensions.height / (2 * gridSize)) * gridSize;
    const initialSnake = [{ x: initialX, y: initialY }];
    const initialFood = foodSystem.current.generateFood(
      dimensions.width,
      dimensions.height,
      initialSnake
    );

    scoringSystem.current.resetScore();
    updateScore(0);

    updateGameState({
      snake: initialSnake,
      food: initialFood,
      direction: { x: 1, y: 0 },
      isGameOver: false,
    });
  };

  return {
    containerRef,
    canvasRef,
    dimensions,
    gameState,
    score,
    highScore,
    isMenuOpen,
    setIsMenuOpen,
    handleRestart,
    handleVirtualPadInput,
    activePowerUps,
    powerUpTimers,
    isEating,
  };
}
