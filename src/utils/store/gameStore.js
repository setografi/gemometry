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

  // // AI state
  // aiState: {
  //   snake: [{ x: 0, y: 0 }],
  //   direction: { x: 1, y: 0 },
  //   score: 0,
  // },

  // Update Game State
  updateGameState: (updater) =>
    set((state) => ({
      gameState:
        typeof updater === "function"
          ? { ...state.gameState, ...updater(state.gameState) }
          : { ...state.gameState, ...updater },
    })),

  // Update AI state
  // updateAIState: (updater) =>
  //   set((state) => ({
  //     aiState:
  //       typeof updater === "function"
  //         ? { ...state.aiState, ...updater(state.aiState) }
  //         : { ...state.aiState, ...updater },
  //   })),
}));
