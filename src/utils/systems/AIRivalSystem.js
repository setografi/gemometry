// AIRivalSystem.js
export class AIRivalSystem {
  constructor(gridSize) {
    this.gridSize = gridSize;
    this.snake = [];
    this.direction = { x: 1, y: 0 };
    this.color = { r: 255, g: 77, b: 77 }; // Merah untuk membedakan dengan player
    this.lastUpdateTime = 0;
    this.updateInterval = 200;
  }

  // Initialize AI snake position
  initialize(width, height) {
    const initialX = Math.floor(width / (4 * this.gridSize)) * this.gridSize;
    const initialY = Math.floor(height / (4 * this.gridSize)) * this.gridSize;
    this.snake = [{ x: initialX, y: initialY }];
  }

  // Calculate next move based on food position
  calculateNextMove(food, dimensions, playerSnake) {
    if (!food || this.snake.length === 0) return this.direction;

    const head = this.snake[0];
    const possibleMoves = this.getPossibleMoves(dimensions, playerSnake);

    if (possibleMoves.length === 0) return this.direction;

    // Calculate distances to food for each possible move
    const movesWithScores = possibleMoves.map((move) => {
      const newPos = {
        x:
          (head.x + move.x * this.gridSize + dimensions.width) %
          dimensions.width,
        y:
          (head.y + move.y * this.gridSize + dimensions.height) %
          dimensions.height,
      };

      // Hitung jarak ke makanan
      const distanceToFood =
        Math.abs(newPos.x - food.x) + Math.abs(newPos.y - food.y);

      // Beri bonus jika gerakan searah dengan arah sekarang
      const directionBonus =
        move.x === this.direction.x && move.y === this.direction.y ? 5 : 0;

      // Skor lebih rendah = lebih baik
      const score = distanceToFood - directionBonus;

      return { move, score };
    });

    // Urutkan berdasarkan skor (skor rendah = prioritas tinggi)
    movesWithScores.sort((a, b) => a.score - b.score);

    // Tambahkan randomness untuk menghindari pola yang terlalu predictable
    if (movesWithScores.length > 1 && Math.random() < 0.1) {
      return movesWithScores[1].move;
    }

    return movesWithScores[0].move;
  }

  // Get possible moves avoiding collisions
  getPossibleMoves(dimensions, playerSnake) {
    const head = this.snake[0];
    const possibleDirections = [
      { x: 1, y: 0 },
      { x: -1, y: 0 },
      { x: 0, y: 1 },
      { x: 0, y: -1 },
    ].filter((dir) => {
      // Hindari gerakan berlawanan dengan arah saat ini
      return !(dir.x === -this.direction.x && dir.y === -this.direction.y);
    });

    return possibleDirections.filter((dir) => {
      const newX =
        (head.x + dir.x * this.gridSize + dimensions.width) % dimensions.width;
      const newY =
        (head.y + dir.y * this.gridSize + dimensions.height) %
        dimensions.height;

      // Avoid self collision
      const selfCollision = this.snake.some((segment, index) => {
        if (index === 0) return false;
        return segment.x === newX && segment.y === newY;
      });

      // Avoid player collision
      const playerCollision = playerSnake.some(
        (segment) => segment.x === newX && segment.y === newY
      );

      return !selfCollision && !playerCollision;
    });
  }

  // Update AI snake position
  update(food, dimensions, playerSnake) {
    const currentTime = Date.now();
    if (currentTime - this.lastUpdateTime < this.updateInterval) {
      return false;
    }
    this.lastUpdateTime = currentTime;

    this.direction = this.calculateNextMove(food, dimensions, playerSnake);
    const newHead = {
      x:
        (this.snake[0].x +
          this.direction.x * this.gridSize +
          dimensions.width) %
        dimensions.width,
      y:
        (this.snake[0].y +
          this.direction.y * this.gridSize +
          dimensions.height) %
        dimensions.height,
    };

    // Check if food was eaten
    const ateFood = food && newHead.x === food.x && newHead.y === food.y;

    if (ateFood) {
      this.snake = [newHead, ...this.snake];
      return true;
    } else {
      this.snake = [newHead, ...this.snake.slice(0, -1)];
      return false;
    }
  }

  // Render AI snake
  render(ctx) {
    this.snake.forEach((segment, index) => {
      const gradientFactor = index / (this.snake.length - 1);
      const tailColor = { r: 182, g: 92, b: 92 };

      const segmentColor = {
        r: Math.floor(
          this.color.r + (tailColor.r - this.color.r) * gradientFactor
        ),
        g: Math.floor(
          this.color.g + (tailColor.g - this.color.g) * gradientFactor
        ),
        b: Math.floor(
          this.color.b + (tailColor.b - this.color.b) * gradientFactor
        ),
      };

      // Neon effect
      ctx.shadowColor = `rgb(${segmentColor.r}, ${segmentColor.g}, ${segmentColor.b})`;
      ctx.shadowBlur = 15;
      ctx.fillStyle = `rgb(${segmentColor.r}, ${segmentColor.g}, ${segmentColor.b})`;

      // Draw rounded rectangle
      const width = this.gridSize - 2;
      const height = this.gridSize - 2;
      const radius = 5;

      ctx.beginPath();
      ctx.moveTo(segment.x + radius, segment.y);
      ctx.lineTo(segment.x + width - radius, segment.y);
      ctx.quadraticCurveTo(
        segment.x + width,
        segment.y,
        segment.x + width,
        segment.y + radius
      );
      ctx.lineTo(segment.x + width, segment.y + height - radius);
      ctx.quadraticCurveTo(
        segment.x + width,
        segment.y + height,
        segment.x + width - radius,
        segment.y + height
      );
      ctx.lineTo(segment.x + radius, segment.y + height);
      ctx.quadraticCurveTo(
        segment.x,
        segment.y + height,
        segment.x,
        segment.y + height - radius
      );
      ctx.lineTo(segment.x, segment.y + radius);
      ctx.quadraticCurveTo(segment.x, segment.y, segment.x + radius, segment.y);
      ctx.closePath();
      ctx.fill();

      // Reset shadow
      ctx.shadowBlur = 0;

      // Add eyes for head
      if (index === 0) {
        ctx.shadowColor = "#FFFFFF";
        ctx.shadowBlur = 10;
        ctx.fillStyle = "#FFFFFF";
        ctx.beginPath();
        ctx.arc(
          segment.x + width / 4,
          segment.y + height / 3,
          3,
          0,
          Math.PI * 2
        );
        ctx.arc(
          segment.x + (width * 3) / 4,
          segment.y + height / 3,
          3,
          0,
          Math.PI * 2
        );
        ctx.fill();

        ctx.shadowBlur = 0;
        ctx.fillStyle = "#000000";
        ctx.beginPath();
        ctx.arc(
          segment.x + width / 4,
          segment.y + height / 3,
          1.5,
          0,
          Math.PI * 2
        );
        ctx.arc(
          segment.x + (width * 3) / 4,
          segment.y + height / 3,
          1.5,
          0,
          Math.PI * 2
        );
        ctx.fill();
      }
    });
  }
}
