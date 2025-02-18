export class PowerUpSystem {
  constructor(gridSize) {
    this.gridSize = gridSize;
    this.powerUpTypes = {
      slowMotion: {
        color: "#87CEEB",
        duration: 5000,
        effect: (gameState) => ({
          ...gameState,
          updateInterval: gameState.updateInterval * 1.5,
        }),
        probability: 0.25,
      },

      fastMotion: {
        color: "#FF4500",
        duration: 5000,
        effect: (gameState) => ({
          ...gameState,
          updateInterval: gameState.updateInterval * 0.5,
        }),
        probability: 0.25,
      },

      ghostMode: {
        color: "#9370DB",
        duration: 5000,
        effect: (gameState) => ({
          ...gameState,
          isGhostMode: true,
        }),
        probability: 0.25,
      },

      doubleScore: {
        color: "#FFC107",
        duration: 5000,
        effect: (gameState) => ({
          ...gameState,
          scoreMultiplier: 2,
        }),
        probability: 0.25,
      },
    };
    this.activePowerUp = null;
    this.powerUpTimer = null;
  }

  generatePowerUp(width, height, snake) {
    if (Math.random() > 0.15) return null;

    let newPowerUp;
    do {
      newPowerUp = {
        x: Math.floor(Math.random() * (width / this.gridSize)) * this.gridSize,
        y: Math.floor(Math.random() * (height / this.gridSize)) * this.gridSize,
      };
    } while (this.checkCollisionWithSnake(newPowerUp, snake));

    const rand = Math.random();
    let cumulativeProbability = 0;

    for (const [type, properties] of Object.entries(this.powerUpTypes)) {
      cumulativeProbability += properties.probability;
      if (rand <= cumulativeProbability) {
        return {
          ...newPowerUp,
          type,
          ...properties,
        };
      }
    }

    return null;
  }

  checkCollisionWithSnake(powerUp, snake) {
    return snake.some(
      (segment) => segment.x === powerUp.x && segment.y === powerUp.y
    );
  }

  activatePowerUp(powerUpType, gameState) {
    if (this.powerUpTimer) {
      clearTimeout(this.powerUpTimer);
    }

    const powerUp = this.powerUpTypes[powerUpType];
    if (!powerUp) return gameState;

    this.activePowerUp = powerUpType;
    const newGameState = powerUp.effect(gameState);

    return newGameState;
  }

  startPowerUpTimer(duration, updateGameState) {
    if (this.powerUpTimer) {
      clearTimeout(this.powerUpTimer);
    }

    this.powerUpTimer = setTimeout(() => {
      this.deactivatePowerUp(updateGameState);
    }, duration);
  }

  deactivatePowerUp(updateGameState) {
    if (this.activePowerUp) {
      updateGameState((prev) => {
        const resetState = {
          ...prev,
          isGhostMode: false,
          scoreMultiplier: 1,
          updateInterval: 200,
        };
        return resetState;
      });
      this.activePowerUp = null;
    }
  }

  isActive() {
    return this.activePowerUp !== null;
  }

  getActivePowerUp() {
    return this.activePowerUp;
  }
}
