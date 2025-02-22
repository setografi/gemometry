export class PowerUpSystem {
  constructor(gridSize) {
    this.gridSize = gridSize;
    this.powerUpTypes = {
      slowMotion: {
        displayName: "Slow Motion",
        color: "#87CEEB",
        duration: 8000,
        effect: (gameState) => ({
          ...gameState,
          updateInterval: gameState.updateInterval * 1.5,
        }),
        probability: 0.25,
      },

      fastMotion: {
        displayName: "Fast Motion",
        color: "#FF4500",
        duration: 6000,
        effect: (gameState) => ({
          ...gameState,
          updateInterval: gameState.updateInterval * 0.5,
        }),
        probability: 0.25,
      },

      ghostMode: {
        displayName: "Ghost Mode",
        color: "#9370DB",
        duration: 9000,
        effect: (gameState) => ({
          ...gameState,
          isGhostMode: true,
        }),
        probability: 0.25,
      },

      doublePoint: {
        displayName: "Double Points",
        color: "#FFC107",
        duration: 10000,
        effect: (gameState) => ({
          ...gameState,
          scoreMultiplier: 5,
        }),
        probability: 0.25,
      },
    };

    this.activePowerUps = new Map();
    this.powerUpTimers = new Map();
    this.remainingTime = 0;
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
    if (this.powerUpTimers.has(powerUpType)) {
      clearTimeout(this.powerUpTimers.get(powerUpType));
    }

    const powerUp = this.powerUpTypes[powerUpType];
    if (!powerUp) return gameState;

    this.activePowerUps.set(powerUpType, powerUp);
    // this.remainingTime = powerUp.duration;

    const newGameState = powerUp.effect(gameState);
    return newGameState;
  }

  startPowerUpTimer(
    duration,
    updateGameState,
    updateTimerUI,
    powerUpType,
    setActivePowerUp
  ) {
    if (this.powerUpTimers.has(powerUpType)) {
      clearTimeout(this.powerUpTimers.get(powerUpType));
    }

    const startTime = Date.now();
    const timerId = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(duration - elapsed, 0);

      updateTimerUI(powerUpType, remaining);

      if (remaining <= 0) {
        clearInterval(timerId);
        this.deactivatePowerUp(updateGameState, powerUpType, setActivePowerUp);
      }
    }, 100);

    this.powerUpTimers.set(powerUpType, timerId);
  }

  deactivatePowerUp(updateGameState, powerUpType, setActivePowerUp) {
    this.activePowerUps.delete(powerUpType);
    this.powerUpTimers.delete(powerUpType);

    updateGameState((prev) => {
      const resetState = {
        ...prev,
        isGhostMode: this.activePowerUps.has("ghostMode"),
        scoreMultiplier: this.activePowerUps.has("doublePoint") ? 5 : 1,
        updateInterval: this.calculateUpdateInterval(),
      };
      return resetState;
    });

    setActivePowerUp(powerUpType, null);
  }

  calculateUpdateInterval() {
    let interval = 200;
    if (this.activePowerUps.has("slowMotion")) interval *= 1.5;
    if (this.activePowerUps.has("fastMotion")) interval *= 0.5;
    return interval;
  }

  isActive(powerUpType) {
    return this.activePowerUps.has(powerUpType);
  }

  getActivePowerUp(powerUpType) {
    return this.activePowerUps.get(powerUpType);
  }
}
