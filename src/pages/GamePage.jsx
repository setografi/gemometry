import React, { useEffect, useState, useRef, useCallback } from "react";
// import Button from "../components/common/Button";

function GamePage() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const animationFrameIdRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [playerPos, setPlayerPos] = useState({ x: 0, y: 0 });
  const [targetPos, setTargetPos] = useState({ x: 0, y: 0 });
  const [cameraOffset, setCameraOffset] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState([]);
  const [rotation, setRotation] = useState(0);
  const [isMoving, setIsMoving] = useState(false);
  const [targetAngle, setTargetAngle] = useState(0);
  const [fadeOut, setFadeOut] = useState(1);

  const playerSize = 30;
  const speed = 3;
  const spinSpeed = 5; // Degrees per frame
  const worldSize = { width: 3000, height: 2000 };

  const handleClick = useCallback(
    (e) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left + cameraOffset.x;
      const y = e.clientY - rect.top + cameraOffset.y;

      // Calculate angle between current position and click position
      const dx = x - playerPos.x;
      const dy = y - playerPos.y;
      const angle = Math.atan2(dy, dx) * (180 / Math.PI);

      setTargetPos({ x, y });
      setTargetAngle(angle);
      setIsMoving(true);
      setFadeOut(1); // Reset fade out when starting to move
    },
    [cameraOffset, playerPos]
  );

  const handleTouchStart = useCallback(
    (e) => {
      const touch = e.touches[0];
      handleClick(touch);
    },
    [handleClick]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.addEventListener("touchstart", handleTouchStart, { passive: false });

    return () => {
      canvas.removeEventListener("touchstart", handleTouchStart);
    };
  }, [handleTouchStart]);

  const updateDimensions = useCallback(() => {
    if (containerRef.current) {
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;

      setDimensions({ width, height });

      if (playerPos.x === 0 && playerPos.y === 0) {
        const initialPos = {
          x: width / 2,
          y: height / 2,
        };
        setPlayerPos(initialPos);
        setTargetPos(initialPos);
      }
    }
  }, [playerPos.x, playerPos.y]);

  useEffect(() => {
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, [updateDimensions]);

  useEffect(() => {
    if (!canvasRef.current || dimensions.width === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let currentPlayerPos = { ...playerPos };
    let currentParticles = [...particles];
    let currentRotation = rotation;

    const createParticle = (x, y) => ({
      x,
      y,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      life: 1,
      size: Math.random() * 4 + 2,
    });

    const update = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update player position
      const dx = targetPos.x - currentPlayerPos.x;
      const dy = targetPos.y - currentPlayerPos.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance > 1) {
        const newX = currentPlayerPos.x + (dx / distance) * speed;
        const newY = currentPlayerPos.y + (dy / distance) * speed;

        currentPlayerPos = {
          x: Math.max(playerSize, Math.min(worldSize.width - playerSize, newX)),
          y: Math.max(
            playerSize,
            Math.min(worldSize.height - playerSize, newY)
          ),
        };

        setPlayerPos(currentPlayerPos);

        // Rotate towards target angle while moving
        const angleDiff = targetAngle - currentRotation;
        currentRotation +=
          Math.sign(angleDiff) * Math.min(Math.abs(angleDiff), spinSpeed);
        setRotation(currentRotation);

        if (Math.random() < 0.3) {
          currentParticles.push(
            createParticle(currentPlayerPos.x, currentPlayerPos.y)
          );
        }
      } else {
        if (isMoving) {
          setIsMoving(false);
          // Start fade out when stopping
          setFadeOut((prevFade) => Math.max(0, prevFade - 0.05));
        }
      }

      // Update camera position
      const targetCameraX = currentPlayerPos.x - dimensions.width / 2;
      const targetCameraY = currentPlayerPos.y - dimensions.height / 2;

      const newCameraOffset = {
        x: Math.max(
          0,
          Math.min(worldSize.width - dimensions.width, targetCameraX)
        ),
        y: Math.max(
          0,
          Math.min(worldSize.height - dimensions.height, targetCameraY)
        ),
      };

      setCameraOffset(newCameraOffset);

      // Render
      ctx.save();
      ctx.translate(-newCameraOffset.x, -newCameraOffset.y);

      // Draw grid
      ctx.strokeStyle = "rgba(160, 160, 160, 0.2)";
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

      // Draw player with rotation
      ctx.save();
      ctx.translate(currentPlayerPos.x, currentPlayerPos.y);
      ctx.rotate((currentRotation * Math.PI) / 180);
      ctx.fillStyle = `rgba(217, 87, 128, ${fadeOut})`;
      ctx.fillRect(-playerSize / 2, -playerSize / 2, playerSize, playerSize);
      ctx.restore();

      // Update particles
      currentParticles = currentParticles
        .map((particle) => ({
          ...particle,
          x: particle.x + particle.vx,
          y: particle.y + particle.vy,
          life: particle.life - 0.02,
        }))
        .filter((particle) => particle.life > 0);

      setParticles(currentParticles);

      // Draw particles
      currentParticles.forEach((particle) => {
        ctx.fillStyle = `rgba(196, 78, 113, ${particle.life})`;
        ctx.fillRect(particle.x, particle.y, particle.size, particle.size);
      });

      ctx.restore();

      animationFrameIdRef.current = requestAnimationFrame(update);
    };

    update();
    return () => {
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, [
    dimensions.width,
    dimensions.height,
    targetPos,
    rotation,
    isMoving,
    targetAngle,
    fadeOut,
  ]);

  return (
    <section
      ref={containerRef}
      className="fixed inset-0 w-full h-full overflow-hidden"
    >
      <canvas
        ref={canvasRef}
        width={dimensions.width}
        height={dimensions.height}
        className="bg-dark-background-primary cursor-pointer"
        style={{ touchAction: "none" }}
        onClick={handleClick}
      />

      {/* <div className="absolute">
        <Button setCurrentPage={setCurrentPage} />
      </div> */}
    </section>
  );
}

export default GamePage;
