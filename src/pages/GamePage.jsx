import React, { useEffect, useState, useRef } from "react";

function GamePage() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [playerPos, setPlayerPos] = useState({ x: 0, y: 0 });
  const [targetPos, setTargetPos] = useState({ x: 0, y: 0 });
  const [cameraOffset, setCameraOffset] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState([]);
  const playerSize = 30;
  const speed = 3;
  const worldSize = { width: 3000, height: 2000 }; // Define a larger world size

  // Set initial canvas size and handle resize
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight,
        });
        // Set initial player position to center of viewport
        setPlayerPos({
          x: containerRef.current.clientWidth / 2,
          y: containerRef.current.clientHeight / 2,
        });
        setTargetPos({
          x: containerRef.current.clientWidth / 2,
          y: containerRef.current.clientHeight / 2,
        });
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  // Handle click/tap with camera offset
  const handleClick = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left + cameraOffset.x;
    const y = e.clientY - rect.top + cameraOffset.y;
    setTargetPos({ x, y });
  };

  // Create particle effect
  const createParticle = (x, y) => {
    return {
      x,
      y,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      life: 1,
      size: Math.random() * 3 + 1,
    };
  };

  // Update game state
  useEffect(() => {
    if (!canvasRef.current || dimensions.width === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    const update = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update player position
      const dx = targetPos.x - playerPos.x;
      const dy = targetPos.y - playerPos.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance > 1) {
        const newX = playerPos.x + (dx / distance) * speed;
        const newY = playerPos.y + (dy / distance) * speed;

        // Clamp player position to world bounds
        const clampedX = Math.max(
          playerSize,
          Math.min(worldSize.width - playerSize, newX)
        );
        const clampedY = Math.max(
          playerSize,
          Math.min(worldSize.height - playerSize, newY)
        );

        setPlayerPos({ x: clampedX, y: clampedY });

        // Create particles when moving
        if (Math.random() < 0.3) {
          setParticles((prev) => [...prev, createParticle(clampedX, clampedY)]);
        }
      }

      // Update camera to follow player
      const targetCameraX = playerPos.x - dimensions.width / 2;
      const targetCameraY = playerPos.y - dimensions.height / 2;

      // Clamp camera to world bounds
      const clampedCameraX = Math.max(
        0,
        Math.min(worldSize.width - dimensions.width, targetCameraX)
      );
      const clampedCameraY = Math.max(
        0,
        Math.min(worldSize.height - dimensions.height, targetCameraY)
      );

      setCameraOffset({ x: clampedCameraX, y: clampedCameraY });

      // Apply camera transform
      ctx.save();
      ctx.translate(-cameraOffset.x, -cameraOffset.y);

      // Draw background grid (optional, for visual reference)
      ctx.strokeStyle = "rgba(200, 200, 200, 0.2)";
      ctx.beginPath();
      for (let x = 0; x < worldSize.width; x += 100) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, worldSize.height);
      }
      for (let y = 0; y < worldSize.height; y += 100) {
        ctx.moveTo(0, y);
        ctx.lineTo(worldSize.width, y);
      }
      ctx.stroke();

      // Draw player
      ctx.fillStyle = "black";
      ctx.fillRect(
        playerPos.x - playerSize / 2,
        playerPos.y - playerSize / 2,
        playerSize,
        playerSize
      );

      // Update and draw particles
      setParticles((prev) =>
        prev
          .map((particle) => ({
            ...particle,
            x: particle.x + particle.vx,
            y: particle.y + particle.vy,
            life: particle.life - 0.02,
          }))
          .filter((particle) => particle.life > 0)
      );

      particles.forEach((particle) => {
        ctx.fillStyle = `rgba(100, 100, 100, ${particle.life})`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.restore();

      animationFrameId = requestAnimationFrame(update);
    };

    update();
    return () => cancelAnimationFrame(animationFrameId);
  }, [dimensions, playerPos, targetPos, particles, cameraOffset]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-full h-full overflow-hidden bg-gray-100"
    >
      <canvas
        ref={canvasRef}
        width={dimensions.width}
        height={dimensions.height}
        className="bg-white cursor-pointer"
        onClick={handleClick}
        onTouchStart={(e) => {
          e.preventDefault();
          const touch = e.touches[0];
          handleClick(touch);
        }}
      />
    </div>
  );
}

export default GamePage;
