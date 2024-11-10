import React, { useEffect, useRef } from "react";

function HomePage() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const embers = [];
    const emberCount = 200;

    // Ember particle settings
    const emberSettings = {
      maxSize: 4,
      minSize: 1,
      maxSpeed: 5,
      minSpeed: 0.5,
      color: "#A0A0A0",
    };

    // Ember particle class
    class Ember {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + Math.random() * 100;
        this.size =
          emberSettings.minSize +
          Math.random() * (emberSettings.maxSize - emberSettings.minSize);
        this.speed =
          emberSettings.minSpeed +
          Math.random() * (emberSettings.maxSpeed - emberSettings.minSpeed);
        this.opacity = 1;
        this.fadeRate = Math.random() * 0.02 + 0.005;
        this.color = emberSettings.color;
      }

      update() {
        this.y -= this.speed;
        this.opacity -= this.fadeRate;
        if (this.opacity <= 0) {
          this.reset();
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color.replace("0.7", this.opacity.toFixed(2)); // Adjust opacity
        ctx.fill();
      }
    }

    // Create initial embers
    for (let i = 0; i < emberCount; i++) {
      embers.push(new Ember());
    }

    // Animation loop
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      embers.forEach((ember) => {
        ember.update();
        ember.draw();
      });

      requestAnimationFrame(animate);
    }

    animate();

    // Adjust canvas size on resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="w-full h-full flex flex-col justify-center items-center bg-dark-background-primary">
      <canvas ref={canvasRef}></canvas>
    </div>
  );
}

export default HomePage;
