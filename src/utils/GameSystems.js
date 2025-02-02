export class ScoringSystem {
  constructor() {
    this.score = 0;
    this.highScore = localStorage.getItem("snakeHighScore") || 0;
  }

  addScore(points = 1) {
    this.score += points;
    if (this.score > this.highScore) {
      this.highScore = this.score;
      localStorage.setItem("snakeHighScore", this.highScore);
    }
    return this.score;
  }

  getScore() {
    return this.score;
  }

  getHighScore() {
    return this.highScore;
  }

  resetScore() {
    this.score = 0;
    return this.score;
  }
}

export class FoodSystem {
  constructor(gridSize) {
    this.gridSize = gridSize;
    // Simplified food system to only use normal food
    this.foodTypes = {
      normal: { color: "#F2F2F2", points: 1 },
    };
  }

  generateFood(width, height, snake) {
    let newFood;
    do {
      newFood = {
        x: Math.floor(Math.random() * (width / this.gridSize)) * this.gridSize,
        y: Math.floor(Math.random() * (height / this.gridSize)) * this.gridSize,
        type: "normal",
        ...this.foodTypes.normal,
      };
    } while (this.checkCollisionWithSnake(newFood, snake));

    return newFood;
  }

  checkCollisionWithSnake(food, snake) {
    return snake.some(
      (segment) => segment.x === food.x && segment.y === food.y
    );
  }
}
