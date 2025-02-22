export class FoodSystem {
  constructor(gridSize) {
    this.gridSize = gridSize;
    this.foodTypes = {
      normal: { color: "#F2F2F2", points: 1, probability: 0.9 }, // 90% chance
      special: { color: "#FFC107", points: 5, probability: 0.4 }, // 30% chance
    };
  }

  generateFood(width, height, snake) {
    let newFood;
    do {
      newFood = {
        x: Math.floor(Math.random() * (width / this.gridSize)) * this.gridSize,
        y: Math.floor(Math.random() * (height / this.gridSize)) * this.gridSize,
      };
    } while (this.checkCollisionWithSnake(newFood, snake));

    // Determine food type based on probability
    const rand = Math.random();
    let cumulativeProbability = 0;

    for (const [type, properties] of Object.entries(this.foodTypes)) {
      cumulativeProbability += properties.probability;
      if (rand <= cumulativeProbability) {
        return {
          ...newFood,
          type,
          ...properties,
        };
      }
    }

    // Fallback to normal food
    return {
      ...newFood,
      type: "normal",
      ...this.foodTypes.normal,
    };
  }

  checkCollisionWithSnake(food, snake) {
    return snake.some(
      (segment) => segment.x === food.x && segment.y === food.y
    );
  }
}
