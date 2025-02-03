import React, { useEffect } from "react";

function Player({ canvasRef, snake, food, gridSize, isEating }) {
  const drawSnakeSegment = (ctx, segment, index, total, isEating) => {
    const headColor = { r: 77, g: 77, b: 255 }; // Warna asli untuk kepala
    const tailColor = { r: 92, g: 92, b: 182 }; // Warna lebih gelap untuk ekor

    const gradientFactor = index / total;
    const segmentColor =
      total === 0
        ? headColor // Set Warna Default saat hanya 1 kotak
        : {
            r: Math.floor(
              headColor.r + (tailColor.r - headColor.r) * gradientFactor
            ),
            g: Math.floor(
              headColor.g + (tailColor.g - headColor.g) * gradientFactor
            ),
            b: Math.floor(
              headColor.b + (tailColor.b - headColor.b) * gradientFactor
            ),
          };

    // Efek neon
    ctx.shadowColor = `rgb(${segmentColor.r}, ${segmentColor.g}, ${segmentColor.b})`;
    ctx.shadowBlur = 15;
    ctx.fillStyle = `rgb(${segmentColor.r}, ${segmentColor.g}, ${segmentColor.b})`;

    let width = gridSize - 2;
    let height = gridSize - 2;
    let posX = segment.x;
    let posY = segment.y;

    // Efek scaling saat makan (hanya untuk kepala)
    if (index === 0 && isEating) {
      const scaleFactorX = 1.3;
      const scaleFactorY = 1.3;
      width *= scaleFactorX;
      height *= scaleFactorY;
      // Menyesuaikan posisi agar scaling tetap dari tengah
      posX -= (width - (gridSize - 2)) / 2;
      posY -= (height - (gridSize - 2)) / 2;
    }

    // Draw rounded rectangle for each segment
    const radius = 10;
    ctx.beginPath();
    ctx.moveTo(posX + radius, posY);
    ctx.lineTo(posX + width - radius, posY);
    ctx.quadraticCurveTo(posX + width, posY, posX + width, posY + radius);
    ctx.lineTo(posX + width, posY + height - radius);
    ctx.quadraticCurveTo(
      posX + width,
      posY + height,
      posX + width - radius,
      posY + height
    );
    ctx.lineTo(posX + radius, posY + height);
    ctx.quadraticCurveTo(posX, posY + height, posX, posY + height - radius);
    ctx.lineTo(posX, posY + radius);
    ctx.quadraticCurveTo(posX, posY, posX + radius, posY);
    ctx.closePath();
    ctx.fill();

    // Reset shadow untuk performa
    ctx.shadowBlur = 0;

    // Add details to head segment
    if (index === 0) {
      // Eyes with neon effect
      ctx.shadowColor = "#FFFFFF";
      ctx.shadowBlur = 10;
      ctx.fillStyle = "#FFFFFF";
      ctx.beginPath();
      ctx.arc(posX + width / 4, posY + height / 3, 3, 0, Math.PI * 2);
      ctx.arc(posX + (width * 3) / 4, posY + height / 3, 3, 0, Math.PI * 2);
      ctx.fill();

      // Black pupils
      ctx.shadowBlur = 0;
      ctx.fillStyle = "#000000";
      ctx.beginPath();
      ctx.arc(posX + width / 4, posY + height / 3, 1.5, 0, Math.PI * 2);
      ctx.arc(posX + (width * 3) / 4, posY + height / 3, 1.5, 0, Math.PI * 2);
      ctx.fill();
    }
  };

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Clear previous frame
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw snake with neon effect
    snake.forEach((segment, index) => {
      drawSnakeSegment(ctx, segment, index, snake.length - 1, isEating);
    });

    // Draw food with neon effect
    if (food) {
      ctx.shadowColor = food.color;
      ctx.shadowBlur = 20;
      ctx.fillStyle = food.color;

      const centerX = food.x + gridSize / 2 - 1;
      const centerY = food.y + gridSize / 2 - 1;
      const radius = (gridSize - 4) / 2;

      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.fill();

      // Reset shadow effect
      ctx.shadowBlur = 0;
    }
  }, [canvasRef, snake, food, gridSize, isEating]);

  return null;
}

export default Player;
