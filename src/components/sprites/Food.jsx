const Food = (ctx, food, gridSize) => {
  if (!food) return;
  ctx.shadowColor = food.color;
  ctx.shadowBlur = 25;
  ctx.fillStyle = food.color;
  const centerX = food.x + gridSize / 2 - 1;
  const centerY = food.y + gridSize / 2 - 1;
  const radius = (gridSize - 4) / 2;
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
  ctx.fill();
  ctx.shadowBlur = 0;
};
export default Food;
