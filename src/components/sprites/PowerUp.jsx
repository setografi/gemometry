const PowerUp = (ctx, powerUp, gridSize) => {
  if (!powerUp) return;
  ctx.shadowColor = powerUp.color;
  ctx.shadowBlur = 25;
  ctx.fillStyle = powerUp.color;
  // const centerX = powerUp.x + gridSize / 2;
  // const centerY = powerUp.y + gridSize / 2;
  // const size = gridSize - 6;
  const centerX = powerUp.x + gridSize / 2 - 1;
  const centerY = powerUp.y + gridSize / 2 - 1;
  const radius = (gridSize - 4) / 2;
  ctx.beginPath();
  // for (let i = 0; i < 5; i++) {
  //   const angle = (i * 4 * Math.PI) / 5 - Math.PI / 2;
  //   const x = centerX + (Math.cos(angle) * size) / 2;
  //   const y = centerY + (Math.sin(angle) * size) / 2;
  //   i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
  // }
  ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
  // ctx.closePath();
  ctx.fill();
  ctx.shadowBlur = 0;
};
export default PowerUp;
