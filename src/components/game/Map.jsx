import React, { useEffect, useRef } from "react";

function Map({ canvasRef, dimensions, gridSize }) {
  const starCanvasRef = useRef(null);

  // Efek untuk menggambar grid dan animasi bintang
  useEffect(() => {
    if (!canvasRef.current || !starCanvasRef.current) return;

    const gridCanvas = canvasRef.current;
    const starCanvas = starCanvasRef.current;

    // Set dimensi canvas
    gridCanvas.width = dimensions.width;
    gridCanvas.height = dimensions.height;
    starCanvas.width = dimensions.width;
    starCanvas.height = dimensions.height;

    const gridCtx = gridCanvas.getContext("2d");
    const starCtx = starCanvas.getContext("2d");

    const drawGrid = () => {
      gridCtx.strokeStyle = "rgba(160, 160, 160, 0.2)";
      gridCtx.beginPath();

      // Garis vertikal
      for (let x = 0; x <= dimensions.width; x += gridSize) {
        gridCtx.moveTo(x, 0);
        gridCtx.lineTo(x, dimensions.height);
      }

      // Garis horizontal
      for (let y = 0; y <= dimensions.height; y += gridSize) {
        gridCtx.moveTo(0, y);
        gridCtx.lineTo(dimensions.width, y);
      }

      gridCtx.stroke();
    };

    // Fungsi untuk menggambar bintang
    const drawStars = () => {
      const stars = [];
      const starCount = 100;

      // Inisialisasi bintang
      for (let i = 0; i < starCount; i++) {
        const colorChoices = [
          "rgba(173, 216, 230, 1)", // Light Blue
          "rgba(238, 130, 238, 1)", // Violet
          "rgba(135, 206, 235, 1)", // Sky Blue
          "rgba(240, 248, 255, 1)", // Alice Blue (Soft White)
          "rgba(216, 191, 216, 1)", // Lavender
        ];

        const colorChoice = Math.floor(Math.random() * colorChoices.length);
        const color = colorChoices[colorChoice];

        stars.push({
          x: Math.random() * dimensions.width,
          y: Math.random() * dimensions.height,
          radius: Math.random() * (3 - 0.5) + 0.5,
          opacity: Math.random() * 0.5 + 0.5,
          speed: Math.random() * 0.05 + 0.02,
          color: color,
        });
      }

      const animateStars = () => {
        starCtx.clearRect(0, 0, dimensions.width, dimensions.height);
        stars.forEach((star) => {
          starCtx.beginPath();
          starCtx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
          // starCtx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;

          starCtx.shadowBlur = 10;
          starCtx.shadowColor = star.color;

          starCtx.fillStyle = `${star.color.replace(
            /[\d.]+\)$/g,
            `${star.opacity})`
          )}`;

          starCtx.fill();

          star.opacity += star.speed;
          if (star.opacity > 1 || star.opacity < 0.5) {
            star.speed = -star.speed;
          }
        });
        requestAnimationFrame(animateStars);
      };

      animateStars();
    };

    // Panggil fungsi untuk menggambar grid dan bintang
    drawGrid();
    drawStars();
  }, [canvasRef, dimensions, gridSize]);

  return (
    <div className="relative w-full h-full">
      {/* Canvas untuk bintang */}
      <canvas
        ref={starCanvasRef}
        className="absolute inset-0 w-full h-full bg-[#121212] -z-10"
      />
      {/* Canvas untuk grid */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ touchAction: "none" }}
      />
    </div>
  );
}

export default Map;
