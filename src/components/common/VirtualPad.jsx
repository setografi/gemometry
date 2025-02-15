import React from "react";
import { useEffect, useState } from "react";

const VirtualPad = ({ onDirectionChange }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768); // Lebar layar <= 768px
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (!isMobile) return null; // Hanya render di mobile

  return (
    <div className="fixed bottom-6 left-6 z-30 flex items-center justify-center">
      <div className="relative p-3 w-32 h-32 flex items-center justify-center">
        <button
          className="absolute top-0 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-[#121212] bg-opacity-20 border border-white border-opacity-20 rounded-lg text-white font-bold active:scale-90"
          onClick={() => onDirectionChange({ x: 0, y: -1 })}
        >
          ↑
        </button>

        <button
          className="absolute left-0 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-[#121212] bg-opacity-20 border border-white border-opacity-20 rounded-lg text-white font-bold active:scale-90"
          onClick={() => onDirectionChange({ x: -1, y: 0 })}
        >
          ←
        </button>

        <button
          className="absolute right-0 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-[#121212] bg-opacity-20 border border-white border-opacity-20 rounded-lg text-white font-bold active:scale-90"
          onClick={() => onDirectionChange({ x: 1, y: 0 })}
        >
          →
        </button>

        <button
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-[#121212] bg-opacity-20 border border-white border-opacity-20 rounded-lg text-white font-bold active:scale-90"
          onClick={() => onDirectionChange({ x: 0, y: 1 })}
        >
          ↓
        </button>

        <div className="w-10 h-10 bg-[#F2F2F2] bg-opacity-10 rounded-lg"></div>
      </div>
    </div>
  );
};

export default VirtualPad;
