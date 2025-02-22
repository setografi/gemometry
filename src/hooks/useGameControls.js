import { useCallback, useEffect } from "react";

export function useGameControls(gameState, updateGameState) {
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

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [handleKeyPress]);

  return {
    handleKeyPress,
    handleVirtualPadInput,
  };
}
