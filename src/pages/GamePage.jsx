import React, { useEffect, useState, useRef } from "react";

import { ScoringSystem, FoodSystem } from "../utils/GameSystems";
import Player from "../components/game/Player";
import Map from "../components/game/Map";
import VirtualPad from "../components/common/VirtualPad";
import Popup from "../components/common/Popup";

function GamePage() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const scoringSystem = useRef(new ScoringSystem());
  const foodSystem = useRef(new FoodSystem(20));

  const gridSize = 20;
  const updateInterval = 200; // Diperlambat dari 100 menjadi 200 ms

  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameState, setGameState] = useState({
    snake: [{ x: 0, y: 0 }],
    food: null,
    direction: { x: 1, y: 0 },
    isGameOver: false,
  });
  const [isEating, setIsEating] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

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

          setGameState((prev) => ({
            ...prev,
            snake: initialSnake,
            food: initialFood,
          }));
        }
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  // Handle keyboard controls
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (gameState.isGameOver) return;

      const directions = {
        ArrowUp: { x: 0, y: -1 },
        ArrowDown: { x: 0, y: 1 },
        ArrowLeft: { x: -1, y: 0 },
        ArrowRight: { x: 1, y: 0 },
      };

      if (directions[e.key]) {
        const newDirection = directions[e.key];
        // Prevent 180-degree turns
        setGameState((prev) => {
          if (
            prev.direction.x === -newDirection.x &&
            prev.direction.y === -newDirection.y
          ) {
            return prev;
          }
          return { ...prev, direction: newDirection };
        });
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [gameState.isGameOver]);

  //Handle virtual controls for mobile + tablet
  const handleVirtualPadInput = (newDirection) => {
    setGameState((prev) => {
      if (
        prev.direction.x === -newDirection.x &&
        prev.direction.y === -newDirection.y
      ) {
        return prev;
      }
      return { ...prev, direction: newDirection };
    });
  };

  // Check for collisions
  const checkCollision = (head, snakeBody) => {
    // Check collision with self
    return snakeBody.some((segment, index) => {
      // Skip the head
      if (index === 0) return false;
      return segment.x === head.x && segment.y === head.y;
    });
  };

  // Main game loop
  useEffect(() => {
    if (!canvasRef.current || dimensions.width === 0 || gameState.isGameOver)
      return;

    const gameLoop = setInterval(() => {
      setGameState((prev) => {
        // Calculate new head position
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
        if (checkCollision(newHead, prev.snake)) {
          return { ...prev, isGameOver: true };
        }

        // Check if snake ate food
        const ateFood =
          prev.food && newHead.x === prev.food.x && newHead.y === prev.food.y;

        if (ateFood) {
          // Trigger eating animation
          setIsEating(true);
          setTimeout(() => setIsEating(false), 200); // Reset after 200ms

          // Update score
          const newScore = scoringSystem.current.addScore(1); // Selalu tambah 1 point
          setScore(newScore);
          setHighScore(scoringSystem.current.getHighScore());

          // IF Score 20 open Popup
          if (newScore === 20) {
            setShowPopup(true);
          }

          // Generate new food
          const newSnake = [newHead, ...prev.snake];
          const newFood = foodSystem.current.generateFood(
            dimensions.width,
            dimensions.height,
            newSnake
          );

          // Snake grows by one segment
          return {
            ...prev,
            snake: newSnake, // Menambah satu segment saja
            food: newFood,
          };
        }

        // Normal movement without growth
        const newSnake = [newHead, ...prev.snake.slice(0, -1)];

        return {
          ...prev,
          snake: newSnake,
        };
      });
    }, updateInterval);

    return () => clearInterval(gameLoop);
  }, [dimensions, gameState.isGameOver]);

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
    setScore(0);

    setGameState({
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
      <div className="absolute top-4 left-4 text-white z-10">
        <div className="text-2xl">Score: {score}</div>
        <div className="text-lg">High Score: {highScore}</div>
      </div>

      {gameState.isGameOver && (
        <div className="absolute inset-0 bg-[#121212] bg-opacity-50 flex items-center justify-center z-20">
          <div className="bg-white p-8 rounded-lg text-center">
            <h2 className="text-2xl font-bold mb-4">Game Over!</h2>
            <p className="text-lg mb-4">Final Score: {score}</p>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={handleRestart}
            >
              Play Again
            </button>
          </div>
        </div>
      )}

      {showPopup && <Popup onClose={() => setShowPopup(false)} />}

      <Map canvasRef={canvasRef} dimensions={dimensions} gridSize={gridSize} />
      <Player
        canvasRef={canvasRef}
        snake={gameState.snake}
        food={gameState.food}
        gridSize={gridSize}
        isEating={isEating}
      />

      <VirtualPad onDirectionChange={handleVirtualPadInput} />
    </section>
  );
}

export default GamePage;
