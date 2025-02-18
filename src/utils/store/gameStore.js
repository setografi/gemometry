import { create } from "zustand";

export const useGameStore = create((set) => ({
  score: 0,
  highScore: 0,

  updateScore: (score) => set({ score }),
  updateHighScore: (newScore) =>
    set((state) => ({
      highScore: newScore > state.highScore ? newScore : state.highScore,
    })),

  gameState: {
    snake: [{ x: 0, y: 0 }],
    food: null,
    powerUp: null,
    direction: { x: 1, y: 0 },
    isGameOver: false,
    updateInterval: 200,
    isGhostMode: false,
    scoreMultiplier: 1,
  },

  updateGameState: (updater) =>
    set((state) => ({
      gameState:
        typeof updater === "function"
          ? { ...state.gameState, ...updater(state.gameState) }
          : { ...state.gameState, ...updater },
    })),
}));
