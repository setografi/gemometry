import React, { useEffect, useState, useRef, useCallback } from "react";
import { Menu } from "lucide-react";

import { useGameStore } from "../utils/store/gameStore";
import { ScoringSystem } from "../utils/systems/ScoringSystem";
import { FoodSystem } from "../utils/systems/FoodSystem";
import { PowerUpSystem } from "../utils/systems/PowerUpSystem";

import Player from "../components/sprites/Player";
import Tileset from "../components/tilesets/Tileset";
import VirtualPad from "../components/controller/VirtualPad";
import Popup from "../components/common/Popup";
import GameMenu from "../components/layout/GameMenu";

function GamePage() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const scoringSystem = useRef(new ScoringSystem());
  const foodSystem = useRef(new FoodSystem(20));
  const powerUpSystem = useRef(new PowerUpSystem(20));
  const [activePowerUps, setActivePowerUps] = useState(new Map());
  const [powerUpTimers, setPowerUpTimers] = useState(new Map());

  const gridSize = 20;
  const {
    score,
    highScore,
    updateScore,
    gameState,
    updateHighScore,
    updateGameState,
  } = useGameStore();
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isEating, setIsEating] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Initialize game dimensions and starting positions
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const width =
          Math.floor(containerRef.current.clientWidth / gridSize) * gridSize;
        const height =
          Math.floor(containerRef.current.clientHeight / gridSize) * gridSize;
        setDimensions({ width, height });

        // Initialize snake and food positions only if not already set
        if (gameState.snake[0].x === 0 && gameState.snake[0].y === 0) {
          const initialX = Math.floor(width / (2 * gridSize)) * gridSize;
          const initialY = Math.floor(height / (2 * gridSize)) * gridSize;
          const initialSnake = [{ x: initialX, y: initialY }];

          // Generate initial food
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

  // Handle keyboard controls
  const handleKeyPress = useCallback(
    (e) => {
      if (gameState.isGameOver) return;

      const directions = {
        ArrowUp: { x: 0, y: -1 },
        ArrowDown: { x: 0, y: 1 },
        ArrowLeft: { x: -1, y: 0 },
        ArrowRight: { x: 1, y: 0 },
      };

      if (directions[e.key]) {
        updateGameState((prev) => {
          if (
            prev.direction.x === -directions[e.key].x &&
            prev.direction.y === -directions[e.key].y
          ) {
            return prev;
          }
          return { ...prev, direction: directions[e.key] };
        });
      }
    },
    [gameState.isGameOver, updateGameState]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [handleKeyPress]);

  //Handle virtual controls for mobile + tablet
  const handleVirtualPadInput = (newDirection) => {
    updateGameState((prev) => {
      if (
        prev.direction.x === -newDirection.x &&
        prev.direction.y === -newDirection.y
      ) {
        return prev;
      }
      return { ...prev, direction: newDirection };
    });
  };

  const { isGhostMode } = useGameStore().gameState;

  // useEffect(() => {
  //   if (isGhostMode) {
  //     console.log("Ghost mode aktif!");
  //   }
  // }, [isGhostMode]);

  // Collisions
  const checkCollision = (head, snakeBody) => {
    if (gameState.isGhostMode) {
      return false;
    }

    return snakeBody.some((segment, index) => {
      if (index === 0) return false;
      return segment.x === head.x && segment.y === head.y;
    });
  };

  // Function untuk update specific power-up timer
  const updatePowerUpTimer = (powerUpType, remaining) => {
    setPowerUpTimers((prev) => new Map(prev).set(powerUpType, remaining));
  };

  // Function untuk update active power-ups
  const updateActivePowerUp = (powerUpType, powerUpData) => {
    setActivePowerUps((prev) => {
      const newMap = new Map(prev);
      if (powerUpData === null) {
        newMap.delete(powerUpType);
      } else {
        newMap.set(powerUpType, powerUpData);
      }
      return newMap;
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

        // Check for collisions
        if (!prev.isGhostMode && checkCollision(newHead, prev.snake)) {
          return { ...prev, isGameOver: true };
        }

        // Check if snake ate food
        const ateFood =
          prev.food && newHead.x === prev.food.x && newHead.y === prev.food.y;

        if (ateFood) {
          setIsEating(true);
          setTimeout(() => setIsEating(false), 200);

          const points = prev.food.points * prev.scoreMultiplier;
          const newScore = scoringSystem.current.addScore(points);
          updateScore(newScore);
          updateHighScore(scoringSystem.current.getHighScore());

          // Generate new food
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

          // Snake grows by one segment
          return {
            ...prev,
            snake: newSnake,
            food: newFood,
            powerUp: newPowerUp || prev.powerUp,
          };
        }

        // Check for power-up collison
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

        // Normal movement without growth
        const newSnake = [newHead, ...prev.snake.slice(0, -1)];

        return {
          ...prev,
          snake: newSnake,
        };
      });
    }, gameState.updateInterval);

    return () => clearInterval(gameLoop);
  }, [dimensions, gameState.isGameOver, gameState.updateInterval]);

  // Handle game over
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

  return (
    <section
      ref={containerRef}
      className="fixed inset-0 w-full h-full overflow-hidden"
    >
      <div className="absolute top-4 px-6 z-20">
        <button
          onClick={() => setIsMenuOpen(true)}
          className="bg-primary-900 bg-opacity-10 backdrop-blur-sm p-2 border border-primary-200 border-opacity-20 rounded-lg"
        >
          <Menu className="text-neutral-white" size={24} />
        </button>
      </div>

      {/* Game Menu */}
      <Popup
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        title="Game Menu"
      >
        <GameMenu onClose={() => setIsMenuOpen(false)} />
      </Popup>

      <div className="absolute top-4 w-full flex flex-row justify-end px-6 z-10">
        <div className="flex flex-col space-y-2">
          <div className="flex flex-row space-x-6">
            <h3 className="text-base md:text-xl text-neutral-white">
              Score: {score}
            </h3>
            <h3 className="text-base md:text-xl text-neutral-white">
              High Score: {highScore}
            </h3>
          </div>

          {/* {powerUpSystem.current.isActive() && (
            <h3 className="text-base md:text-xl text-end text-yellow-400">
              Power-up: {powerUpSystem.current.getActivePowerUp()}
            </h3>
          )} */}

          {/* Render multiple power-ups */}
          <div className="flex flex-col space-y-2">
            {Array.from(activePowerUps).map(([type, powerUp]) => (
              <div
                key={type}
                className="flex flex-col text-accent-amber text-end"
              >
                <h3
                  className="text-base md:text-xl"
                  style={{ color: powerUp.color }}
                >
                  {powerUp.displayName}
                </h3>
                <p className="text-base md:text-xl">
                  Time Left:{" "}
                  {((powerUpTimers.get(type) || 0) / 1000).toFixed(1)}s
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {gameState.isGameOver && (
        <div className="absolute inset-0 bg-primary-900 bg-opacity-50 flex items-center justify-center z-20">
          <div className="bg-primary-900 bg-opacity-10 backdrop-blur-md rounded-lg p-10 max-w-sm w-full text-center shadow-lg border border-primary-200 border-opacity-20">
            <h2 className="text-4xl text-neutral-white mb-4">Game Over!</h2>
            <p className="text-neutral-white text-base mb-6">
              Final Score: {score}
            </p>
            <button
              className="bg-neutral-white text-primary-900 text-base px-6 py-3 rounded hover:bg-primary-200 transition duration-300"
              onClick={handleRestart}
            >
              Play Again
            </button>
          </div>
        </div>
      )}

      {/* {showPopup && <Popup onClose={() => setShowPopup(false)} />} */}

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

      <VirtualPad onDirectionChange={handleVirtualPadInput} />
    </section>
  );
}

export default GamePage;
